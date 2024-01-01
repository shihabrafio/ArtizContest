import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Touchable, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

const API_URL = "http://localhost:3000";

function UPI({ route }){
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();
    const formData = route.params.formData;
    const image = route.params.image;
    const calculatedPrice = route.params.calculatedPriceNow;

    console.log('formData:', formData);
    console.log('image:', image);
    
    const fetchPaymentIntentClientSecret = async () => {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { clientSecret, error } = await response.json();
      return { clientSecret, error };
    };
  
    const handlePayPress = async () => {
      //1.Gather the customer's billing information (e.g., email)
      if (!cardDetails?.complete || !email) {
        Alert.alert("Please enter Complete card details and Email");
        return;
      }
      const billingDetails = {
        email: email,
      };
      //2.Fetch the intent client secret from the backend
      try {
        const { clientSecret, error } = await fetchPaymentIntentClientSecret();
        //2. confirm the payment
        if (error) {
          console.log("Unable to process payment");
        } else {
          const { paymentIntent, error } = await confirmPayment(clientSecret, {
            type: "Card",
            billingDetails: billingDetails,
          });
          if (error) {
            alert(`Payment Confirmation Error ${error.message}`);
          } else if (paymentIntent) {
            alert("Payment Successful");
            console.log("Payment successful ", paymentIntent);
          }
        }
      } catch (e) {
        console.log(e);
      }
      //3.Confirm the payment with the card details
    };

  return (  
    <View>
      <View style={styles.infoContainer1}>
      <Text
          style={{
            fontSize: 24,
            marginBottom: 10,
            fontFamily: "RedHatDisplay_700Bold",
          }}
        >
          {formData.participantName}
        </Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Age : </Text>{formData.age}</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>School : </Text>{formData.schoolName}</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Payable Amount : </Text>₹{calculatedPrice} for Class {formData.standard}</Text>
          <Text
          style={{
            fontSize: 24,
            marginBottom: 10,
            marginTop: 20,
            fontFamily: "RedHatDisplay_700Bold",
          }}
        >
          Payment Gateway
        </Text>
        </View>
        <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <TouchableOpacity style={styles.verifyButton}
        onPress={handlePayPress}
      >
        <Text style={styles.verifyText}>Pay</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default UPI;

const styles = StyleSheet.create({
    bold: {
      fontWeight: '700',
    },
    infoContainer1: {
      width: "90%",
      height: 165,
      flexShrink: 0,
      backgroundColor: '#EAF8F6',
      padding: 20,
      marginLeft: 20,
      marginTop: 20,
      borderRadius: 12,
    },
    infoText: {
      fontSize: 16,
      marginBottom: 10,
    },
    verifyButton: {
      backgroundColor: '#00A9A3',
      padding: 15,
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 6
      ,
      width: "90%",
      marginLeft: 18,
      marginBottom: 20,
    },
    verifyText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    container: {
      justifyContent: "center",
      marginTop: 30,
      padding: 30,
    },
    input: {
      backgroundColor: "#EAF8F6",
      borderRadius: 10,
      fontSize: 20,
      height: 50,
      padding: 10,
    },
    card: {
      backgroundColor: "#EAF8F6",
    },
    cardContainer: {
      height: 50,
      marginVertical: 30,
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