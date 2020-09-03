import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const showDate = () => {
    console.log(date);
  };

  // nav
  const navigation = useNavigation();
  function handleNavigateToExample() {
    navigation.navigate("CheckList", {
      hello: "CheckList screen",
    });
  }

  return (
    <View style={styles.container}>
      <Text>{String(date)}</Text>
      <Button onPress={showDatepicker} title="Show date picker!" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="default"
          onChange={onChange}
        />
      )}
      <Button onPress={showDate} title="show date" />
      <Button onPress={handleNavigateToExample} title="Check List" />
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

export default Home;
