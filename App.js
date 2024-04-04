import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AuthContainer from './containers/AuthContainer';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';
import MainContainer from './containers/MainContainer';


export default function App() {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <SafeAreaProvider>
        <NavigationContainer>
          {user == null ? <AuthContainer/> : <MainContainer/>}
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1e21',
  },
  input: {
    color: "#FFF",
    fontSize: 24,
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 30
  },
  keeb: {
    flex: 1,
  }
});
