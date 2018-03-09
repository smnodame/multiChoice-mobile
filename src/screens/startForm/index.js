import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title, Card, CardItem, } from 'native-base'
import { NavigationActions } from 'react-navigation'

export class StartForm extends React.Component {

    constructor(props) {
        super(props)
    }

    onBack = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    redirectToResultPage = () => {
        this.props.navigation.navigate('ResultLists')
    }

  render() {
    return (
        <Container>
        <Header>
            <Left>
                <Button transparent onPress={this.onBack} style={{ width: 40 }}>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>Detail</Title>
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
              <Text>ตรรกศาสตร์ 1</Text>
            </CardItem>
            <CardItem>
              <Body>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      รายละเอียด
                    </Text>
                    <Text note>
                      80 percent
                    </Text>
                </View>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      เวลาในการทำข้อสอบ
                    </Text>
                    <Text note>
                      60 นาที
                    </Text>
                </View>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      จำนวนคำถาม
                    </Text>
                    <Text note>
                      10 ข้อ
                    </Text>
                </View>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      จำนวนคำถาม
                    </Text>
                    <Text note>
                      10 ข้อ
                    </Text>
                </View>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      วิชา
                    </Text>
                    <Text note>
                      คณิตศาสตร์
                    </Text>
                </View>
                <View style={{ flex:1, flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={{ width: '40%' }} note>
                      วันที่สอบ
                    </Text>
                    <Text note>
                      03/02/2018
                    </Text>
                </View>
              </Body>
            </CardItem>
         </Card>
        </Content>
      </Container>
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
  	textInput: {
  		height: 50,
  		borderRadius: 3,
  		paddingHorizontal: 19,
  		paddingLeft: 5, paddingRight: 10
  	}
})
