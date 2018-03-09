import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import { NavigationActions } from 'react-navigation'

export class BarcodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
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
                        <Title>Scan Barcode</Title>
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  }
}
