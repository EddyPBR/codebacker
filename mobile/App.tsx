import { StatusBar } from "expo-status-bar";
import React from "react";

import { enableScreens } from "react-native-screens";

import Routes from "./src/routes";

export default function App() {
  enableScreens();
  return (
    <>
      <StatusBar style="light" backgroundColor="#E32F34" translucent />
      <Routes />
    </>
  );
}
