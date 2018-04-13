import React from 'react'
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Keyboard,
  AsyncStorage
} from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import Drawer from 'react-native-drawer'
import { NavigationActions } from 'react-navigation'

import { fetchExampleLists } from '../../api'
import Expo from "expo"
const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

export class ExampleLists extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            example: []
        }

        fetchExampleLists().then((res) => {
            this.setState({
                example: res.data
            })
        })
    }

    onLogout = async () => {
        AsyncStorage.removeItem('active')
        		.then(() => {
        			const resetAction = NavigationActions.reset({
        					index: 0,
        					actions: [
        						NavigationActions.navigate({ routeName: 'Login'})
        					]
        				})
        				this.props.navigation.dispatch(resetAction)
        		})
	}

    openControlPanel = () => {
        this._drawer.open()
    }

    redirectToStartForm = (slug) => {
        this.props.navigation.navigate('StartForm', {
            slug: slug
        })
    }

    onOpenBarcodeScanner = () => {
        this.props.navigation.navigate('BarcodeScanner')
    }

    renderExampleLists = () => {
        return this.state.example.map((example) => {
            return (
                <ListItem key={example.slug} onPress={() => this.redirectToStartForm(example.slug)}>
                    <Body>
                        <Text>{ example.name }</Text>
                        <Text note>{ example.subject }</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
            )
        })
    }

    reload = () => {
        fetchExampleLists().then((res) => {
            this.setState({
                example: res.data
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
        <Drawer
    	        ref={(ref) => this._drawer = ref}
    	        type="overlay"
    	        tapToClose={true}
    	        openDrawerOffset={0.2} // 20% gap on the right side of drawer
    	        panCloseMask={0.2}
    	        closedDrawerOffset={-3}
    	        styles={drawerStyles}
    	        tweenHandler={(ratio) => ({
    	            main: { opacity:(2-ratio)/2}
    	        })}
    	        content=
    	        {
    	            <Container>
    					<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
    						<View  style={styles.drawerCover}>
    							{
                                    <Image square style={styles.drawerImage} source={  require('./logo.png') } />
                                }
    						</View>
    						<List>
    							<ListItem button noBorder onPress={this.onLogout}>
    								<Left>
    									<Icon active name='log-out' style={{ color: "#777", fontSize: 26, width: 30 }} />
    									<Text style={styles.text}>
    										ออกจากระบบ
    									</Text>
    								</Left>
    							</ListItem>
    						</ List>
    					</Content>
    				</Container>
    	        }
	    >
        <Container>
        {
             Platform.OS != 'ios'&&<View style={styles.statusBar} />
        }
            <Header>
                <Left>
                    <Button transparent onPress={this.openControlPanel}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>ข้อสอบทั้งหมด</Title>
                </Body>
                <Right>
                    <Button transparent onPress={this.reload}>
                        <Icon name='ios-refresh' />
                    </Button>
                </Right>
            </Header>
            <Content style={{ backgroundColor: 'white' }}>
            <List>
                {
                    this.renderExampleLists()
                }
            </List>
            </Content>
      </Container>
      </Drawer>
      :
      <Container />
    )
  }
}


const drawerStyles = {
     drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 1},
     main: {paddingLeft: 1},
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  statusBar: {
        backgroundColor: "#000",
        height: Expo.Constants.statusBarHeight,
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  drawerCover: {
		alignSelf: "stretch",
		// resizeMode: 'cover',
		height: deviceHeight / 3.5,
		width: null,
		position: "relative",
		marginBottom: 10,
		backgroundColor: '#004B85',
        flex: 1, alignItems: 'center', justifyContent: 'center'
	},
	drawerImage: {
		width: 200,
		height: 70,
		resizeMode: "contain"
	}
});
