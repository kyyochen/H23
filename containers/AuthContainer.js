import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../pages/Register';
import Login from '../pages/Login';

const Stack = createNativeStackNavigator();

const AuthContainer = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
    )
}

export default AuthContainer
