import TracksDb from "../../services/db";
import Api from "../../services/api";
import moment from "moment";

const addPackage = async (props: any) => {
  TracksDb.transaction(
    (tx) => {
      tx.executeSql(
        "insert into tracks (code, description, delivered, createDate, lastUpdateDate) values (?, ?, 0, ?, ?)",
        [
          props.code,
          props.description,
          new Date().toISOString(),
          new Date().toISOString(),
        ]
      );
    },
    (error) => {
      console.log("header track", error);
    },
    () => {
      console.log("header track insert suscess");
      loadTrack(props.code);
    }
  );

  const loadTrack = async (code: string) => {
    var isDelivered = false;
    var createDate: any = null;
    var lastUpdateDate: any = null;

    console.log(code);

    const response = await Api.post("rastreio", {
      type: "LS",
      code: code,
    });
    response.data.objeto[0].evento.forEach((item: any, index: any) => {
      isDelivered =
        isDelivered || item.descricao.includes("entregue ao destinatário");

      var eventTime = moment(item.data + " " + item.hora, "DD/MM/YYYY HH:mm");
      lastUpdateDate =
        lastUpdateDate == null || lastUpdateDate < eventTime
          ? eventTime
          : lastUpdateDate;

      createDate =
        createDate == null || createDate > eventTime ? eventTime : createDate;

      var localeDetails = isNull(item.unidade.cidade)
        ? ""
        : item.unidade.cidade + "/" + item.unidade.uf;

      TracksDb.transaction(
        (tx) => {
          tx.executeSql(
            "insert into tracks_logs (code, dateTime, description, locale, localeDetails) values (?, ?, ?, ?, ?)",
            [
              props.code,
              eventTime.toISOString(),
              item.descricao,
              item.unidade.local,
              localeDetails,
            ]
          );
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("insert line suscess");
        }
      );
    });

    TracksDb.transaction(
      (tx) => {
        tx.executeSql(
          "update tracks set delivered = ?, createDate = ?, lastUpdateDate = ? where code = ?",
          [
            isDelivered ? 1 : 0,
            createDate.toISOString(),
            lastUpdateDate.toISOString(),
            props.code,
          ]
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("update realized");
      }
    );
  };

  const isNull = (obj: any) => {
    return typeof obj == "undefined" || obj == null;
  };
};

export default addPackage;
