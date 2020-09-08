import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RectButton } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import ListItem from "../../components/ListItem";
// format-list-bulleted-square

interface Params {
  loadingCode: number;
}

const CheckList = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const routeParams = route.params as Params;

  const { loadingCode } = routeParams;

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <RectButton style={styles.backLink} onPress={() => navigation.goBack()}>
          <Icon name="chevron-double-left" size={24} color="#3D3D90" />
          <Text style={styles.backLinkText}>Voltar</Text>
        </RectButton>
        <Text style={styles.codText}>
          Cod.:<Text style={styles.loadingCode}> {loadingCode}</Text>
        </Text>
      </View>

      <View style={styles.checkList}>
        <View style={styles.titleRow}>
          <Icon name="format-list-bulleted-square" size={24} color="#240F10" style={{marginRight: 3}} />
          <Text style={styles.title}>Lista de checagem</Text>
        </View>
        <ScrollView style={styles.boxList}>
          <ListItem status="sucess" />
          <ListItem status="fail" />
          <ListItem status="" />
        </ScrollView>
      </View>

      <LinearGradient colors={["#2EB363", "#1E8F4B"]} style={styles.button}>
        <RectButton onPress={() => alert("ok")}>
          <Text style={styles.buttonText}>Ver Lista</Text>
        </RectButton>
      </LinearGradient>
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
  backLink: {
    flexDirection: "row",
    alignItems: "center",
  },
  backLinkText: {
    color: "#3D3D90",
  },
  codText: {
    fontSize: 14,
    color: "#240F10",
  },
  loadingCode: {
    color: "#D71F26",
    fontWeight: "bold",
  },
  checkList: {
    marginTop: 30,
    alignSelf: "flex-start",
    height: 380,
    width: "100%"
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
  button: {
    width: 160,
    height: 46,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#DEDEE3",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 14,
  },
  boxList: {
    marginTop: 8,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
});

export default CheckList;
