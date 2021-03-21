import React, { useState } from "react";
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

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function TabOneScreen() {
  const [packageDescription, setPackageDescription] = useState("");
  const [packageCode, setPackageCode] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }: any) => <Item title={item.title} />;

  const clickHandler = () => {
    //function to handle click on floating Action Button
    setModalVisible(true);
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
              >
                SALVAR
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
