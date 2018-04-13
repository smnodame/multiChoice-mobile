import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title, Card, CardItem, } from 'native-base'
import { NavigationActions } from 'react-navigation'
import Expo from "expo"
import { fetchDetail } from '../../api'

export class StartForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            date: '',
            description: '',
            name: '',
            question_amount: '',
            slug : '',
            subject: '',
            time: '',
        }
    }

    async componentWillMount() {
       await Expo.Font.loadAsync({
           Roboto: require("native-base/Fonts/Roboto.ttf"),
           Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
           Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
       })
       this.setState({ isReady: true })

       const slug = this.props.navigation.state.params.slug
       fetchDetail(slug).then((res) => {
           this.setState({
               date: res.data.date,
               description: res.data.description,
               name: res.data.name,
               question_amount: res.data.question_amount,
               answer_amount: res.data.answer_amount,
               slug : res.data.slug,
               subject: res.data.subject,
               time: res.data.time,
           })
       })
   }

    onBack = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    redirectToResultPage = () => {
        this.props.navigation.navigate('ResultLists', {
            example_slug: this.props.navigation.state.params.slug
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
                <Button transparent onPress={this.onBack} style={{ width: 40 }}>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>รายละเอียดข้อสอบ</Title>
            </Body>
            <Right>
                <Button transparent onPress={this.redirectToResultPage}>
                    <Icon name='arrow-forward' />
                </Button>
            </Right>
        </Header>
        <Content>
          <Card>
            <CardItem header>
              <Text>{ this.state.name || '' }</Text>
            </CardItem>
            <CardItem>
              <Body>
              <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                  <Text style={{ width: '40%' }} note>
                    วิชา
                  </Text>
                  <Text style={{ width: '50%' }} note>
                    { this.state.subject }
                  </Text>
              </View>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      รายละเอียด
                    </Text>
                    <Text style={{ width: '50%' }} note>
                      { this.state.description }
                    </Text>
                </View>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      เวลาในการทำข้อสอบ
                    </Text>
                    <Text style={{ width: '50%' }} note>
                      { this.state.time }
                    </Text>
                </View>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      จำนวนคำถาม
                    </Text>
                    <Text style={{ width: '50%' }} note>
                      { this.state.question_amount }
                    </Text>
                </View>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      จำนวนตัวเลือก
                    </Text>
                    <Text style={{ width: '50%' }} note>
                      { this.state.answer_amount }
                    </Text>
                </View>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      วันที่สอบ
                    </Text>
                    <Text style={{ width: '50%' }} note>
                      { this.state.date }
                    </Text>
                </View>
              </Body>
            </CardItem>
         </Card>
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
