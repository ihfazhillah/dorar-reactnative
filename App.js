import React, {useState} from 'react';
import { Button, Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import DetailResult from './DetailResult';
import ShareMenu from 'react-native-share-menu';
import Voice from 'react-native-voice';


class App extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            value : '',
            stt: [],
            partialResults: [''],
        }

        Voice.onSpeechResults = this.onSpeechResult
        Voice.onSpeechError = (e) => {alert(JSON.stringify(e.error))}
        Voice.onSpeechPartialResults = this.onPartialResult

    }

    componentWillUnmount(){
        Voice.destroy().then(Voice.removeAllListeners)
    }

    componentWillMount(){
        const { navigation } = this.props
        ShareMenu.getSharedText((text) => {
            if(text){
                navigation.navigate('Detail', {q: text})
                ShareMenu.clearSharedText()
            }
        })

    }

    componentDidMount(){
        const { navigation } = this.props
        ShareMenu.getSharedText((text) => {
            if(text){
                navigation.navigate('Detail', {q: text})
                ShareMenu.clearSharedText()
            }
        })
    }

    _startRecognizing = async () => {
        try {
            Voice.start('ar-SA')
        } catch (e){
            alert(e)
        }
    }

    onSpeechResult = (e) => {
        this.setState({stt: e.value})
        this.props.navigation.navigate('Detail', {q: e.value[0]})
    }

    onPartialResult = (e) => {
        this.setState({partialResults: e.value})
    }

    render() {
        const { navigation } = this.props
        const {value} = this.state
        return (
            <View style={styles.container}>

                <Text style={styles.headerText}>الدرر السنية</Text>
                <View style={styles.inputContainer}>
                    <View style={{height: 50}}>
                        <TouchableOpacity onPress={this._startRecognizing}>
                            <Image source={require('./microphone.png')} style={{height: 30, width: 30}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 50}}>
                        <TextInput
                            style={{height: 50, fontSize: 15}}
                            placeholder="البحث في الموسوعة"
                            value={value}
                            onChangeText={(text) => {this.setState({value: text})}}
                            onSubmitEditing={() => navigation.navigate('Detail', {q: value})}
                        />
                    </View>
                </View>
            <Text style={{fontSize:15, margin: 10, alignSelf: 'stretch'}}>{this.state.partialResults[0]}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        fontSize: 20,
        paddingBottom: 30,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 35,
        fontWeight: "600"
    },
    inputContainer: {
        flexShrink:0,
        flexGrow:0,
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10
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
