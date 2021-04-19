import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "../components/Themed";
import TracksDb from "../services/db";
import BannerAdMob from "./../components/admob/banner";

export default function TabTwoScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadTracks();
  }, []);

  const navegation = useNavigation();
  const viewTimeLine = (track: any) => {
    navegation.navigate("TimeLine", { track });
  };

  const loadTracks = async () => {
    const tracks: any = [];
    TracksDb.transaction(
      (tx) => {
        tx.executeSql(
          "select id, code, description, delivered from tracks",
          [],
          (trans, { rows }) => {
            for (var i = 0; i < rows.length; i++) {
              const item = rows.item(i);
              tracks.push({
                id: item.id,
                description: item.description,
                code: item.code,
              });
              console.log(item);
            }
          }
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        setData(tracks);
      }
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            onPress={() => {
              viewTimeLine(item);
            }}
          >
            <View style={styles.item}>
              <Text style={styles.title}>{item.description}</Text>
              <Text>{item.code}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <BannerAdMob />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
