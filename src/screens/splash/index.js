import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import { NavigationActions } from 'react-navigation'

const { width, height } = Dimensions.get("window");

const background = require("../login/login1_bg.png");
const mark = require("../login/login1_mark.png");
const lockIcon = require("../login/login1_lock.png");
const personIcon = require("../login/login1_person.png");


export class Splash extends React.Component {

    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        const active = await AsyncStorage.getItem('active')
		if(active) {
            setTimeout(() => {
                const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'ExampleLists'})
                        ]
                    })
                this.props.navigation.dispatch(resetAction)
            }, 1500)
		} else {
            setTimeout(() => {
                const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Login'})
                        ]
                    })
                this.props.navigation.dispatch(resetAction)
            }, 1500)
		}
    }



    render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
    width: 150
  },
  mark: {
    width: 150,
    height: 150
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
