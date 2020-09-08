import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import CheckList from "./pages/CheckList";
import Home from "./pages/Home";

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="CheckList" component={CheckList} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
