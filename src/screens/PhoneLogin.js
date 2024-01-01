import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import PhoneInput from "react-native-phone-input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";

const PhoneLogin = ({navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  
  const recaptchaVerifier = React.useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");
  
  const sendVerfication = async () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then(setVerificationId);
        setPhoneNumber('')

  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePhoneChange = (phoneNumber) => {
    const countryCode = phoneNumber.slice(0, 3);
    if (countryCode === "+91" && phoneNumber.length > 13) {
      setPhoneNumberError("Phone number should not exceed 10 digits for +91");
      setPhoneNumber(phoneNumber);
    } else if (phoneNumber.length > 10) {
      setPhoneNumberError("");
      setPhoneNumber(phoneNumber);
    } else {
      setPhoneNumberError("");
      setPhoneNumber(phoneNumber);
    }
    setIsDisabled(phoneNumber.length > 13);
  };


  const handleRefresh = () => {
    setPhoneNumberError("");
    setIsDisabled(false);
    console.log(isDisabled)
  };

  const handleOnPress = () => {
    console.log("Phone Number:", phoneNumber);
    // Perform further actions with the phone number here
    navigation.navigate('Otp Screen', { phoneNumber: phoneNumber });
  };

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "start",
          backgroundColor: "#f5f5f5",
          padding: 20,
          marginTop: 10,
        }}
      >
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Text
          style={{
            fontSize: 24,
            marginBottom: 10,
            fontFamily: "RedHatDisplay_700Bold",
          }}
        >
          Welcome buddy 👋🏻
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "left",
            marginBottom: 20,
            color: "#545454",
            fontFamily: "OpenSansRegular",
          }}
        >
          Your phone number will get a verification code via SMS or call.
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#e0e0e0",
            borderRadius: 10,
            width: "100%",
            marginBottom: 20,
            backgroundColor: "#F4F4F4",
          }}
        >
          <PhoneInput
            initialCountry="in"
            textStyle={{ fontSize: 18 }}
            onChangePhoneNumber={handlePhoneChange}
            value={isDisabled ? '' : phoneNumber}
            style={{
              padding: 15,
            }}
            textProps={{
              placeholder: "Enter your phone number",
            }}
            disabled={isDisabled}
          />
          {isDisabled && (
        <TouchableOpacity
        style={{
          backgroundColor: "#FF0000",
          padding: 15,
          alignItems: "center",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          height: 50,
        }}
        onPress={handleRefresh}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "RedHatDisplay_700Bold",
            fontSize: 18,
          }}
        >
          Retry
        </Text>
      </TouchableOpacity>
      )}
      {!isDisabled && phoneNumber.length === 13  && (
          <TouchableOpacity
            style={{
              backgroundColor: "#00A9A3",
              padding: 15,
              alignItems: "center",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 50,
            }}
            onPress={sendVerfication}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "RedHatDisplay_700Bold",
                fontSize: 18,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        )}
        </View>
        {phoneNumberError ? (
          <Text
            style={{
              color: "red",
              marginBottom: 20,
              marginTop: -7,
              marginLeft: 5,
            }}
          >
            {phoneNumberError}
          </Text>
        ) : null}
      </View>
    );
  }

export default PhoneLogin;