import React, {useState, useEffect} from 'react';
import {Text, Button, View, ScrollView} from 'react-native';
import cheerio from 'cheerio-without-node-native'


function DetailResult({navigation}){
    const base_url = 'https://dorar.net/dorar_api.json?skey='

    const [result, setResult] = useState(null)

    async function fetchResult(){
        const response = await fetch(base_url + navigation.getParam('q'))
        const json = await response.json()
        setResult(json)
    }

    useEffect(() => {fetchResult()}, [])

    if (!result){
        return <View><Text>Loading...</Text></View>
    }

    function setData(response){
        const $ = cheerio.load(response.ahadith.result)
        data = $('.hadith').contents().map(function(){ return $(this).text()}).get()
        // console.log(data)
        return data
    }

    return <ScrollView>
        {setData(result).map((x)=> <Text>{JSON.stringify(x) + '\n-------'}</Text>)}
    </ScrollView>
}

DetailResult.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('q')
})

export default DetailResult;
