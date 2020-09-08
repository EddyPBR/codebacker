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
import { RectButton } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const codebacker = require("../../assets/Codebacker/codebacker.png");

const Home = () => {
  const [loadingCode, setLoadingCode] = useState("");

  const navigation = useNavigation();
  function handleNavigateToExample() {
    navigation.navigate("CheckList", {
      loadingCode: loadingCode,
    });
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
          <RectButton onPress={handleNavigateToExample}>
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
