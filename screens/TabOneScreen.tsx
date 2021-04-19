import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import Flag from "react-native-flags-typescript";
import BannerAdMob from "./../components/admob/banner";
import { Text, View } from "../components/Themed";
import addPackage from "../functions/addPackage";
import TracksDb from "../services/db";
import moment from "moment";

export default function TabOneScreen() {
  const [data, setData] = useState([]);
  const [packageDescription, setPackageDescription] = useState("");
  const [packageCode, setPackageCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    const tracks: any = [];
    TracksDb.transaction(
      (tx) => {
        tx.executeSql(
          "select id, code, description, delivered, lastUpdateDate, " +
            "(select description from tracks_logs where tracks_logs.code = tracks.code order by dateTime desc LIMIT 1) status from tracks",
          [],
          (trans, { rows }) => {
            for (var i = 0; i < rows.length; i++) {
              const item = rows.item(i);
              tracks.push({
                id: item.id,
                description: item.description,
                status: item.status ?? "NÃO ENCONTRADO",
                code: item.code,
                lastUpdateDate: moment(item.lastUpdateDate).format(
                  "DD/MM/YYYY HH:mm"
                ),
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

  const navegation = useNavigation();

  const viewTimeLine = (track: any) => {
    if (track.status !== "NÃO ENCONTRADO") {
      navegation.navigate("TimeLine", { track });
    }
  };

  const showModalHandler = async () => {
    setModalVisible(true);
  };

  const addHandler = async () => {
    setModalVisible(false);
    await addPackage({ code: packageCode, description: packageDescription });
    setPackageCode("");
    setPackageDescription("");
    loadTracks();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setPackageCode("");
          setPackageDescription("");
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
                  addHandler();
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            onPress={() => {
              viewTimeLine(item);
            }}
          >
            <View style={styles.item}>
              <View
                style={{ flexDirection: "row", backgroundColor: "transparent" }}
              >
                <Text style={styles.title}>{item.description}</Text>
                <Flag
                  style={styles.flags}
                  type="flat"
                  size={32}
                  code={item.code.slice(-2)}
                />
              </View>
              <View
                style={{ flexDirection: "row", backgroundColor: "transparent" }}
              >
                <Text style={{ width: "50%", textAlign: "left" }}>
                  {item.code}
                </Text>
                <Text style={{ width: "50%", textAlign: "right" }}>
                  {item.lastUpdateDate}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    textTransform: "uppercase",
                    paddingTop: 2,
                    textAlign: "left",
                  }}
                >
                  {">>> " + item.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={showModalHandler}
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
    marginTop: 8,
  },
  flags: { alignContent: "flex-end", alignSelf: "flex-end" },
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
    backgroundColor: "#b0bec5",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 32,
    flex: 1,
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
    color: "#fabe3d",
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
    backgroundColor: "#455a64",
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
    paddingBottom: 15,
    textAlign: "left",
    width: "100%",
    padding: 16,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#0f2242",
  },
});
