import React from "react";
import FeatherIcons from "react-native-vector-icons/Feather";
import { RectButton } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Text, StyleSheet } from "react-native";

const SaveButton = () => {
  return (
    <LinearGradient colors={["#2EB363", "#1E8F4B"]} style={styles.button}>
      <RectButton onPress={() => alert("ok")} style={styles.buttonContent}>
        <FeatherIcons name="save" size={24} color="#DEDEE3" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Finalizar</Text>
      </RectButton>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 160,
    height: 46,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#DEDEE3",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 14,
  },
});

export default SaveButton;
