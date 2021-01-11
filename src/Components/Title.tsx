import * as React from "react";
import { Button, View, Text } from "react-native";
import { titleStyles as styles } from "../themes/styles";

const Title = () => {
  return (
    <View>
      <Text style={styles.titleText}>FlickPicker</Text>
      <Text style={styles.mediumText}>
        A tool to help you and your indecisive friends decide what movie or show
        to watch tonight!
      </Text>
    </View>
  );
};

export default Title;
