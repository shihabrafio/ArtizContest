import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import LottieView from "lottie-react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <LottieView
        source={require("../assets/lottie/LottieLego.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
