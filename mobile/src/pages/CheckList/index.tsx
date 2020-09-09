import React from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import ListItem from "../../components/ListItem";
import Header from "../../components/Header";
import SaveButton from "../../components/SaveButton";

import Request from "../../services/requestExample";

interface Params {
  loadingCode: number;
}

// only importing some data for tests
const requests = Request;

const CheckList = () => {
  const route = useRoute();

  const routeParams = route.params as Params;

  const { loadingCode } = routeParams;

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
          {requests.map( (request, index) => (
            <ListItem data={request} loadingCode={loadingCode} key={index} />
          ))}
        </ScrollView>
      </View>
      <SaveButton />
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
  checkList: {
    marginTop: 30,
    alignSelf: "flex-start",
    height: 380,
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
});

export default CheckList;
