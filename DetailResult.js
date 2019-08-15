import React, {useState, useEffect} from 'react';
import {Text, Button, TouchableOpacity, View, ScrollView, FlatList} from 'react-native';
import cheerio from 'cheerio-without-node-native'
import _ from 'lodash'
import Share from 'react-native-share';
import ShareMenu from 'react-native-share-menu';


class DetailResult extends React.Component {

    base_url = 'https://dorar.net/dorar_api.json?skey='
    constructor(props){
        super(props)
        this.state = {
            query: "",
            result: null
        }

        this.fetchResult = this.fetchResult.bind(this)
    }

    async fetchResult() {
        const response = await fetch(this.base_url + this.props.navigation.getParam('q'))
        const json = await response.json()
        this.setState({result: json})
    }

    componentWillMount(){
        ShareMenu.getSharedText((text) => {
            this.props.navigation.navigate('Detail', {q: text})
        })
    }

    async componentDidMount(){
        await this.fetchResult()
    }

    render(){
        if (!this.state.result) {
            return <View><Text>Loading...</Text></View>
        }

        function setData(response) {
            const $ = cheerio.load(response.ahadith.result)
            data = $('.hadith').map(function () {return $(this).text()}).get()
            info = $('.hadith-info').map(function () {return $(this).text()}).get()
            // console.log(data)
            return _.zip(data, info)
        }

        async function onShare(hadith, info) {
            // try {
            //     const result = await Share.share({
            //         message: hadith + '\n' + info,
            //         dialogTitle: 'Share hadits',
            //     })

            //     alert(result.activityType)
            // } catch (error) {
            //     alert(error.message)
            // }

            try {
                const result = await Share.open({
                    message: hadith + '\n' + info,
                    title: 'hello world',
                    url: this.base_url + this.props.navigation.getParam('q')
                })
            } catch (error) {
                console.log(error.message)
            }
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
                <Button onPress={e => {onShare(item[0], item[1])}} title={'Share'} />
            </TouchableOpacity>
            )
        }

        return <ScrollView>
            <FlatList
                data={setData(this.state.result)}
                renderItem={_renderItem}
                keyExtractor={(item, index) => item + index}
            />
        </ScrollView>
    }


}

DetailResult.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('q')
})

export default DetailResult;
