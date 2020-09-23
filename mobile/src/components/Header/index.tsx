import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RectButton } from "react-native-gesture-handler";

interface Params {
  loadingCode: number | string;
  isWhite: boolean;
}

const Header = (params: Params) => {
  const { isWhite, loadingCode } = params;
  const navigation = useNavigation();

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
        onPress={() => navigation.goBack()}>
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
