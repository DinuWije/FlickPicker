import { StatusBar } from "expo-status-bar";
import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import Search from "./src/Components/Search";
import AddMovies from "./src/Components/AddMovies";
import Title from "./src/Components/Title";
import { Provider } from "react-redux";
import { appStyles as styles } from "./src/themes/styles";

import configureStore from "./src/store";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.mainContainer}>
        <Title />
        <View style={styles.subContainer}>
          <View style={styles.searchArea}>
            <StatusBar style="auto" />
            <Search />
          </View>
          <View style={styles.addMoviesArea}>
            <AddMovies />
          </View>
        </View>
        <Text
          style={styles.linkText}
          onPress={() =>
            Linking.openURL("https://github.com/DinuWije/FlickPicker")
          }
        >
          Feel free to fork this React Native project from my GitHub!
        </Text>
      </View>
    </Provider>
  );
}
