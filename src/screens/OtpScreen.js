import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OtpScreen = ({route, navigation}) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = Array(4).fill(0).map((_, index) => useRef(null));

  const handleInputChange = (text, index) => {
    if (isNaN(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== '' && index < otpInputs.length - 1) {
      otpInputs[index + 1].current.focus();
    }
    else if (text === '' && index > 0) {
      otpInputs[index - 1].current.focus();
    }
  };

  const handleNumBack = () => {
    try {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Phone Login', params: { phoneNumber: '' } }],
      });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleVerify = () => {
    try {
      navigation.navigate('Select Your Direction');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <View style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "start",
        backgroundColor: "#f5f5f5",
        padding: 20,
        marginTop: 10,
    }}>
      <Text
          style={{
            fontSize: 24,
            marginBottom: 10,
            fontFamily: "RedHatDisplay_700Bold",
          }}
        >
          OTP Verification
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
          Enter the OTP sent to {phoneNumber} {"\n"}
          <TouchableOpacity onPress={handleNumBack}>
            <Text style={{
              color: "#00A9A3"
            }}>Change mobile number ?</Text>
          </TouchableOpacity>
        </Text>
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={otpInputs[index]}
            style={styles.otpInput}
            value={value}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleInputChange(text, index)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.verifyButton}
      onPress={handleVerify}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#000',
    width: 50,
    height: 50,
    textAlign: 'center',
    alignItems: "flex-start",
    margin: 5,
    borderRadius: 7,
  },
  verifyButton: {
    backgroundColor: '#00A9A3',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  verifyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OtpScreen;
