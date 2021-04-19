import { View, Text } from "../Themed";
import { StyleSheet, Image } from "react-native";
import React from "react";
import Flag from "react-native-flags-typescript";

import TracksDb from "../../services/db";
import moment from "moment";

const PackageDetails = ({
  code,
  delivered,
  lastUpdateDate,
  createDate,
}: any) => {
  var today = moment().startOf("day");
  var create = moment(createDate);
  var last = moment(lastUpdateDate);

  return (
    <View style={styles.container}>
      <View style={(styles.gridInfo, styles.gridOne)}>
        <Text style={{ textAlign: "center" }}>
          {delivered
            ? "entregue após " + last.diff(create, "days") + " dias"
            : "postado há " + today.diff(last, "days") + " dias"}
        </Text>
      </View>
      <View style={(styles.gridInfo, styles.gridTwo)}>
        <Text style={{ textAlign: "center" }}>Última atualização</Text>
        <Text style={{ textAlign: "center" }}>
          {moment(lastUpdateDate).format("DD/MM/YYYY")}{" "}
          {moment(lastUpdateDate).format("HH:mm")}
        </Text>
      </View>
      <View style={(styles.gridInfo, styles.gridThree)}>
        <Flag type="flat" size={64} code={code.slice(-2)} />
      </View>
    </View>
  );
};

export default PackageDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    paddingTop: 8,
  },
  gridInfo: {
    paddingTop: 8,
    height: 70,
    flex: 1,
    paddingHorizontal: 8,
  },
  gridOne: {
    paddingTop: 11,
    width: "25%",
    alignItems: "flex-start",
  },
  gridTwo: {
    paddingTop: 11,
    width: "50%",
    alignItems: "center",
  },
  gridThree: {
    width: "25%",
    alignItems: "flex-end",
  },
});
