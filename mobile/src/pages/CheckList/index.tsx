import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Alert, BackHandler } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcons from "react-native-vector-icons/Feather";
import ListItem from "../../components/ListItem";
import Header from "../../components/Header";
import LoadingAnimation from "../../components/LoadingAnimation";

import { LinearGradient } from "expo-linear-gradient";
import { RectButton } from "react-native-gesture-handler";

import { AsyncStorage } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const CheckList = () => {
  const [loadingCode, setLoadingCode] = useState("");
  const [loadsList, setLoadsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const onBackPress = () => {
    Alert.alert("AVISO:", "Voltar sem salvar ocasionará a perda de dados do carregamento.", [
      {
        text: 'Cancelar',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => navigation.goBack() },
    ]);
    return true;
  };

  const storeClearData = async () => {
    await AsyncStorage.clear();
  }

  const getLoadingCode = async () => {
    const loadingCode = await AsyncStorage.getItem("@loadingCode");
    loadingCode ? setLoadingCode(loadingCode) : "";
  };

  const getLoadsList = async () => {
    const loadsList = await AsyncStorage.getItem("@loadsList");
    if (loadsList) {
      setLoadsList(JSON.parse(loadsList));
      setIsLoading(false);
    }
  };

  async function handleSaveCleanAndOut() {
    await storeClearData();
    navigation.goBack();
  }

  useFocusEffect(
    React.useCallback(() => {
      getLoadingCode();
      getLoadsList();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  if (isLoading === true) {
    return(
      <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <LoadingAnimation />
      </View>
    )
  }

  return (
    <View style={styles.main}>
      <Header loadingCode={loadingCode} isWhite={false} />

      <View style={styles.checkList}>
        <View style={styles.titleRow}>
          <Icon
            name="format-list-bulleted-square"
            size={24}
            color="#240F10"
            style={{ marginRight: 3 }}
          />
          <Text style={styles.title}>Lista de checagem</Text>
        </View>
        <ScrollView style={styles.boxList}>
          {loadsList.map((load, index) => (
            <ListItem data={load} key={index} />
          ))}
        </ScrollView>
      </View>

      <LinearGradient colors={["#2EB363", "#1E8F4B"]} style={styles.button}>
        <RectButton
          onPress={() => handleSaveCleanAndOut()}
          style={styles.buttonContent}>
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
    backgroundColor: "#ececef",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  checkList: {
    marginTop: 16,
    alignSelf: "flex-start",
    height: 300,
    width: "100%",
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 16,
    color: "#240F10",
  },
  boxList: {
    marginTop: 8,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  button: {
    width: 180,
    height: 50,
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
    elevation: 5,
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
