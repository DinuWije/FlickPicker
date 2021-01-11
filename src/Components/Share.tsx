import { fromPairs } from "lodash";
import * as React from "react";
import { Button, View, Text } from "react-native";
import { ProgressBar, Colors, List, Card, Title } from "react-native-paper";
import { shareStyles as styles } from "../themes/styles";

const Share = () => {
  return (
    <View>
      <Card style={styles.card}>
        <Title style={styles.mainText}>3. Share With Friends</Title>
        <Title style={styles.wipText}>
          Coming soon! Please check back later!
        </Title>
      </Card>
    </View>
  );
};

export default Share;
