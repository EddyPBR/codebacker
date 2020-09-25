import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Alert, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RectButton } from "react-native-gesture-handler";

interface Params {
  loadingCode: number | string;
  isWhite: boolean;
  checklist: null | boolean
}

const Header = (params: Params) => {
  const { isWhite, loadingCode } = params;
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

  return isWhite ? (
    <View style={styles.header}>
      <RectButton
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-double-left" size={24} color="#DEDEE3" />
        <Text style={{ color: "#FFF" }}>Voltar</Text>
      </RectButton>
      <Text style={{ fontSize: 14, color: "#DEDEE3" }}>
        Cod.:
        <Text style={{ color: "#FFF", fontWeight: "bold" }}> {loadingCode}</Text>
      </Text>
    </View>
  ) : (
    <View style={styles.header}>
      <RectButton
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => onBackPress()}>
        <Icon name="chevron-double-left" size={24} color="#3D3D90" />
        <Text style={{ color: "#3D3D90" }}>Voltar</Text>
      </RectButton>
      <Text style={{ fontSize: 14, color: "#240F10" }}>
        Cod.:
        <Text style={{ color: "#D71F26", fontWeight: "bold" }}> {loadingCode}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#DEDEE3",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});

export default Header;
