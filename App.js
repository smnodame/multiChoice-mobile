import { StackNavigator } from 'react-navigation'
import { ExampleLists } from './src/screens/exampleLists'
import { ResultLists } from './src/screens/resultLists'
import { StartForm } from './src/screens/startForm'
import { BarcodeScanner } from './src/screens/barcodeScanner'
import { CameraScanner } from './src/screens/camera'
import { Login } from './src/screens/login'
import { Splash } from './src/screens/splash'

export default StackNavigator({
    ExampleLists: { screen: ExampleLists },
    ResultLists: { screen: ResultLists },
    StartForm: { screen: StartForm },
    BarcodeScanner: { screen: BarcodeScanner },
    CameraScanner: { screen: CameraScanner },
    Login: { screen: Login },
    Splash: { screen: Splash }
},
{
    initialRouteName: "Splash",
    headerMode: "none"
})
