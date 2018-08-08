import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';

export class Hakkimizda extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{ flex:1,justifyContent: 'center', alignItems: 'center',width:'80%' }}>
                <Text style={{ fontSize: 18 }}>
                
                YMT312 - YAZILIM TASARIM VE MİMARİSİ Dersi proje ödevi.
                </Text>
            </View>

        )
    }
};

export default Hakkimizda;