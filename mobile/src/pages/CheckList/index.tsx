import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CheckList = () => {
  return (
    <View style={styles.container}>
      <Text>CheckList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CheckList;
