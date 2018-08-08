import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  AsyncStorage, TouchableWithoutFeedback, Keyboard, ScrollView
} from 'react-native';
import Index from './index.js';
import { Action, Actions } from 'react-native-router-flux';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name1: "", email1: "", password1: ""
    }
  }
  durum = false; cgr = false;
  componentDidMount() {
    if (this.durum) {
      return (
        this.servis()
      );
    }
    if (this.cgr) {
      return (
        this.servisIdGetir()
      )
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


  servis() {
    fetch('http://192.168.1.109:80/KelimeOyunu/public/api/users/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name1,
        email: this.state.email1,
        password: this.state.password1
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          sonuc1: responseJson.Result
        });
        this.snc();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  servisIdGetir() {
    fetch('http://192.168.1.107:80/KelimeOyunu/public/api/users/sign', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email1,
        password: this.state.password1
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          sonuc: responseJson.Result,
          id: responseJson.UserId
        });
        this.snca();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  snca() {
    if (this.state.sonuc == "ok") {
      Alert.alert(
        'Hoş Geldiniz :)',
        'Uygulama açılıyor..',
        [
          {
            text: 'Tamam', onPress: () => Actions.MainPage()
          },
        ],
        { cancelable: false }
      )
      this.setData(this.state.id);
      this.session('true');
    } else {
      Alert.alert(this.state.sonuc)
    }
  }
  AnaSayfayaGit() {
    this.durum = false
    this.cgr = true;
    this.componentDidMount();
  }
  snc() {
    if (this.state.sonuc1 == "ok") {
      this.durum = false;
      Alert.alert(
        'Uyarı',
        'Kayıt başarılı',
        [
          { text: 'Tamam', onPress: () => this.AnaSayfayaGit(), style: 'cancel' },
        ],
        { cancelable: false }
      )
    } else if (this.state.sonuc == null) { Alert.alert("Lütfen bilgileri eksiksiz girin.  ") }
    else {
      Alert.alert(this.state.sonuc)
    }
  }

  fonk = () => {
    this.durum = true;
    this.componentDidMount()
  }
  render() {
    return (
      <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 6, }} >
        <StatusBar hidden={true} />

        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>AYTAR</Text>
        </View>
        <View style={{ flex: 5,paddingTop:'10%' }}>
          <ScrollView style={styles.container} keyboardShouldPersistTaps={false}>
            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center', }}>



              <View style={styles.Main}>
                <View style={styles.ads}>
                  <View style={styles.leftText}>
                    <Text style={{ fontSize: 25 }}>İsim </Text>
                  </View>
                  <View style={styles.RightView}>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(name1) => this.setState({ name1 })} />
                  </View>
                </View>

                <View style={styles.ads}>
                  <View style={styles.leftText}>
                    <Text style={{ fontSize: 25 }}>E-mail</Text>
                  </View>
                  <View style={styles.RightView}>
                    <TextInput underlineColorAndroid='transparent'
                      keyboardType='email-address'
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChangeText={(email1) => this.setState({ email1 })}
                    />
                  </View>
                </View>

                <View style={styles.ads}>
                  <View style={styles.leftText}>
                    <Text style={{ fontSize: 25 }}>Şifre</Text>
                  </View>
                  <View style={styles.RightView}>
                    <TextInput secureTextEntry={true} underlineColorAndroid='transparent'
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChangeText={(password1) => this.setState({ password1 })}
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.btn} onPress={this.fonk}>
                  <Text style={styles.btnText}>Kayıt Ol</Text>
                </TouchableOpacity>
              </View>


            </View>
          </ScrollView>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5
  },
  Main: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#123',
    width: '100%',
  },
  btn: {
    backgroundColor: '#4E6178',
    width: 150,
    height: 40,
    marginTop: 15,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftText: {
    flex: 2
  },
  RightView: { flex: 3 },
  ads: {
    flexDirection: 'row',
    marginTop: '3%'
  }
});
