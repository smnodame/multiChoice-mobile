import React from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import { Camera, Permissions } from 'expo'
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Body, Icon, Right, Left, Button, Title } from 'native-base'
import { NavigationActions } from 'react-navigation'

const width = Dimensions.get("window").width

export class CameraScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  snap = async () => {
      if (this.camera) {
          let photo = await this.camera.takePictureAsync()
          
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
      <Container>
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
      )
    }
  }
}
