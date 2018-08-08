import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Button, View } from 'react-native';

import { StackNavigator } from 'react-navigation';

import Gecmis from './src/Gecmis';
import Page from './src/Page';
import Ekont from './src/Ekont';
import Sekmeler from './src/Sekmeler';
import Hakkimizda from './src/Hakkimizda';
import Giris from './src/Giris';
import Kayitol from './src/Kayitol';

const AppNavigator = StackNavigator({
  GirisScreen: {
    screen: Giris,
    navigationOptions: {
      title: "Geçmis",
      header: null
    },
  },
  KayitolScreen: {
    screen: Kayitol,
    navigationOptions: {
      title: "Kayitol",
      header: null
    },
  },
   PageScreen: {
    screen: Page,
    navigationOptions: {
      title: "Tarayıcı",
      header: null
    },
  },

  GecmisScreen: {
    screen: Gecmis,
    navigationOptions: {
      title: "Geçmis",
    },
  },
  EkontScreen: {
    screen: Ekont,
    navigationOptions: {
      title: "Ebeveyn Kontrolü",
    },
  },
  SekmeScreen: {
    screen: Sekmeler,
    navigationOptions: {
      title: "Açık Sekmeler",
    },
  },
  HakkimizdaScreen: {
    screen: Hakkimizda,
    navigationOptions: {
      title: "Hakkımızda",
    },
  },

});

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}//