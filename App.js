import { StackNavigator } from 'react-navigation'
import { ExampleLists } from './src/screens/exampleLists'
import { ResultLists } from './src/screens/resultLists'
import { StartForm } from './src/screens/startForm'

export default StackNavigator({
    ExampleLists: { screen: ExampleLists },
    ResultLists: { screen: ResultLists },
    StartForm: { screen: StartForm }
},
{
    initialRouteName: "ExampleLists",
    headerMode: "none"
})
