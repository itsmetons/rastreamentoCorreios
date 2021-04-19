import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import Timeline from "react-native-timeline-flatlist";
import Api from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import TracksDb from "../services/db";
import moment from "moment";
import PackageDetails from "../components/packageDetails";
export default function TimeLine({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [data, setData] = useState([]);
  const [delivered, setDelivered] = useState(false);
  const [createDate, setCreateDate] = useState("");
  const [lastUpdateDate, setLastUpdateDate] = useState("");

  const loadTrack = async (track: any) => {
    const logs: any = [];
    TracksDb.transaction(
      (tx) => {
        tx.executeSql(
          "select dateTime, description, locale, localeDetails, " +
            "(select delivered from tracks where tracks.code = tracks_logs.code ) delivered, " +
            "(select createDate from tracks where tracks.code = tracks_logs.code ) createDate, " +
            "(select lastUpdateDate from tracks where tracks.code = tracks_logs.code ) lastUpdateDate  from tracks_logs where code = ?",
          [track],
          (trans, { rows }) => {
            for (var i = 0; i < rows.length; i++) {
              const item = rows.item(i);
              setDelivered(item === 0 ? false : true);
              setLastUpdateDate(item.lastUpdateDate);
              setCreateDate(item.createDate);
              logs.push({
                time: moment(item.dateTime).format("DD/MM/YYYY[\n]HH:mm"),
                title: item.description,
                description: item.locale + "\n" + item.localeDetails,
                icon: (
                  <Ionicons
                    name="location"
                    size={30}
                    color="rgb(45,156,219)"
                  ></Ionicons>
                ),
              });
            }
          }
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        setData(logs);
      }
    );
  };

  const { track } = route.params;
  useEffect(() => {
    loadTrack(track.code);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{track.description}</Text>
      <Text style={{ fontSize: 20 }}>{track.code}</Text>
      <PackageDetails
        code={track.code}
        delivered={delivered}
        lastUpdateDate={lastUpdateDate}
        createDate={createDate}
      />
      <Timeline
        style={styles.list}
        data={data}
        circleSize={40}
        circleColor="rgba(255,255,255,9)"
        lineColor="rgb(45,156,219)"
        innerCircle={"icon"}
        titleStyle={styles.titleStyle}
        descriptionStyle={styles.titleStyle}
        timeStyle={{
          textAlign: "center",
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 20,
    paddingTop: 65,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  titleStyle: {
    paddingHorizontal: 10,
  },
});
