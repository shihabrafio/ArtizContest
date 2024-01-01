import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const Direction = ({navigation}) => {

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonPress = () => {
    if (activeButton === 'website') {
      navigation.navigate('Web Browser', { url: 'www.google.com' });
    } else if (activeButton === 'registration') {
      navigation.navigate('Event Screen');
    }
  };

  const handleButtonPressIn = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleButtonPressOut = () => {
    setActiveButton(null);
  };

  return (
    <View
    style={styles.container}
    >
      <View
      style={styles.imageContainer}
      >
        <View
        style={styles.buttonContainer}
        >
          <TouchableOpacity onPress={() => handleButtonPressIn('website')}
            onPressOut={handleButtonPressOut}>
          <Image
            source={require('../../assets/laptop.png')}
            style={styles.image1}
          />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === 'website' && styles.buttonPressed,
            ]}
            onPress={() => handleButtonPressIn('website')}
            onPressOut={handleButtonPressOut}
          >
            <Text style={[styles.buttonText, styles.visit, activeButton === 'website' && styles.buttontextPressed ]}>Visit Website</Text>
          </TouchableOpacity>
        </View>
        <View
        style={styles.buttonContainer}
        >
          <TouchableOpacity onPress={() => handleButtonPressIn('registration')}
            onPressOut={handleButtonPressOut}>
          <Image
            source={require('../../assets/Phone.png')}
            style={styles.image2}
          />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.event,
              activeButton === 'registration' && styles.buttonPressed,
            ]}
            onPress={() => handleButtonPressIn('registration')}
            onPressOut={handleButtonPressOut}
          >
            <Text style={[styles.buttonText, activeButton === 'registration' && styles.buttontextPressed]}>Event Registration</Text>
          </TouchableOpacity>
      </View>
      </View>
      <TouchableOpacity style={styles.verifyButton}
      onPress={handleButtonPress}
      >
        <Text style={styles.verifyText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  image1: {
    width: 125,
    marginLeft: 20,
    height: 200,
    resizeMode: 'contain',
  },
  image2: {
    width: 125,
    marginTop: 50,
    marginLeft: 14,
    flexShrink: 0,
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: 157,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4,
    flexShrink: 0,
    marginTop: 30,
    height: 250,
    borderRadius: 12,
    backgroundColor: "#F8F8F8",
  },
  button: {
    width: "100%",
    height: 100,
    display: "flex",
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: "#008580",
    borderWidth: 2,
  },
  buttonText: {
    color: '#00A9A3',
    fontSize: 15,
    fontStyle: 'normal',
    fontFamily: "RedHatDisplay_700Bold"
  },
  event:{
    marginTop: 40,
  },
  buttonPressed: {
    backgroundColor: '#00A9A3',
  },
  buttontextPressed: {
    color: '#fff',
  },
  verifyButton: {
    backgroundColor: '#00A9A3',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    width: "90%",
    marginLeft: 18,
    marginBottom: 20,
  },
  verifyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
