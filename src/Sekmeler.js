import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Alert,
  View, WebView, TextInput, StatusBar, ActivityIndicator, FlatList, LoadingError,
} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

export default class Ekont extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  sekmeEkle = () => {
    a = <View style={{ borderWidth: 1, margin: 10, width: 150, height: 150, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}><TouchableOpacity onPress={() => this.Sekmedegistir(item)} >     <WebView style={{ width: 145, height: 150 }} source={{ uri: 'https://www.google.com/' }} automaticallyAdjustContentInsets={false} /> </TouchableOpacity></View>
  }
  yaz() {
    sekmeLink=[]
    sekmeLink.push(this.a);
    return (
      <View>
        {sekmeLink}
      </View>
    )
  }
  render() {
    return (
      <View style={{ flex: 10, backgroundColor: '#E6E6E6' }}>
        <StatusBar hidden={true} />

        <View style={{ flex: 9, width: '100%', backgroundColor: '#FFFFFF' }}>
          <View style={{ flex: 7, flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
            <ScrollView>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', margin: 10, }}>
                {this.yaz()}
                <TouchableOpacity onPress={this.sekmeEkle} style={{ borderWidth: 1, flexDirection: 'row', margin: 10, width: 150, height: 150, backgroundColor: '#D8D8D8', justifyContent: 'center', alignItems: 'center', }} >
                  <Image style={{ width: '60%', height: '60%' }} source={require('./images/newtabb.png')} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={{ flex: 0.8, flexDirection: 'row', backgroundColor: '#ece9e9' }}>

          <TouchableOpacity onPress={this.goback} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./images/back.png')} style={{ width: '50%', height: '60%' }}></Image>
          </TouchableOpacity>

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
