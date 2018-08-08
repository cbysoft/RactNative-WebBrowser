import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

export class Gecmis extends Component {
    userıdCgr = false;
    constructor(props) {
        super(props);
        this.state = { isLoading: true, }
    }

    componentDidMount() { this.gecmiservis()
        if (this.userıdCgr == false) this.getUserIdd()
        if (this.userıdCgr) {
        this.gecmiservis()
        }
    
      }


    async getUserIdd() {
        var valueId = await AsyncStorage.getItem('id')
        if (valueId == null || valueId == 0) {
        } else {
            this.setState({ id: valueId })
            this.userıdCgr = true
            this.componentDidMount()
        }
    }



    gecmiservis() {
        return fetch('http://192.168.1.107:80/Aytar/public/api/gecmis/gshow', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usersId: 2,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    gecmis: responseJson.sonuc,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }



    render() {
        return (
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', height: 50, width: 150, borderRadius: 12, marginTop: 10 }} >
                        <Text style={{ fontSize: 18 }}>Tüm Geçmişi Sil</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={this.state.gecmis}
                        renderItem={({ item }) => <Text style={{ fontSize: 18 }}>{item.arama}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </ScrollView>
        )
    }
};

export default Gecmis;