import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Search from "./src/Components/Search";
import { Provider } from "react-redux";

import configureStore from "./src/store";

const store = configureStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: "20px",
    marginStart: "20px",
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>1. Search For Movies</Text>
        <StatusBar style="auto" />
        <Search />
      </View>
    </Provider>
  );
}
