import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
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
    const response = await Api.get("track/" + track.code);
    console.log(response.data);
    response.data[0].tracks.forEach((item: any, index: any) => {
      logs.push({
        time: new Date(item.trackedAt)
          .toLocaleDateString("pt-BR", {
            timeZone: "UTC",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
          })
          .replace(" ", "\n"),
        title: item.status,
        description: item.observation,
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
        timeStyle={{
          textAlign: "center",
          paddingVertical: 15,
          paddingHorizontal: 5,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: "white",
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
