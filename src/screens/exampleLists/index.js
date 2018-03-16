import React from 'react'
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Keyboard
} from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import Drawer from 'react-native-drawer'

import { fetchExampleLists } from '../../api'

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

export class ExampleLists extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            example: []
        }

        fetchExampleLists().then((res) => {
            this.setState({
                example: res.data
            })
        })
    }

    onLogin = async () => {

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

  render() {
    return (
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
                                    // <Image square style={styles.drawerImage} source={  require('./src/assets/logo.png') } />
                                }
    						</View>
    						<List>
    							<ListItem button noBorder>
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
		backgroundColor: '#004B85'
	},
	drawerImage: {
		position: "absolute",
		// left: (Platform.OS === 'android') ? 30 : 40,
		left: Platform.OS === "android" ? deviceWidth / 15 : deviceWidth / 12,
		// top: (Platform.OS === 'android') ? 45 : 55,
		top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
		width: 250,
		height: 75,
		resizeMode: "cover"
	}
});
