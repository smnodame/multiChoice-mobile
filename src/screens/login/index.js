import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import { NavigationActions } from 'react-navigation'
import Expo from "expo"
const { width, height } = Dimensions.get("window");

const background = require("./login1_bg.png");
const mark = require("./login1_mark.png");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

import { login } from '../../api'

export class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            error: ''
        }
    }

    login = () => {
        this.setState({
            error: ''
        })
        if(!this.state.username || !this.state.password) {
            this.setState({
                error: 'กรุณากรอก username เเละ password'
            })
            return
        }

        login(this.state.username, this.state.password).then((res) => {
			AsyncStorage.setItem('active', 'true').then(() => {
				const resetAction = NavigationActions.reset({
						index: 0,
						actions: [
							NavigationActions.navigate({ routeName: 'ExampleLists'})
						]
					})
				this.props.navigation.dispatch(resetAction)
			})
        }, (err) => {
            this.setState({
                error: 'username หรือ password ไม่ถูกต้อง'
            })
        })
    }

    async componentWillMount() {
       await Expo.Font.loadAsync({
           Roboto: require("native-base/Fonts/Roboto.ttf"),
           Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
           Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
       })
       this.setState({ isReady: true })
   }

    render() {
    return (
        this.state.isReady?
      <View style={styles.container}>
      {
          Platform.OS != 'ios'&&<View style={styles.statusBar} />
      }
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#FFF"
                style={styles.input}
                onChangeText={(username) => this.setState({username})}
				value={this.state.username}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholderTextColor="#FFF"
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
				value={this.state.password}
              />
            </View>
            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={{ textAlign: 'center', color: 'white' }}>{ this.state.error }</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={this.login}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap} />
          </View>
        </ImageBackground>
      </View>
      :
      <Container />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
        backgroundColor: "#000",
        height: Expo.Constants.statusBarHeight,
    },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});
