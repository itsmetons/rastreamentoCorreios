import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import BannerAdMob from "./../components/admob/banner";
import { Text, View } from "../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    const tracks: any = await AsyncStorage.getItem("@storage_tracks");
    setData(tracks != null ? JSON.parse(tracks) : []);
  };

  const navegation = useNavigation();
  const viewTimeLine = (track: any) => {
    navegation.navigate("TimeLine", { track });
  };

  const [data, setData] = useState([]);
  const [packageDescription, setPackageDescription] = useState("");
  const [packageCode, setPackageCode] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const clickHandler = () => {
    setModalVisible(true);
  };

  const addPackage = async () => {
    const tracks: any = data ?? [];
    tracks.push({ description: packageDescription, code: packageCode });
    console.log(tracks);

    await AsyncStorage.setItem("@storage_tracks", JSON.stringify(tracks));
    loadTracks();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>NOVO PACOTE</Text>

            <View style={{ padding: 16, width: "100%" }}>
              <Text>DESCRIÇÃO DA ENCOMENDA:</Text>
              <TextInput
                style={styles.input}
                autoFocus={true}
                onChangeText={(text) => setPackageDescription(text)}
                value={packageDescription}
              />
              <Text>CÓDIGO DE RASTREIO:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setPackageCode(text)}
                value={packageCode}
              />
            </View>

            <View style={{ width: "100%", flexDirection: "row" }}>
              <Text
                style={{
                  ...styles.modalButton,
                  textAlign: "left",
                  color: "#FF0000",
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                CANCELAR
              </Text>

              <Text
                style={{
                  ...styles.modalButton,
                  textAlign: "right",
                  color: "#008000",
                }}
                onPress={() => {
                  addPackage();
                }}
              >
                SALVAR
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={data}
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

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={clickHandler}
        style={styles.touchableOpacityStyle}
      >
        <Text style={styles.floatingButtonStyle}>+</Text>
      </TouchableOpacity>
      <BannerAdMob />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    marginTop: 0,
    width: "100%",
    marginBottom: 0,
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
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
  touchableOpacityStyle: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 16,
    bottom: 66,
    borderRadius: 50,
  },
  floatingButtonStyle: {
    textAlign: "center",
    color: "#000",
    height: "100%",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 5,
    fontSize: 40,
    backgroundColor: "#fabe3d",
    borderRadius: 50,
  },
  modalButton: {
    width: "50%",
    fontWeight: "bold",
    fontSize: 17,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
    backgroundColor: "rgba(52, 52, 52, 0.9)",
  },
  modalView: {
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalTitle: {
    marginBottom: 15,
    textAlign: "left",
    width: "100%",
    padding: 16,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#0f2242",
  },
});
