import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import Timeline from "react-native-timeline-flatlist";
import Api from "../services/api";
import { Ionicons } from "@expo/vector-icons";

export default function TimeLine({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const deliveryIcon = require("../assets/images/delivery-car.png");
  const [data, setData] = useState([]);

  const loadTrack = async (track: any) => {
    const logs: any = [];
    const response = await Api.post("rastreio", {
      type: "LS",
      code: track.code,
    });

    response.data.objeto[0].evento.forEach((item: any, index: any) => {
      logs.push({
        time: (item.data + " " + item.hora).replace(" ", "\n"),
        title: item.descricao,
        description:
          item.unidade.local +
          (typeof item.unidade.cidade !== "undefined" &&
          item.unidade.cidade !== null
            ? "\n" + item.unidade.cidade + "/" + item.unidade.uf
            : ""),
        icon: (
          <Ionicons
            name="location"
            size={30}
            color="rgb(45,156,219)"
          ></Ionicons>
        ),
      });
    });

    console.log(logs);

    setData(logs);
  };

  const { track } = route.params;
  useEffect(() => {
    loadTrack(track);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: "#000" }}>{track.description}</Text>
      <Text style={{ color: "#000", fontSize: 20 }}>{track.code}</Text>
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
          color: "#fff",
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
    color: "#fff",
    paddingHorizontal: 10,
  },
});
