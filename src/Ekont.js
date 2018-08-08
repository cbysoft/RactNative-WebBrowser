import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Alert,
    View, WebView, TextInput, StatusBar, ActivityIndicator, FlatList, LoadingError
} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Share, { ShareSheet, Button } from 'react-native-share';/*
npm install react-native-share --save
react-native link
*/
export default class Ekont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ekontrl: false,
            email: '',
            sifre: '',
            yasakliSitelerServis: [],

        }
    }
    silinecekLink = ''
    componentDidMount() {
        if (this.ekleYasak) {
            this.yasakServisEkle()
            this.yasakServis()
        }

        if (this.cgr) {
            this.LoginServis()
        }
        else if (this.state.sonuc == "ok") {
            if (this.state.id > 0) {
                this.yasakServis()
            } else {
                this.componentDidMount()
            }
        }

        if (this.silCgr) {
            this.LinkSilServis();
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
    yskekle = () => {
        this.ekleYasak = true
        this.componentDidMount();
    }
    linkSil = (a) => {
        cevap = false
        Alert.alert(
            'Dikkat',
            a + ' Silinsin mi ?',
            [
                { text: 'Evet', onPress: () => this.SilCvp(a) },
                { text: 'Hayır', onPress: () => this.Siliptal(), style: 'cancel' },
            ],
            { cancelable: false }
        )
    }
    SilCvp = (a) => {
        this.silCgr = true;
        this.silinecekLink = a;
        this.componentDidMount();
    }

    Siliptal = () => {
        Alert.alert(
            'Dikkat',
            'İptal edildi', )

    }
    yasakServis() {
        return fetch('http://192.168.1.107:80/Aytar/public/api/users/yshow', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usersId: this.state.id,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    yasakliSitelerServis: responseJson.sonuc,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    yasakServisEkle() {
        return fetch('http://192.168.1.107:80/Aytar/public/api/users/ystore', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usersId: this.state.id,
                link: this.state.yskekleLink
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    ysksonuc: responseJson.sonuc,
                });
                this.sncYsk();
            })
            .catch((error) => {
                console.error(error);
            });
    }
    LinkSilServis() {
        return fetch('http://192.168.1.107:80/Aytar/public/api/users/ydelete', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usersId: this.state.id,
                link: this.silinecekLink
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    Silsonuc: responseJson.sonuc,
                });
                this.sncSil();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    snc = () => {
        alert(this.state.sonuc)
        if (this.state.sonuc == "ok") {
            this.cgr = false
            this.setState({ ekontrl: true })
            this.componentDidMount();
        } else if (this.state.sonuc == null) { }
        else {
            Alert.alert(this.state.sonuc)
        }
    }
    sncSil = () => {
        alert(this.state.Silsonuc)
        if (this.state.Silsonuc == "ok") {
            this.silCgr = false
            alert(this.silinecekLink + " Silindi")
            this.componentDidMount();
        } else if (this.state.Silsonuc == null) { }
        else {
            Alert.alert(this.state.Silsonuc)
        }
    }
    sncYsk = () => {
        if (this.state.ysksonuc == "eklendi") {
            Alert.alert("Eklendi")
            this.ekleYasak = false
            this.componentDidMount()
        } else if (this.state.ysksonuc == null) { }
        else {
            Alert.alert(this.state.ysksonuc)
        }
    }




    goster() {
        if (this.state.ekontrl == false) {
            return (
                <View style={{ alignItems: 'center', flex: 10, }}>
                    <View style={{ flex: 3, }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <TextInput keyboardType='email-address' style={{ width: '75%', borderWidth: 1, borderRadius: 15, paddingLeft: 15, paddingRight: 15, fontSize: 20 }} placeholder='E-maili girin' onChangeText={(email) => this.setState({ email })} underlineColorAndroid='transparent' />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <TextInput style={{ width: '75%', borderWidth: 1, borderRadius: 15, paddingLeft: 15, paddingRight: 15, fontSize: 20 }} placeholder='Şifreyi girin' onChangeText={(sifre) => this.setState({ sifre })} underlineColorAndroid='transparent' />
                            <TouchableOpacity onPress={(this.servisCagir)} style={{ borderRadius: 5, borderWidth: 1, marginLeft: 15, width: 60, height: 45, backgroundColor: '#D8D8D8', justifyContent: 'center', alignItems: 'center', }} >
                                <Text>Tamam</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 7, flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Image style={{ width: '100%', height: '100%' }} source={require('./images/stop.png')} />

                    </View>
                </View >

            );
        }
        else return (
            <View style={{ alignItems: 'center', flex: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                    <TextInput onChangeText={(yskekleLink) => this.setState({ yskekleLink })}
                        style={{ width: '75%', borderWidth: 1, borderRadius: 15, paddingLeft: 15, paddingRight: 15, fontSize: 20 }}
                        placeholder='Ekle' underlineColorAndroid='transparent' />
                    <TouchableOpacity onPress={this.yskekle}
                        style={{ borderRadius: 5, borderWidth: 1, marginLeft: 15, width: 60, height: 45, backgroundColor: '#D8D8D8', justifyContent: 'center', alignItems: 'center', }} >
                        <Text>Ekle</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <FlatList
                        data={this.state.yasakliSitelerServis}
                        renderItem={({ item }) => <View><TouchableOpacity onPress={() => this.linkSil(item.link)}><Text style={{ fontSize: 25 }}>{item.link}</Text></TouchableOpacity></View>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
        );
    }
    render() {
        let shareOptions = {
            title: "Paylaş",
            message: "",
            url: this.state.gitURL,
            subject: "Link" //  for email
        };

        return (
            <View style={{ flex: 10, backgroundColor: '#E6E6E6' }}>
                <StatusBar hidden={true} />
                <View style={{ flex: 9, width: '100%', backgroundColor: '#FFFFFF' }}>
                    <View style={{ flex: 7, flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>



                        {this.goster()}



                    </View>
                </View>
                <View style={{ flex: 0.8, flexDirection: 'row', backgroundColor: '#ece9e9' }}>
                    <TouchableOpacity onPress={this.goback} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('./images/back.png')} style={{ width: '50%', height: '60%' }}></Image></TouchableOpacity>
                    <TouchableOpacity onPress={this.goforward} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('./images/next.png')} style={{ width: '50%', height: '60%' }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.reload} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('./images/refresh.png')} style={{ width: '45%', height: '65%' }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.sekmeler} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('./images/tabs.png')} style={{ width: '50%', height: '70%' }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('./images/home.png')} style={{ width: '50%', height: '70%' }}></Image>
                    </TouchableOpacity>

                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    barr: {
        flex: 1,
        height: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#424242'

    },
    adresCubugu: {
        height: 40,
        width: '75%',
        borderRadius: 8,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#D8D8D8'
    },
    btn: {
        width: '10%',
        height: '65%',
        marginLeft: 5,
        // backgroundColor: '#A4A4A4',
        // borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sekmeBtn: {
        width: '10%',
        height: '65%',
        marginLeft: 5,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    acilirMenuStyle: {
        width: '10%',
        height: '50%',
        marginLeft: 5,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btntext: {
        justifyContent: 'center',
        alignItems: 'center'
    }


});
