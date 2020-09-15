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
  status: string;
  requestNumber: string;
  volume: {
    numVolume: string;
    status: string;
  }
};

interface Params {
  data: object;
}

const ScannBox = (params: Params) => {
  const { codOS, carNumber, index, numberOfVolumes, status, requestNumber, volume} = params.data as Data;
  const productCode = "000" + codOS + volume.numVolume;

  const navigation = useNavigation();

  function handleNavigateToScann() {
    navigation.navigate("Scanner");
  }
  
  return (
    <View style={styles.scannBox}>
      <View style={styles.boxHeader}>
        <View style={styles.statusRow}>
          <Text style={styles.boxHeaderText}>Status:</Text>
          <FeatherIcons name="check-circle" size={18} color="#2EB363" style={{ marginLeft: 3 }} />
        </View>
        <Text style={styles.boxHeaderText}>Pacote {index} de {numberOfVolumes}</Text>
      </View>

      <View style={styles.boxBody}>
        <View style={styles.boxBodyCol}>
          <Text style={styles.bodyTitle}>Cód. Produto:</Text>
          <View style={styles.bodyField}>
            <Text style={styles.fieldLabel}>Cód. Esperado</Text>
            <TextInput
              style={styles.fieldInputUnchecked}
              autoCorrect={false}
              placeholderTextColor="#898383"
              contextMenuHidden={true}
              editable={false}>
              {productCode}
            </TextInput>
          </View>
          <View style={styles.bodyField}>
            <Text style={styles.fieldLabel}>Cód. Obtido</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.fieldInputChecked}
              autoCorrect={false}
              placeholderTextColor="#898383"
              placeholder="Ex.: 12412512"
            />
          </View>
        </View>
        <View style={styles.boxBodyCol}>
          <Text style={styles.bodyTitle}>Cód. Veículo:</Text>
          <View style={styles.bodyField}>
            <Text style={styles.fieldLabel}>Cód. Esperado</Text>
            <TextInput
              style={styles.fieldInputUnchecked}
              autoCorrect={false}
              contextMenuHidden={true}
              editable={false}
              placeholderTextColor="#898383">
                {carNumber}
            </TextInput>
          </View>
          <View style={styles.bodyField}>
            <Text style={styles.fieldLabel}>Cód. Obtido</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.fieldInputChecked}
              autoCorrect={false}
              placeholderTextColor="#898383"
              placeholder="Ex.: 12412512"
            />
          </View>
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
    width: 240,
    height: 240,
    backgroundColor: "#FFF",
    padding: 10,
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
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxBodyCol: {
    flexDirection: "column",
  },
  bodyTitle: {
    fontSize: 14,
    marginTop: 5,
    color: "#240F10",
  },
  bodyField: {
    marginTop: 10,
  },
  fieldLabel: {
    fontSize: 10,
    color: "#868383",
  },
  fieldInputUnchecked: {
    width: 100,
    height: 30,
    fontSize: 12,
    padding: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E32F34",
    borderRadius: 5,
    color: "#E32F34",
  },
  fieldInputChecked: {
    width: 100,
    height: 30,
    fontSize: 12,
    padding: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#3D3D90",
    borderRadius: 5,
    color: "#3D3D90",
  },
  button: {
    width: 100,
    height: 30,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
  },
  buttonText: {
    fontSize: 12,
    color: "#DEDEE3",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ScannBox;
