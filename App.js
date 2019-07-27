import React, {useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TextInput } from 'react-native-gesture-handler';
import DetailResult from './DetailResult';


function App({navigation}) {
  const [value, setValue] = useState(null)
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Dorar.net</Text>
      <TextInput
      style={{height: 50}}
      placeholder="اكتب الحديث"
      value={value}
      onChangeText={(text) => {setValue(text)}}
      />
      <Button onPress={() => navigation.navigate('Detail', {q: value})} title="بحث"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "600"
  }
});

const DorarApp = createStackNavigator({
  Home: {
    screen: App
  },
  Detail: {
    screen: DetailResult
  }
})


export default createAppContainer(DorarApp)
