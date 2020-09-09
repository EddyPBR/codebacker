import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";

import Header from "../../components/Header";
import ScannBox from "../../components/ScannBox";
import SaveButton from "../../components/SaveButton";

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
    <>
      <View style={styles.main}>
        <Header loadingCode={loadingCode} isWhite />
        <View style={styles.mainBody}>
          <Text style={styles.mainTitle}>Pedido</Text>
          <Text style={styles.mainTitle}>{numPed}</Text>
        </View>
        <View style={styles.mainFooter}>
          <View style={styles.mainDetails}>
            <Text style={styles.detailsText}>OS: {codOs}</Text>
            <Text style={styles.detailsText}>Veículo: {veiculo}</Text>
          </View>
          <Text style={styles.mainPackages}>Pedidos: 0/{numVolume}</Text>
        </View>
      </View>

      <View>
        <ScrollView style={styles.scannList} horizontal={true}>
          <ScannBox />
          <ScannBox />
          <ScannBox />
          <ScannBox />
        </ScrollView>
        <SaveButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 220,
    backgroundColor: "#E32F34",
    paddingTop: 30,
    paddingBottom: 16,
    paddingHorizontal: 30,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mainBody: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 24,
    color: "#FFF",
  },
  mainFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  mainDetails: {
    flexDirection: "column",
  },
  detailsText: {
    color: "#DEDEE3",
    fontSize: 14,
  },
  mainPackages: {
    fontSize: 14,
    color: "#DEDEE3",
  },
  scannList: {
    flexDirection: "row",
    height: 250,
    marginTop: 20,
  },
});

export default Request;
