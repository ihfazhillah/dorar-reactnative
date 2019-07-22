import React, {useState, useEffect} from 'react';
import {Text, Button, View} from 'react-native';


function DetailResult({navigation}){
    return <View>
        <Text>{navigation.getParam('q')}</Text>
    </View>
}

DetailResult.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('q')
})

export default DetailResult;