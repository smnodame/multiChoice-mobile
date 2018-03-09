import { StackNavigator } from 'react-navigation'
import { ExampleLists } from './src/screens/exampleLists'
import { ResultLists } from './src/screens/resultLists'
import { StartForm } from './src/screens/startForm'
import { BarcodeScanner } from './src/screens/barcodeScanner'

export default StackNavigator({
    ExampleLists: { screen: ExampleLists },
    ResultLists: { screen: ResultLists },
    StartForm: { screen: StartForm },
    BarcodeScanner: { screen: BarcodeScanner }
},
{
    initialRouteName: "ExampleLists",
    headerMode: "none"
})
