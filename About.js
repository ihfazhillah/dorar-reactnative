import React  from 'react';
import {Image, Linking, Text, View, StyleSheet} from 'react-native'


export default function About(){
    return <View style={styles.container}>
        <Image source={require('./dorar.png')} style={{height: 100, width: 100}}/>
        <Text style={styles.headerText}>الدرر السنية</Text>
        <Text>Validate hadith through dorar.net API</Text>
        <Text>Muhammad Ihfazhillah <Text onPress={() => {Linking.openURL('mailto:mihfazhillah@gmail.com')}}>{'<mihfazhillah@gmail.com>'}</Text></Text>
        <Text onPress={() => {Linking.openURL('https://github.com/ihfazhillah/dorar-reactnative')}}>https://github.com/ihfazhillah/dorar-reactnative</Text>
        <Text onPress={() => {Linking.openURL('https://flaticon.com')}}>Credits: recording and info icon from flaticon.com</Text>
        </View>
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 35,
        fontWeight: '600'
    }
})

About.navigationOptions = {
    title: 'Dorar Hadith Search'
}
