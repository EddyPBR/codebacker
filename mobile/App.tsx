import { StatusBar } from "expo-status-bar";
import React from "react";

import Routes from "./src/routes";

// import React, { useEffect } from 'react';
// import * as Updates from "expo-updates";

export default function App() {
  // useEffect( () => {
  //   async function updateApp() {
  //     const { isAvailable } = await Updates.checkForUpdateAsync();

  //     if(isAvailable) {
  //       await Updates.fetchUpdateAsync();
  //       await Updates.reloadAsync();
  //     }
  //   }

  //   updateApp();

  //   // now execute the command: yarn android --configuration Release
  // }, []);

  return (
    <>
      <StatusBar
        style="light"
        backgroundColor="#E32F34"
        translucent
      />
      <Routes />
    </>
  );
}
