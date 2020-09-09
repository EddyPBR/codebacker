import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import Header from "../../components/Header";

interface Data {
  numCar: number;
  numPed: number;
  numVolume: number;
  codOs: number;
  veiculo: number;
  status: string;
  loadingCode: number;
}

const Request = () => {
  const route = useRoute();
  const routeParams = route.params as Data;

  const { numCar, numPed, numVolume, codOs, veiculo, status, loadingCode } = routeParams;
  return (
    <View style={styles.header}>
      <Header loadingCode={loadingCode} isWhite />
      <Text>
        {numCar}, {numPed}, {numVolume}, {codOs}, {veiculo}, {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 270,
    backgroundColor: "#E32F34",
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
});

export default Request;
