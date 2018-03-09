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

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

export class ExampleLists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
    		isReady: false,
    		error: "",
    		loading: false,
    		username: "",
    		password: ""
        }
    }

    onLogin = async () => {

	}

    openControlPanel = () => {
        this._drawer.open()
    }

    redirectToStartForm = () => {
        this.props.navigation.navigate('StartForm')
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
    										Log Out
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
                    <Title>Example Lists</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name="barcode" />
                    </Button>
                </Right>
            </Header>
            <Content style={{ backgroundColor: 'white' }}>
            <List>
                <ListItem onPress={this.redirectToStartForm}>
                    <Body>
                        <Text>ตรรกศาสตร์ 1</Text>
                        <Text note>คณิตศาสตร์</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem onPress={this.redirectToStartForm}>
                    <Body>
                        <Text>ตรรกศาสตร์ 2</Text>
                        <Text note>คณิตศาสตร์</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem onPress={this.redirectToStartForm}>
                    <Body>
                        <Text>GAT 1 ทดสอบ</Text>
                        <Text note>GAT</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
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
