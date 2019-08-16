import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import DetailResult from './DetailResult';
import ShareMenu from 'react-native-share-menu';


class App extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            value : ''
        }

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

    render() {
        const { navigation } = this.props
        const {value} = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>الدرر السنية</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{height: 50, margin: 5}}
                        placeholder="البحث في الموسوعة"
                        value={value}
                        onChangeText={(text) => {this.setState({value:text})}}
                        onSubmitEditing={() => navigation.navigate('Detail', {q: value})}
                        style={{fontSize:24}}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        paddingBottom: 30,
    },
    headerText: {
        fontSize: 35,
        fontWeight: "600"
    },
    inputContainer: {
        height: 50,
        borderStyle: 'solid',
        borderWidth: 0.75,
        borderRadius: 25,
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
