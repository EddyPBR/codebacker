import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

import Header from "../../components/Header";
import ScannBox from "../../components/ScannBox";
import SaveButton from "../../components/SaveButton";

interface Data {
  codOS: string;
  carNumber: string;
  requestNumber: string;
  vehicle: string;
  volumes: Array<{
    numVolume: string;
    status: string;
  }>;
  status: string;
  loadingCode: string;
}

const Request = () => {
  const route = useRoute();

  const {
    carNumber,
    requestNumber,
    volumes,
    codOS,
    vehicle,
    status,
    loadingCode,
  } = route.params as Data;

  const numberOfVolumes = volumes.length;

  return (
    <>
      <View style={styles.main}>
        <Header loadingCode={loadingCode} isWhite />
        <View style={styles.mainBody}>
          <Text style={styles.mainTitle}>Pedido</Text>
          <Text style={styles.mainTitle}>{requestNumber}</Text>
        </View>
        <View style={styles.mainFooter}>
          <View style={styles.mainDetails}>
            <Text style={styles.detailsText}>OS: {codOS}</Text>
            <Text style={styles.detailsText}>Veículo: {vehicle}</Text>
          </View>
          <Text style={styles.mainPackages}>Checados: 0/{numberOfVolumes}</Text>
        </View>
      </View>

      <View>
        <ScrollView style={styles.scannList} horizontal={true}>
          {volumes.map((volume, index) => {
            const dataObject = {
              requestNumber,
              codOS,
              carNumber,
              numberOfVolumes,
              status,
              index,
              volume,
            };

            return <ScannBox data={dataObject} key={index} />;
          })}
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
