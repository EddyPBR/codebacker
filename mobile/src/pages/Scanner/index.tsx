import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FeatherIcons from "react-native-vector-icons/Feather";

import { RectButton } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import LoadingAnimation from "../../components/LoadingAnimation";

import { AsyncStorage } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Volume {
  numVolume: string,
  status: string,
}

interface Data {
  requestNumber: string;
  productCode: string;
  vehicle: string;
  volume: Volume;
  index: number;
}

interface Load {
  carNumber: string,
  codOS: string,
  requestNumber: string,
  vehicle: string,
  volumes: [
    Volume
  ],
}

const CheckList = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { requestNumber, productCode, vehicle, volume, index: id } = route.params as Data;

  const [hasPermission, setHasPermission] = useState(Boolean);
  const [scanned, setScanned] = useState(true);
  const [typeToScan, setTypeToScan] = useState("");

  const trulyProductCode = productCode;
  const trulyCarCode = vehicle;
  const [productCod, setProductCode] = useState("");
  const [carCod, setCarCode] = useState("");

  const [loadsList, setLoadsList] = useState([{} as Load]);

  const getLoadsList = async () => {
    const loadsList = await AsyncStorage.getItem("@loadsList");
    return loadsList ? setLoadsList(JSON.parse(loadsList)) : [];
  };

  const getUserPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getLoadsList();
  }, []);

  useEffect(() => {
    getUserPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    if (scanned === true) {
      return;
    }

    setScanned(true);

    if (typeToScan === "product") {
      setProductCode(data);
      alert(`Produto escaneado! \ncódigo obtido: ${data}`);
    } else if (typeToScan === "vehicle") {
      setCarCode(data);
      alert(`Produto escaneado! \ncódigo obtido: ${data}`);
    } else {
      alert("Houve um pequeno erro no momento do scann, por favor tente novamente.");
    }

    setTypeToScan("");
  };

  function prepareScann(type: string) {
    setScanned(false);
    setTypeToScan(type);
  }

  const storeData = async (key: string, value: Object) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  };

  const checkIfAllVolumesAreSucessful = (volumes: Array<Volume>) => {
    const volumesChecked = [];
    volumes.map((volume) => { 
      if(volume.status === "sucess") { 
        volumesChecked.push(volume)
      }
    });

    return volumesChecked.length === volumes.length;
  }

  const updateRequestLoad = () => {
    const status = (trulyCarCode == carCod && trulyProductCode === productCod) ? "sucess" : "fail";

    const newVolume = {
      numVolume: volume.numVolume,
      status,
    };

    const requestedLoad = loadsList.filter((load) => load.requestNumber === requestNumber)[0] as Data | any;
    requestedLoad.volumes[id] = newVolume;

    return (requestedLoad);
  }

  function handleSaveState() {
    const requestedLoad = updateRequestLoad();

    checkIfAllVolumesAreSucessful(requestedLoad.volumes)? requestedLoad.status = "sucess" : requestedLoad.status = "fail";

    const newLoadsList = () => loadsList.map( (load) => load.requestNumber === requestNumber ? load.volumes : load) as Array<Load>;

    setLoadsList(newLoadsList);

    storeData("@loadsList", loadsList).then(
      () => navigation.goBack()
    );
  }

  if (hasPermission === null) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <LoadingAnimation />
        <Text style={{marginTop: 10,}}>É necessária a permissão da camera</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <LoadingAnimation />
      <Text style={{color: "#E53035", fontSize: 24, fontWeight: "bold", marginTop: 10,}}>ERRO SEM ACESSO A CAMERA</Text>
    </View>
  }

  return (
    <View style={styles.main}>
      <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.scann} />

      {typeToScan === "" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#000",
          }}>
          <RectButton
            onPress={() => prepareScann("product")}
            style={{
              width: "50%",
              height: 30,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#E53035",
            }}>
            <Text style={{ color: "#FFF", textAlign: "center", width: "100%" }}>
              Escanear Produto
            </Text>
          </RectButton>
          <RectButton
            onPress={() => prepareScann("vehicle")}
            style={{
              width: "50%",
              height: 30,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#3D3D90",
            }}>
            <Text style={{ color: "#FFF", textAlign: "center", width: "100%" }}>
              Escanear Veículo
            </Text>
          </RectButton>
        </View>
      )}
      {typeToScan === "product" && (
        <View
          style={{
            backgroundColor: "#E53035",
            width: "100%",
            height: 30,
            alignSelf: "center",
            justifyContent: "center",
          }}>
          <Text style={{ color: "#FFF", textAlign: "center", fontWeight: "bold" }}>
            Escaneando o Produto...
          </Text>
        </View>
      )}
      {typeToScan === "vehicle" && (
        <View
          style={{
            backgroundColor: "#3D3D90",
            width: "100%",
            height: 30,
            alignSelf: "center",
            justifyContent: "center",
          }}>
          <Text style={{ color: "#FFF", textAlign: "center", fontWeight: "bold" }}>
            Escaneando o Veículo...
          </Text>
        </View>
      )}

      <Text style={styles.text}>
        Faça o scaneamento automático do código ou informe manualmente.
      </Text>

      <View style={styles.form}>
        <View style={styles.fieldRow}>
          <FontAwesome5 name="box-open" size={32} color="#E53035" />
          <View style={styles.field}>
            <Text style={styles.label}>Cód. esperado</Text>
            <TextInput
              style={styles.inputChecked}
              autoCorrect={false}
              placeholderTextColor="#3D3D90"
              contextMenuHidden={true}
              editable={false}>
              {trulyProductCode}
            </TextInput>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Cód. obtido</Text>
            {trulyProductCode === productCod ? (
              <TextInput
                style={styles.inputSucess}
                autoCorrect={false}
                placeholderTextColor="#E53035"
                contextMenuHidden={true}
                keyboardType="number-pad"
                editable={false}>
                {productCod}
              </TextInput>
            ) : (
              <TextInput
                style={styles.input}
                autoCorrect={false}
                placeholderTextColor="#E53035"
                contextMenuHidden={true}
                keyboardType="number-pad"
                editable={false}>
                {productCod}
              </TextInput>
            )}
          </View>
        </View>

        <View style={styles.fieldRow}>
          <FontAwesome5 name="car-side" size={32} color="#E53035" />
          <View style={styles.field}>
            <Text style={styles.label}>Cód. esperado</Text>
            <TextInput
              style={styles.inputChecked}
              autoCorrect={false}
              placeholderTextColor="#3D3D90"
              contextMenuHidden={true}
              editable={false}>
              {trulyCarCode}
            </TextInput>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Cód. obtido</Text>
            {trulyCarCode == carCod ? (
              <TextInput
                style={styles.inputSucess}
                autoCorrect={false}
                placeholderTextColor="#E53035"
                contextMenuHidden={true}
                keyboardType="number-pad"
                editable={false}>
                {carCod}
              </TextInput>
            ) : (
              <TextInput
                style={styles.input}
                autoCorrect={false}
                placeholderTextColor="#E53035"
                contextMenuHidden={true}
                keyboardType="number-pad"
                editable={false}>
                {carCod}
              </TextInput>
            )}
          </View>
        </View>
      </View>

      <LinearGradient colors={["#2EB363", "#1E8F4B"]} style={styles.button}>
        <RectButton onPress={handleSaveState} style={styles.buttonContent}>
          <FeatherIcons name="save" size={24} color="#DEDEE3" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Finalizar</Text>
        </RectButton>
      </LinearGradient>

    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scann: {
    height: 300,
    width: "100%",
    backgroundColor: "#000",
  },
  text: {
    fontSize: 14,
    color: "#240F10",
    textAlign: "center",
    marginTop: 8,
  },
  form: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 16,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  field: {
    paddingHorizontal: 16,
    flexDirection: "column",
    height: 64,
  },
  label: {
    fontSize: 12,
    color: "#240F10",
  },
  inputChecked: {
    fontSize: 12,
    color: "#3D3D90",
    width: 120,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#FFF",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 12,
    width: 120,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#FFF",
    color: "#E53035",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputSucess: {
    fontSize: 12,
    width: 120,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#FFF",
    color: "#2EB363",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 160,
    height: 46,
    borderRadius: 10,
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

export default CheckList;
