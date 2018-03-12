import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { BarCodeScanner, Permissions,  } from 'expo'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import { NavigationActions } from 'react-navigation'

export class BarcodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    round: 0
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermission: status === 'granted'})
    }

    onBack = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

  render() {
    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={this.onBack}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                    <Body>
                        <Title>แสกน Barcode นักเรียน</Title>
                    </Body>
                    <Right />
            </Header>
            <View style={{ flex: 1 }}>
                <BarCodeScanner
                    onBarCodeRead={this._handleBarCodeRead}
                    style={StyleSheet.absoluteFill}
                />
            </View>
        </Container>
      )
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    if(this.state.round == 0) {
        console.log(type)
        console.log(data)
        const student = JSON.parse(data)

        Alert.alert(
            student.slug,
            student.name,
            [
                {text: 'ยกเลิก', onPress: () => {
                    this.props.navigation.dispatch(NavigationActions.back())
                }},
                {text: 'ลองใหม่', onPress: () => {
                    this.setState({
                        round: 0
                    })
                }},
                {text: 'ตกลง', onPress: () => {
                    this.props.navigation.navigate('CameraScanner', {
                        user_slug: student.slug,
                        example_slug: this.props.navigation.state.params.example_slug,
                        reloadResultLists: this.props.navigation.state.params.reloadResultLists,
                        resetRound: () => {
                            this.setState({
                                round: 0
                            })
                        }
                    })
                }},
            ],
            { cancelable: false }
        )
    }
    this.setState({
        round: 1
    })
  }
}
