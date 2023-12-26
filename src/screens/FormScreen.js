import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, TextInput, Avatar, PaperProvider, Text } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from "expo-image-picker";

const theme = {
  colors: {
    primary: '#00A9A3',
    underlineColor: 'transparent',
  },
};

export const FormScreen = ({navigation}) => {

  useEffect(() => {
    setFormData({
      ...formData,
      photo: image,
    });
  }, [image]);

  const [calculatedPriceNow, setCalculatedPrice] = useState(299);

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    participantName: '',
    age: '',
    standard: '',
    locality: '',
    schoolName: '',
    hobbies: '',
    email: '',
    phoneNumber: '',
    guardianName: '',
    photo: '',
  });

  const [inputErrors, setInputErrors] = useState({
    participantName: '',
    age: '',
    standard: '',
    locality: '',
    schoolName: '',
    hobbies: '',
    email: '',
    phoneNumber: '',
    guardianName: '',
    photo: '',
  });

  const fieldDisplayNames = {
    participantName: 'Participant name',
    age: 'Age',
    standard: 'Standard',
    locality: 'Locality',
    schoolName: 'School name',
    hobbies: 'Hobbies',
    email: 'Email ID',
    phoneNumber: 'Phone number',
    guardianName: 'Parent’s/Guardian’s name',
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    if (value.trim() === '' && field !== 'photo') {
      setInputErrors({
        ...inputErrors,
        [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
      });
    } else {
      setInputErrors({
        ...inputErrors,
        [field]: '',
      });
    }
  };

  const handleStandardChange = (value) => {
    let calculatedPrice = calculatedPriceNow;

    if (value.toLowerCase() === 'lkg' || value.toLowerCase() === 'ukg' || value.toLowerCase() === 'prekg') {
      calculatedPrice = 299;
    } else if (parseInt(value) >= 1 && parseInt(value) <= 5) {
      calculatedPrice = 399;
    } else if (parseInt(value) >= 6 && parseInt(value) <= 10) {
      calculatedPrice = 499;
    }

    setCalculatedPrice(calculatedPrice);

    setFormData({
      ...formData,
      standard: value,
    });
  };

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const pickedImage = result.assets[0].uri;
  
      setImage(pickedImage);
      setFormData({
        ...formData,
        photo: pickedImage,
      });
  
      setInputErrors({
        ...inputErrors,
        photo: '',
      });
    }
  };


  const handleSubmit = async () => {

    for (const field in formData) {
      if (formData[field] === '' && field !== 'photo') {
        setInputErrors({
          ...inputErrors,
          [field]: `${fieldDisplayNames[field]} is required.`,
        });
        return;
      }
    }
    
    console.log(formData);

    if (formData.photo == null) {
      setInputErrors({
        ...inputErrors,
        photo: 'Photo is required.',
      });
      console.log("Photo is required.")
      return;
    }

    // Formspree API
    // const requiredFields = ['participantName', 'age', 'standard', 'locality', 'schoolName', 'hobbies', 'email', 'phoneNumber', 'guardianName'];

    // for (const field of requiredFields) {
    //   if (!formData[field]) {
    //     console.log(`Please fill in the ${field} field`);
    //     return;
    //   }
    // }

    // try {
    //   const response = await fetch('https://formspree.io/f/xeqwrjjn', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     console.log('Form submitted successfully');
    //   } else {
    //     console.log('Error submitting form:', response.statusText);
    //   }
    // } catch (error) {
    //   console.error('Error:', error.message);
    // }
    console.log(formData.standard)
    // navigation.navigate('UPI Payment', { formData, image, calculatedPriceNow });
    navigation.navigate('PhonePe Payment');
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView>
    <View style={[styles.container,styles.inputContainer]}>
      <TextInput
        label="Participant’s Name"
        value={formData.participantName}
        onChangeText={(text) => handleInputChange('participantName', text)}
        style={styles.input}
      />
      {inputErrors.participantName !== '' && (
  <Text style={styles.errorText}>{inputErrors.participantName}</Text>
)}
      <TextInput
        label="Age"
        value={formData.age}
        onChangeText={(text) => handleInputChange('age', text)}
        style={styles.input}
        keyboardType="numeric"
      />
      {inputErrors.age !== '' && <Text style={styles.errorText}>{inputErrors.age}</Text>}
      <TextInput
        label="Standard"
        value={formData.standard}
        onChangeText={(text) => handleStandardChange(text)}
        style={styles.input}
      />
      {inputErrors.standard !== '' && <Text style={styles.errorText}>{inputErrors.standard}</Text>}
      <TextInput
        label="Locality"
        value={formData.locality}
        onChangeText={(text) => handleInputChange('locality', text)}
        style={styles.input}
      />
      {inputErrors.locality !== '' && <Text style={styles.errorText}>{inputErrors.locality}</Text>}
      <TextInput
        label="School Name"
        value={formData.schoolName}
        onChangeText={(text) => handleInputChange('schoolName', text)}
        style={styles.input}
      />
      {inputErrors.schoolName !== '' && <Text style={styles.errorText}>{inputErrors.schoolName}</Text>}
      <TextInput
        label="Your Hobbies"
        value={formData.hobbies}
        onChangeText={(text) => handleInputChange('hobbies', text)}
        style={styles.input}
      />
      {inputErrors.hobbies !== '' && <Text style={styles.errorText}>{inputErrors.hobbies}</Text>}
      <TextInput
        label="Email ID"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        style={styles.input}
      />
      {inputErrors.email !== '' && <Text style={styles.errorText}>{inputErrors.email}</Text>}
      <TextInput
        label="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(text) => handleInputChange('phoneNumber', text)}
        style={styles.input}
        keyboardType="numeric"
      />
      {inputErrors.phoneNumber !== '' && <Text style={styles.errorText}>{inputErrors.phoneNumber}</Text>}
      <TextInput
        label="Parent’s/Guardian’s Name"
        value={formData.guardianName}
        onChangeText={(text) => handleInputChange('guardianName', text)}
        style={styles.input}
      />
      {inputErrors.guardianName !== '' && <Text style={styles.errorText}>{inputErrors.guardianName}</Text>}
      {image &&
        <View style={styles.center}>
              <Image
                source={{ uri: image }}
                style={styles.avatar}
                className="w-[200] h-[200]"
                resizeMode="center"
              />
          </View>
      }

      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={{color: '#FFF', fontFamily: "OpenSansRegular", fontSize: 16}}>Upload Photo</Text>
      </TouchableOpacity>
      {inputErrors.photo !== '' && (
  <Text style={[styles.errorText, styles.photoError]}>{inputErrors.photo}</Text>
)}
      <Text>Passport size photo (PNG/JPEG format)</Text>
      <TouchableOpacity style={styles.verifyButton}
        onPress={handleSubmit}
      >
        <Text style={styles.verifyText}>Continue</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    overflow: 'hidden',
  },
  input: {
    height: 50,
    borderColor: '#00A9A3',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 8,
  },
  photoError:{
    marginLeft: 10,
  },
  uploadButton: {
    marginVertical: 12,
    backgroundColor: '#00A9A3',
    borderRadius: 12,
    height: 50,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  avatar: {
    borderRadius: 12,
    height: 100,
    width: 100,
  },
  verifyButton: {
    backgroundColor: '#00A9A3',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  verifyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

