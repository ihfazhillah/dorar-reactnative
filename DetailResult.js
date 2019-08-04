import React, {useState, useEffect} from 'react';
import {Text, Button, TouchableOpacity, View, ScrollView, FlatList} from 'react-native';
import cheerio from 'cheerio-without-node-native'
import _ from 'lodash'


function DetailResult({navigation}) {
    const base_url = 'https://dorar.net/dorar_api.json?skey='

    const [result, setResult] = useState(null)

    async function fetchResult() {
        const response = await fetch(base_url + navigation.getParam('q'))
        const json = await response.json()
        setResult(json)
    }

    useEffect(() => {fetchResult()}, [])

    if (!result) {
        return <View><Text>Loading...</Text></View>
    }

    function setData(response) {
        const $ = cheerio.load(response.ahadith.result)
        data = $('.hadith').map(function () {return $(this).text()}).get()
        info = $('.hadith-info').map(function () {return $(this).text()}).get()
        // console.log(data)
        return _.zip(data, info)
    }

    function _renderItem({item}) {
        return (<TouchableOpacity>
            <View>
                <Text style={{fontSize: 20, padding: 10, paddingBottom: 5, marginEnd: 5}}>
                    {item[0]}
                </Text>
                <Text style={{fontSize: 15, paddingTop: 0, paddingEnd: 10}}>
                    {item[1]}
                </Text>

            </View>
        </TouchableOpacity>
        )
    }

    return <ScrollView>
        <FlatList
            data={setData(result)}
            renderItem={_renderItem}
            keyExtractor={(item, index) => item + index}
        />
    </ScrollView>
}

DetailResult.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('q')
})

export default DetailResult;
