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
                <Text style={styles.headerText}>Dorar.net</Text>
                <TextInput
                    style={{height: 50}}
                    placeholder="اكتب الحديث"
                    value={value}
                    onChangeText={(text) => {this.setState({value:text})}}
                />
                <Button onPress={() => navigation.navigate('Detail', {q: value})} title="بحث" />
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
