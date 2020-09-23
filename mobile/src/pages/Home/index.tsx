import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const codebacker = require("../../assets/Codebacker/codebacker.png");
import { RectButton } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-community/async-storage";

import createVolumes from "../../utils/createVolumes";

import api from "../../services/api";

const Home = () => {
  const [loadingCode, setLoadingCode] = useState("");

  const navigation = useNavigation();

  const storeClearData = async () => {
    await AsyncStorage.clear();
  }
  
  storeClearData();

  const storeUnicData = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const storeObjectData = async (key: string, object: object) => {
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.setItem(key, jsonValue);
  };

  const requestLoadsList = async (id: string) => {
    try {
      const loads = await api.get(`/loads/${id}`);
      return loads;
    } catch (error) {
      return "error404";
    }
  }

  async function handleNavigateToCheckList() {
    if (loadingCode === "0") {
      return alert("ERROR: Código inválido!")
    }
    const loadsData = await requestLoadsList(loadingCode); // will be a async function to acess the Database

    if (loadsData === "error404") {
      return alert("ERROR 404: O servidor não respondeu ou não foram encontrados carregamentos!");
    }

    if (loadsData.data === "query send no rows") {
      return alert("ERROR NO_ROWS: Não foi encontrado o carramento!");
    }

    const loads = [];

    for (const load in loadsData.data) {
      if (Object.prototype.hasOwnProperty.call(loadsData.data, load)) {
        const element = loadsData.data[load];

        const volumes = createVolumes(element[2]);

        const verifyData = element.map((data: any) => {
          return (data === undefined || data === null) ? false : true;
        });

        if (verifyData.includes(false)) {
          return alert("ERROR UNDEFINED: Este carregamento não possui os dados necessários!");
        }

        const newLoad = {
          carNumber: element[0],
          requestNumber: element[1],
          volumes: volumes,
          codOS: element[3],
          vehicle: element[4],
          status: "unchecked",
        }

        loads.push(newLoad);
      }
    }

    await storeObjectData("@loadsList", loads);
    await storeUnicData("@loadingCode", loadingCode);
    
    navigation.navigate("CheckList");
  }

  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Image source={codebacker} />
      <Text style={styles.subTitle}>
        Agilize seu carregamento de produtos com checklist dinâmico
      </Text>
      <View style={styles.form}>
        <Text style={styles.label}>Código de carregamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: 98705414"
          value={loadingCode}
          autoCorrect={false}
          onChangeText={setLoadingCode}
          placeholderTextColor="#898383"
          keyboardType="number-pad"
        />
        <LinearGradient colors={["#E53035", "#BC151B"]} style={styles.button}>
          <RectButton onPress={handleNavigateToCheckList}>
            <Text style={styles.buttonText}>Ver Lista</Text>
          </RectButton>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#DEDEE3",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  subTitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#9D6C70",
  },
  form: {
    marginTop: 30,
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 3,
    color: "#33191A",
  },
  input: {
    height: 46,
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 14,
    fontSize: 14,
  },
  button: {
    width: 160,
    height: 46,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.33,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "#DEDEE3",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 14,
  },
});

export default Home;
