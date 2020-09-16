import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

interface Data {
  requestNumber: string;
  status: string;
}

interface Params {
  data: Data;
}

const ListItem = (params: Params) => {
  const { requestNumber, status } = params.data as Data;

  const navigation = useNavigation();

  function handleNavitigateToRequest() {
    navigation.navigate("Request", {
      requestNumber,
    });
  }

  if (status === "sucess") {
    return (
      <TouchableOpacity
        style={styles.checkContentSucess}
        activeOpacity={0.75}
        onPress={handleNavitigateToRequest}>
        <FeatherIcons name="check-circle" size={24} color="#2EB363" style={styles.icon} />
        <Text style={styles.text}>Pedido:</Text>
        <Text style={styles.code}>{requestNumber}</Text>
      </TouchableOpacity>
    );
  }

  if (status === "fail") {
    return (
      <TouchableOpacity
        style={styles.checkContentFail}
        activeOpacity={0.75}
        onPress={handleNavitigateToRequest}>
        <FeatherIcons name="x-circle" size={24} color="#E53035" style={styles.icon} />
        <Text style={styles.text}>Pedido:</Text>
        <Text style={styles.code}>{requestNumber}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.checkContent}
      activeOpacity={0.75}
      onPress={handleNavitigateToRequest}>
      <FeatherIcons name="info" size={24} color="#898383" style={styles.icon} />
      <Text style={styles.text}>Pedido:</Text>
      <Text style={styles.code}>{requestNumber}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkContentSucess: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 58,
    paddingHorizontal: 16,
    backgroundColor: "#C8E3D5",
    borderBottomWidth: 2,
    borderBottomColor: "#C4C4C4",
  },
  checkContentFail: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 58,
    paddingHorizontal: 16,
    backgroundColor: "#EDD0D2",
    borderBottomWidth: 2,
    borderBottomColor: "#C4C4C4",
  },
  checkContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 58,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 2,
    borderBottomColor: "#C4C4C4",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    color: "#240F10",
  },
  code: {
    paddingLeft: 4,
    color: "#3D3D90",
  },
});

export default ListItem;
