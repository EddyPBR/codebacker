import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";
import { RectButton } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

interface Data {
  codOS: string;
  carNumber: string;
  index: number;
  numberOfVolumes: number;
  requestNumber: string;
  volume: {
    numVolume: string;
    status: string;
  };
}

interface Params {
  data: Data;
}

const ScannBox = (params: Params) => {
  const { codOS, carNumber, index, numberOfVolumes, requestNumber, volume } = params.data;

  const productCode = "000" + codOS + volume.numVolume;

  const navigation = useNavigation();

  function handleNavigateToScann() {
    navigation.navigate("Scanner", {
      requestNumber,
      productCode,
      carNumber,
      volume,
      index,
    });
  }

  return (
    <View style={styles.scannBox}>
      <View style={styles.boxHeader}>
        <View style={styles.statusRow}>
          <Text style={styles.boxHeaderText}>Status:</Text>
          {volume.status === "sucess" && (
            <FeatherIcons name="check-circle" size={18} color="#2EB363" style={{ marginLeft: 3 }} />
          )}
          {volume.status === "fail" && (
            <FeatherIcons name="x-circle" size={18} color="#E53035" style={{ marginLeft: 3 }} />
          )}
          {volume.status === "unchecked" && (
            <FeatherIcons name="info" size={18} color="#898383" style={{ marginLeft: 3 }} />
          )}
        </View>
        <Text style={styles.boxHeaderText}>
          Pacote {index + 1} de {numberOfVolumes}
        </Text>
      </View>

      <View style={styles.boxBody}>
        <View style={styles.field}>
          <Text style={styles.label}>Código do produto</Text>
          {volume.status === "sucess" && (
            <TextInput
              style={styles.inputSucess}
              autoCorrect={false}
              placeholderTextColor="#898383"
              placeholder={productCode}
              contextMenuHidden={true}
              editable={false}>
              {productCode}
            </TextInput>
          )}
          {volume.status === "fail" && (
            <TextInput
              style={styles.inputFail}
              autoCorrect={false}
              placeholderTextColor="#898383"
              placeholder={productCode}
              contextMenuHidden={true}
              editable={false}>
              {productCode}
            </TextInput>
          )}
          {volume.status === "unchecked" && (
            <TextInput
              style={styles.inputUnchecked}
              autoCorrect={false}
              placeholderTextColor="#898383"
              placeholder={productCode}
              contextMenuHidden={true}
              editable={false}>
              {productCode}
            </TextInput>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Código do veículo</Text>
          {volume.status === "sucess" && (
            <TextInput
              style={styles.inputSucess}
              autoCorrect={false}
              placeholderTextColor="#898383"
              placeholder={productCode}
              contextMenuHidden={true}
              editable={false}>
              {carNumber}
            </TextInput>
          )}
          {volume.status === "fail" && (
            <TextInput
              style={styles.inputFail}
              autoCorrect={false}
              placeholderTextColor="#898383"
              placeholder={productCode}
              contextMenuHidden={true}
              editable={false}>
              {carNumber}
            </TextInput>
          )}
          {volume.status === "unchecked" && (
            <TextInput
              style={styles.inputUnchecked}
              autoCorrect={false}
              placeholderTextColor="#898383"
              placeholder={productCode}
              contextMenuHidden={true}
              editable={false}>
              {carNumber}
            </TextInput>
          )}
        </View>
      </View>

      <LinearGradient colors={["#E53035", "#BC151B"]} style={styles.button}>
        <RectButton onPress={() => handleNavigateToScann()}>
          <View style={styles.buttonRow}>
            <FeatherIcons name="camera" size={18} color="#DEDEE3" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Escanear</Text>
          </View>
        </RectButton>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  scannBox: {
    width: 220,
    height: 250,
    backgroundColor: "#FFF",
    padding: 16,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,

    flexDirection: "column",
    justifyContent: "space-between",
  },
  boxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxHeaderText: {
    color: "#868383",
    fontSize: 12,
  },
  boxBody: {
    flexDirection: "column",
  },
  field: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    color: "#868383",
  },
  inputUnchecked: {
    width: "100%",
    height: 34,
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#3D3D90",
    borderRadius: 5,
    color: "#3D3D90",
  },
  inputSucess: {
    width: "100%",
    height: 34,
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#2EB363",
    borderRadius: 5,
    color: "#2EB363",
  },
  inputFail: {
    width: "100%",
    height: 34,
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E32F34",
    borderRadius: 5,
    color: "#E32F34",
  },
  button: {
    width: 120,
    height: 38,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 16,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
  },
  buttonText: {
    fontSize: 16,
    color: "#DEDEE3",
    textAlign: "center",
  },
});

export default ScannBox;
