import React from 'react'
import { StyleSheet, View, Alert, Platform } from 'react-native'
import { BarCodeScanner, Permissions,  } from 'expo'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import { NavigationActions } from 'react-navigation'
import Expo from "expo"

export class BarcodeScanner extends React.Component {
    round = 0

    state = {
        hasCameraPermission: null,
        round: 0,
        showBarcodeScanner: true
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        })
        this.setState({ isReady: true })

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
                        <Title>แสกน Barcode นักเรียน</Title>
                    </Body>
                    <Right />
            </Header>
            <View style={{ flex: 1 }}>
                {
                    this.state.showBarcodeScanner && <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={StyleSheet.absoluteFill}
                    />
                }
            </View>
        </Container>
        :
         <Container />
      )
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    if(this.round == 0) {
        const student = JSON.parse(data)

        Alert.alert(
            student.slug,
            student.name,
            [
                {text: 'ยกเลิก', onPress: () => {
                    this.props.navigation.dispatch(NavigationActions.back())
                }},
                {text: 'ลองใหม่', onPress: () => {
                    this.round = 0
                }},
                {text: 'ตกลง', onPress: () => {
                    this.setState({
                        showBarcodeScanner: false
                    }, () => {
                        this.props.navigation.navigate('CameraScanner', {
                            user_slug: student.slug,
                            example_slug: this.props.navigation.state.params.example_slug,
                            reloadResultLists: this.props.navigation.state.params.reloadResultLists,
                            resetRound: () => {
                                this.round = 0

                                this.setState({
                                    showBarcodeScanner: true
                                })
                            }
                        })
                    })

                }},
            ],
            { cancelable: false }
        )
    }
    this.round = 1
  }
}

const styles = StyleSheet.create({
    statusBar: {
          backgroundColor: "#000",
          height: Expo.Constants.statusBarHeight,
      }
})
