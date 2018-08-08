import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Alert, KeyboardAvoidingView,
  View, WebView, TextInput, StatusBar, ActivityIndicator, FlatList, LoadingError, AsyncStorage
} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Share, { ShareSheet, Button } from 'react-native-share';/*
npm install react-native-share --save
react-native link
*/

const WEBVIEW_REF = 'webview';
export default class Page extends Component {
  ilktiklma = 0;
  sekmeSirasi = 0;
  i = 0; userıdCgr =false;
  yasakliLinkler = []
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://www.google.com/',
      gitURL: 'https://www.google.com/',
      gosterilecekSayfa: 'ilk',
      page: "HomeScreen",
      visible: false,
      sekme: [],
      sekmeLink: ['https://www.google.com/'],
      adi: '',
      sifre: '',
      ekontrl: false,
      id: 0,
      gecmisekle: false,
      JsonParse: false,
      isLoading: true,

    }
  }
  _menu = null;
  cgr = false

  componentDidMount() {
    if (this.userıdCgr == false) this.getUserIdd()
    if (this.userıdCgr) {
      this.gesmisServis();
      if (this.state.JsonParse == false) {
        this.yasakServis()
      }
    }

  }


  async getUserIdd() {
    var valueId = await AsyncStorage.getItem('id')
    if (valueId == null || valueId == 0) {
      //hata  
    } else {
      this.setState({ id: valueId })
      this.userıdCgr = true
      this.componentDidMount()
    }
  }



  servisCagir = () => {
    this.cgr = true
    this.componentDidMount();
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
  gesmisServis() {
    return fetch('http://192.168.1.107:80/Aytar/public/api/gecmis/gstore', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usersId: 2,
        arama: this.state.gitURL
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          gecmisServisSonuc: responseJson.sonuc,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };
  reload = () => {
    this.refs[WEBVIEW_REF].reload();
  }
  goback = () => {
    this.refs[WEBVIEW_REF].goBack();
  }
  goforward = () => {
    this.refs[WEBVIEW_REF].goForward();
  }
  onCancel() {
    console.log("CANCEL")
    this.setState({ visible: false });
  }
  onOpen() {
    console.log("OPEN")
    this.setState({ visible: true });
  }
  gecmiss = () => {
    this.props.navigation.navigate('GecmisScreen')
    this._menu.hide();
  }
  anasayfa = () => {
    this.setState({ gitURL: 'https://www.google.com/' })
    this.setState({ url: 'https://www.google.com/' });
    this.setState({ gosterilecekSayfa: 'w' });
  }
  İlkSayfadanGit = (a) => {
    this.setState({ gitURL: a })
    this.setState({ url: a });
    this.setState({ gosterilecekSayfa: 'w' });
  }
  degistir = () => {
    if (this.state.gitURL.substring(0, 8) != "https://") {
      this.setState({ url: "https://www.google.com.tr/search?q=" + this.state.gitURL });
    } else {
      this.setState({ url: this.state.gitURL });
    }
    this.setState({ gosterilecekSayfa: 'w', });
    this.yasakKontrol();

    this.componentDidMount();

  }
  Sekmedegistir(aa) {
    this.setState({
      url: aa,
      gosterilecekSayfa: 'w'
    });
  }
  session(status) {
    AsyncStorage.setItem('isLogin', status);
    AsyncStorage.getItem('isLogin').then(value => this.setState({ isLogin: value }))
    AsyncStorage.setItem('id', "0");
  }
  cikis = () => {
    this.session('false')
    this.props.navigation.navigate('GirisScreen')
  }
  sekmeEkle = () => {
    this.state.sekmeLink.push(this.state.gitURL);
    this.sekmeSayisi++;
    this._menu.hide();
    this.setState({
      gosterilecekSayfa: 'ilk',
      url: '',
      gitURL: ''
    });
  }
  SekmeKapat = () => {
    this.state.sekmeLink[this.sekmeSayisi] = '';
    this.sekmeler();
    this.setState({ gosterilecekSayfa: 's' });
  }
  sekmeler = () => {
    this.hideMenu();
    this.props.navigation.navigate('SekmeScreen')
  }
  loadError() {
    console.log('loaded');
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Text >
          İnternet bağnaltınızı kontrol edin
        </Text>
      </View>
    )
  }
  ebeveyn = () => {
    this.hideMenu();
    this.props.navigation.navigate('EkontScreen')
  }
  hakkimizda = () => {
    this.hideMenu();
    this.props.navigation.navigate('HakkimizdaScreen')
  }
  yasakKontrol = () => {
    for (j = 0; j < this.yasakliLinkler.length; j++) {
      b = this.yasakliLinkler[j].length
      if (this.yasakliLinkler[j] == this.state.gitURL.substr(0, b)) {
        this.setState({ gosterilecekSayfa: 's' });
      }
    }
  }

  goster() {
    if (this.state.gosterilecekSayfa == 'w') {
      return (
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          onLoadStart={(navState) => this.setState({ gitURL: navState.nativeEvent.url })}
          source={{ uri: this.state.url }}
          onLoad={this.yasakKontrol()}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          renderError={this.loadError.bind(this)}

        />
      );
    }
    else if (this.state.gosterilecekSayfa == 's') {
      return (
        <View>
          <WebView
            ref={WEBVIEW_REF}
          />
          <Image style={{ width: '100%', height: '100%' }} source={require('./images/stop.png')} />
          <Text>Yasaklı Site </Text>
        </View>
      );
    }

    else if (this.state.gosterilecekSayfa == 'ilk') return (
      <ScrollView style={{ flex: 1, }}>

        <View style={{ width: '100%', flex: 5, }}>
          <View style={{ margin: 10, width: '90%', height: 150, alignItems: 'center', justifyContent: 'center', }}>
            <Image style={{ width: 150, height: 150 }} resizeMode="contain" source={require('./images/logo.png')} />
            <Text style={{ fontSize: 16 }}>Türkiye'nin ilk yerli tarayıcısı<Text style={{ color: 'red', fontSize: 22 }}> AyTar</Text>'a Hoşgeldiniz.</Text>
          </View>
        </View>
        <View style={{ flex: 7, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', margin: 10, }}>


          <View style={{
            borderWidth: 0, margin: 10, width: 150, height: 50, flexDirection: 'row', justifyContent: 'space-around',
            flexWrap: 'wrap'
          }}>
            <TouchableOpacity onPress={this.anasayfa}><Image style={{ width: 150, height: 50 }} resizeMode="contain" source={require('./images/google.png')} /></TouchableOpacity>
          </View>
          <View style={{
            borderWidth: 0, margin: 10, width: 150, height: 50, flexDirection: 'row', justifyContent: 'space-around',
            flexWrap: 'wrap'
          }}>
            <TouchableOpacity onPress={() => this.İlkSayfadanGit('https://www.facebook.com/')}><Image style={{ width: 150, height: 50 }} resizeMode="contain" source={require('./images/face.png')} /></TouchableOpacity>
          </View>
          <View style={{
            borderWidth: 0, margin: 10, width: 150, height: 50, flexDirection: 'row', justifyContent: 'space-around',
            flexWrap: 'wrap'
          }}>
            <TouchableOpacity onPress={() => this.İlkSayfadanGit('https://twitter.com/')}><Image style={{ width: 150, height: 50 }} resizeMode="contain" source={require('./images/twitter.png')} /></TouchableOpacity>
          </View>
          <View style={{
            borderWidth: 0, margin: 10, width: 150, height: 50, flexDirection: 'row', justifyContent: 'space-around',
            flexWrap: 'wrap'
          }}>
            <TouchableOpacity onPress={() => this.İlkSayfadanGit('https://www.instagram.com/?hl=tr')} ><Image style={{ width: 150, height: 50 }} resizeMode="contain" source={require('./images/instagram.jpg')} /></TouchableOpacity>
          </View>
          <View style={{
            borderWidth: 0, margin: 10, width: 150, height: 50, flexDirection: 'row', justifyContent: 'space-around',
            flexWrap: 'wrap'
          }}>
            <TouchableOpacity onPress={() => this.İlkSayfadanGit('https://github.com/')} ><Image style={{ width: 150, height: 50 }} resizeMode="contain" source={require('./images/github.png')} /></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )

  }
  render() {
    let shareOptions = {
      title: "Paylaş",
      message: "",
      url: this.state.gitURL,
      subject: "Link" //  for email
    };

    let shareImageBase64 = {
      title: "React Native",
      message: "Hola mundo",
      subject: "Share Link" //  for email
    };
    if (this.state.JsonParse == false) {
      return (
        <View>
          <ActivityIndicator size="large" />
          <FlatList
            data={this.state.yasakliSitelerServis}
            renderItem={({ item }) => {
              this.setState({ JsonParse: true });
              this.yasakliLinkler[this.i] = (item.link);
              this.i++
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
    else {
      return (
        <KeyboardAvoidingView style={{ flex: 10, backgroundColor: '#E6E6E6' }} enabled>

          <View style={{ flex: 10, backgroundColor: '#E6E6E6' }}>
            <View style={styles.barr}>
              <StatusBar hidden={true} />
              <TextInput style={styles.adresCubugu}
                returnKeyType="search"
                onChangeText={(gitURL) => this.setState({ gitURL })}
                value={this.state.gitURL}
                underlineColorAndroid='transparent' />

              <TouchableOpacity onPress={this.degistir} style={styles.btn} >
                <Image style={{ width: '60%', height: '60%' }} source={require('./images/gosite.png')} />
              </TouchableOpacity>
              <View style={styles.acilirMenuStyle} >
                <Menu style={{ width: '45%', marginTop: '1%', borderWidth: 1, borderColor: 'grey', borderRadius: 6 }}
                  ref={this.setMenuRef}
                  button={
                    <Text onPress={this.showMenu}>
                      <Image style={{}} source={require('./images/menuu.png')} />
                    </Text>}
                >
                  <ScrollView>
                    <MenuItem onPress={this.sekmeEkle}>Yeni Sekme</MenuItem>
                    <MenuItem onPress={this.ebeveyn}>Ebeveyn Kontrolü</MenuItem>
                    <MenuItem onPress={this.gecmiss}>Geçmiş</MenuItem>
                    <MenuItem onPress={() => { Share.open(shareOptions); }}>Paylaş</MenuItem>
                    <MenuItem onPress={this.hakkimizda}>Hakkımızda</MenuItem>
                    <MenuItem onPress={this.cikis}>Çıkış</MenuItem>
                  </ScrollView>
                </Menu>
              </View>
            </View>
            <View style={{ flex: 9, width: '100%', backgroundColor: '#FFFFFF' }}>

              {this.goster()}
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

              <TouchableOpacity onPress={this.anasayfa} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('./images/home.png')} style={{ width: '50%', height: '70%' }}></Image>
              </TouchableOpacity>

            </View>
          </View>

        </KeyboardAvoidingView>
      );
    }
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
