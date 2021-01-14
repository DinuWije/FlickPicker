import * as React from "react";
import { Button, View, Text, Linking } from "react-native";
import { titleStyles as styles } from "../themes/styles";

const Title = () => {
  return (
    <View>
      <Text style={styles.titleText}>FlickPicker</Text>
      <Text style={styles.mediumText}>
        A tool to help you and your indecisive friends figure out what movie or
        show to watch tonight!
      </Text>
      <Text
        style={styles.linkText}
        onPress={() =>
          Linking.openURL("https://github.com/DinuWije/FlickPicker")
        }
      >
        Feel free to fork this React Native project from my GitHub!
      </Text>
    </View>
  );
};

export default Title;
