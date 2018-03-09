import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import { NavigationActions } from 'react-navigation'

export class ResultLists extends React.Component {

    constructor(props) {
        super(props)
    }

    onBack = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    onOpenBarcodeScanner = () => {
        this.props.navigation.navigate('BarcodeScanner')
    }

  render() {
    return (
        <Container>
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
                <ListItem>
                    <Body>
                        <Text>ปกิต สุรินี</Text>
                    </Body>
                    <Right>
                        <Text note>25 คะแนน</Text>
                    </Right>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>ราชวิน รัตกุล</Text>
                    </Body>
                    <Right>
                        <Text note>100 คะแนน</Text>
                    </Right>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>ปวิภา ทองกุล</Text>
                    </Body>
                    <Right>
                        <Text note>10 คะแนน</Text>
                    </Right>
                </ListItem>
            </List>
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
