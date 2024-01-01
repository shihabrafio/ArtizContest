import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export const EventScreen = ({navigation}) => {
  const handleButtonPress = () => {
    navigation.navigate('Participant Details');
  };
  return (
    <ScrollView style={styles.back}>
      <View>
        <View style={styles.infoContainer1}>
          <Text style={styles.infoText}><Text style={styles.bold}>Venue :</Text> To be confirmed</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Time :</Text> Nov 14, 2023 | 10:30 PM</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Phone :</Text> +91 9945491929 </Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Email :</Text> connect@artiz.in</Text>
        </View>
        <View style={styles.infoContainer2}>
        <Text
          style={{
            fontSize: 24,
            marginBottom: 10,
            fontFamily: "RedHatDisplay_700Bold",
          }}
        >
          Competition Details
        </Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Age 4 -16 Years :</Text> We have age-specific categories to make it fair 👦👧</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Art Categories :</Text> 🖼️ Painting and 🎨 mixed media – explore what your child loves</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Art Materials :</Text> Writing pad, paper, graphite pencil & rubber will be provided to the participants for free📋✏️</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Participate :</Text> The contest will be conducted at the mentioned venue and time 👩🏻‍🎨🧑🏻‍🎨</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Judging Criteria :</Text> Our expert judges focus on creativity, originality, technique, and theme relevance 🧐</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Prizes :</Text> 🎁 Winners get cool prizes like art supplies and certificates. Everyone gets participation certificates 🏆</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Results :</Text> The awards and certificates will be presented on the event day itself🏅🎉</Text>
        </View>
        <View style={styles.infoContainer3}>
        <Text
          style={[{
            fontSize: 24,
            marginBottom: 10,
            fontFamily: "RedHatDisplay_700Bold",
          }, styles.infoText2]}
        >
          Fee Details
        </Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.bold]}>Level</Text>
              <Text style={[styles.cell, styles.bold]}>Class</Text>
              <Text style={[styles.cell, styles.bold]}>Fees</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Kindergarten</Text>
              <Text style={styles.cell}>PreKg - UKG</Text>
              <Text style={styles.cell}>Rs. 299/-</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Primary</Text>
              <Text style={styles.cell}>1st - 5th Std</Text>
              <Text style={styles.cell}>Rs. 399/-</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Secondary</Text>
              <Text style={styles.cell}>6th - 10th Std</Text>
              <Text style={styles.cell}>Rs. 499/-</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.verifyButton}
        onPress={handleButtonPress}
      >
        <Text style={styles.verifyText}>Continue</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#FFF ',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#DAECEB',
        shadowOffset: { width: 4, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
    }),
  },
  infoContainer2: {
    width: "90%",
    height: 480,
    flexShrink: 0,
    backgroundColor: '#EAF8F6',
    padding: 20,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 12,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#DAECEB',
        shadowOffset: { width: 4, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
    }),
  },
  infoContainer3: {
    width: "90%",
    flexShrink: 0,
    backgroundColor: '#EAF8F6',
    padding: 20,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 12,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#DAECEB',
        shadowOffset: { width: 4, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
    }),
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
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    width: 330,
    gap: 5,
  },
  cell: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 9,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  infoText2: {
    marginLeft: "31%",
    paddingBottom: 8
  }
});