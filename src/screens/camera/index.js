import React from 'react'
import { View, TouchableOpacity, Dimensions, Alert, Platform, StyleSheet } from 'react-native'
import { Camera, Permissions } from 'expo'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import { sendPhoto } from '../../api'
import Expo from "expo"

const width = Dimensions.get("window").width

export class CameraScanner extends React.Component {
    state = {
        isReady: false,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    })
    this.setState({ isReady: true })

    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  snap = async () => {
      if (this.camera) {
            let photo = await this.camera.takePictureAsync({ base64: true })
            var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
            var uniqid = randLetter + Date.now()
            const resSendPhoto = await sendPhoto(uniqid, this.props.navigation.state.params.example_slug, {
                uri: photo.uri,
                base64: photo.base64,
                platform: Platform.OS === 'ios' ? 'ios' : 'android'
            })
            console.log(resSendPhoto)
            if(_.get(resSendPhoto, 'status', false)) {
                Alert.alert(
                    'เกิดข้อผิดพลาด',
                    'อาจมีการ snapshot รูปไม่ถูกต้อง',
                    [
                        {text: 'ยกเลิก', onPress: () => {
                            this.props.navigation.state.params.reloadResultLists()
                            this.props.navigation.dispatch(NavigationActions.back())
                        }},
                        {text: 'ลองใหม่', onPress: () => {

                        }},
                    ],
                    { cancelable: false }
                )
            } else {
                Alert.alert(
                    `${resSendPhoto.user_id} ${resSendPhoto.name}`,
                    `ผลลัพธ์ ${resSendPhoto.point} คะแนน`,
                    [
                        {text: 'ลองใหม่', onPress: () => {

                        }},
                        {text: 'คนต่อไป', onPress: () => {
                        }},
                        {text: 'ผลลัพธ์รวม', onPress: () => {
                            this.props.navigation.state.params.reloadResultLists()
                            this.props.navigation.dispatch(NavigationActions.back())
                        }},
                    ],
                    { cancelable: false }
                )

            }
      }
  }


  onBack = () => {
      this.props.navigation.dispatch(NavigationActions.back())
  }


  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
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
                      <Title>ถ่ายรูปข้อสอบ</Title>
                  </Body>
                  <Right />
          </Header>
            <View style={{ flex: 1 }}>
              <Camera ref={ref => { this.camera = ref; }} style={{ width: width, height: width }} type={this.state.type} ratio={'1:1'}>

              </Camera>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity  style={{ backgroundColor: '#ff6666', width: 100, height: 100, borderRadius: 60, justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.snap() }}>
                        <Text style={{ color: 'white' }}>snapshot</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
        :
        <Container />
      )
    }
  }
}

const styles = StyleSheet.create({
    statusBar: {
          backgroundColor: "#000",
          height: Expo.Constants.statusBarHeight,
      }
})
