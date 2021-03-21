import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../Themed";

export default function FloatActionButton(onPress: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.touchableOpacityStyle}
    >
      <Text style={styles.floatingButtonStyle}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
