import { StyleSheet, Text, View } from "react-native";
import LoadingScreen from "./src/screens/LoadingScreen";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PhoneLogin from "./src/screens/PhoneLogin";
import OtpScreen from "./src/screens/OtpScreen";
import { Direction } from "./src/screens/Direction";
import { EventScreen } from "./src/screens/EventScreen";
import {
  useFonts,
  RedHatDisplay_300Light,
  RedHatDisplay_400Regular,
  RedHatDisplay_500Medium,
  RedHatDisplay_600SemiBold,
  RedHatDisplay_700Bold,
} from "@expo-google-fonts/red-hat-display";
import { StatusBar } from 'react-native';
import WebScreen from "./src/screens/WebScreen";
import { FormScreen } from "./src/screens/FormScreen";
import UPI from "./src/screens/UPI";
import PhonePe from "./src/screens/PhonePe";
import { StripeProvider } from "@stripe/stripe-react-native";

const Stack = createStackNavigator();
export default function App() {

  let [fontsLoaded] = useFonts({
    RedHatDisplay_300Light,
    RedHatDisplay_400Regular,
    RedHatDisplay_500Medium,
    RedHatDisplay_600SemiBold,
    RedHatDisplay_700Bold,
    OpenSansRegular: require("./assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 3500);
  }, []);

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <StripeProvider publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx" additionalPaymentMethods={['googlePay']}>
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator initialRouteName="Phone Login">
        <Stack.Screen name="Phone Login" component={PhoneLogin} />
        <Stack.Screen name="Otp Screen" component={OtpScreen} />
        <Stack.Screen name="Select Your Direction" component={Direction} />
        <Stack.Screen name="Event Screen" component={EventScreen} />
        <Stack.Screen name="Web Browser" component={WebScreen} />
        <Stack.Screen name="Participant Details" component={FormScreen} />
        {/* <Stack.Screen name="UPI Payment" component={UPI} /> */}
        <Stack.Screen name="PhonePe Payment" component={PhonePe} />
      </Stack.Navigator>
    </NavigationContainer>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
