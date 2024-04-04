import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Create from '../pages/Create';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="New" component={Create} />
        </Tab.Navigator>
    )
}

export default MainContainer