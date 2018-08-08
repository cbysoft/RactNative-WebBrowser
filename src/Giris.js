import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';

export class Giris extends Component {

    constructor(props) {
        super(props);
        this.state = {

            isLogin: false,
            email: '',
            sifre: '',
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('isLogin').then(value => this.setState({ isLogin: value }))
        AsyncStorage.getItem('id').then(valueId => this.setState({ id: valueId }))
        if (this.cgr) {
            return (
                this.LoginServis());
        }
    }
    session(status) {
        AsyncStorage.setItem('isLogin', status);
        AsyncStorage.getItem('isLogin').then(value => this.setState({ isLogin: value }))
        //alert(status)
    }
    setData(valueId) {
        if (valueId != 0) {
            AsyncStorage.setItem('id', valueId.toString());
        }
    }

    LoginServis() {
        return fetch('http://192.168.1.107:80/Aytar/public/api/users/sign', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.sifre
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    sonuc: responseJson.sonuc,
                    id: responseJson.UserId
                });
                this.snc();
            })
            .catch((error) => {
                console.error(error);
            });
    }
    servisCagir = () => {
        this.cgr = true
        this.componentDidMount();
    }


    snc() {
        if (this.state.sonuc == "ok") {
            Alert.alert(
                'Hoş Geldiniz :)',
                'Uygulama açılıyor..',
                [
                    {
                        text: 'Tamam', onPress: () => this.props.navigation.navigate('PageScreen')
                    },
                ],
                { cancelable: false }
            )
            this.setData(this.state.id);
            this.session('true');
        } else if (this.state.sonuc == null) { Alert.alert("Lütfen bilgileri eksiksiz girin ") }
        else {
            Alert.alert(this.state.sonuc)
        }
    }

    git = () => {
        this.props.navigation.navigate('PageScreen')
    }
    render() {
        if (this.state.isLogin == 'true') {
            return (
                <View>
                    {this.git()}
                </View>

            );
        }
        else {
            return (

                <View style={{ flex: 1,alignItems: 'center', }} >
                    <View style={{ margin: 10, width: '90%', height: 150, alignItems: 'center', justifyContent: 'center', }}>
                        <Image style={{ width: 150, height: 150 }} resizeMode="contain" source={require('./images/logo.png')} />
                        <Text style={{ fontSize: 16 }}>Türkiye'nin ilk yerli tarayıcısı<Text style={{ color: 'red', fontSize: 22 }}> AyTar</Text>'a Hoşgeldiniz.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <TextInput keyboardType='email-address' style={{ width: '75%', borderWidth: 1, borderRadius: 15, paddingLeft: 15, paddingRight: 15, fontSize: 20 }} placeholder='E-maili girin' onChangeText={(email) => this.setState({ email })} underlineColorAndroid='transparent' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <TextInput style={{ width: '75%', borderWidth: 1, borderRadius: 15, paddingLeft: 15, paddingRight: 15, fontSize: 20 }} placeholder='Şifreyi girin' onChangeText={(sifre) => this.setState({ sifre })} underlineColorAndroid='transparent' />

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <TouchableOpacity onPress={(this.servisCagir)} style={{ borderRadius: 5, borderWidth: 1, marginLeft: 15, width: 60, height: 45, backgroundColor: '#D8D8D8', justifyContent: 'center', alignItems: 'center', }} >
                            <Text>Giriş</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        }
    };
}
export default Giris;

