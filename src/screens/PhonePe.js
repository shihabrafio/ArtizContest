import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

function PhonePe() {
  // const url = 'http://192.168.1.11/wordpress/index.php/artiz/';
  const url = 'https://artiz.mojo.page/artiz-art-competition-registration';

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} />
    </View>
  );
}

export default PhonePe;
