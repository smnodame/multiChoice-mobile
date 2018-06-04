import React from 'react'
import { StyleSheet, View, BackHandler, Platform } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import { NavigationActions } from 'react-navigation'
import Expo from "expo"
import { getPoint } from '../../api'

export class ResultLists extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isReady: false,
            students: []
        }
    }

    onBack = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    onOpenBarcodeScanner = () => {
        this.props.navigation.navigate('CameraScanner', {
            example_slug: this.props.navigation.state.params.example_slug,
            reloadResultLists: () => {
                this.reloadResultLists()
            }
        })
    }

    reloadResultLists = () => {
        const example_slug = this.props.navigation.state.params.example_slug
        getPoint(example_slug).then((res) => {
            this.setState({
                students: res.data || []
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

        this.reloadResultLists()
    }

    renderItems = () => {
        return this.state.students.map((student, index) => {
            return (
                <ListItem key={index}>
                    <Body>
                        <Text>{ student.student.firstname + ' ' + student.student.lastname }</Text>
                    </Body>
                    <Right>
                        <Text note>{ student.point } คะแนน</Text>
                    </Right>
                </ListItem>
            )
        })
    }

  render() {
    return (
        this.state.isReady?
        <Container>
            {
                 Platform.OS != 'ios'&&<View style={styles.statusBar} />
            }
            <Header>
                <Left>
                    <Button transparent onPress={this.onBack}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>สรุปคะแนนนักเรียน</Title>
                </Body>
                <Right>
                    <Button transparent onPress={this.onOpenBarcodeScanner}>
                        <Icon name="barcode" />
                    </Button>
                </Right>
            </Header>
            <Content style={{ backgroundColor: 'white' }}>
            <List>
                {
                    this.renderItems()
                }
            </List>
            </Content>
      </Container>
      :
      <Container />
    )
  }
}


const styles = StyleSheet.create({
    container: {
  		flex: 1,
  		backgroundColor: '#3b5998',
  		alignItems: 'center',
  		justifyContent: 'center',
  	},
    statusBar: {
          backgroundColor: "#000",
          height: Expo.Constants.statusBarHeight,
      },
  	textInput: {
  		height: 50,
  		borderRadius: 3,
  		paddingHorizontal: 19,
  		paddingLeft: 5, paddingRight: 10
  	}
})
