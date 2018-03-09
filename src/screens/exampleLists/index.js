import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'


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

    redirectToStartForm = () => {
        this.props.navigation.navigate('StartForm')
    }

  render() {
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent>
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
