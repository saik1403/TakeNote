import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from './components/CreateAccount';
import Notes from './components/Notes';
import AddNotes from './components/AddNotes';
import Logout from './components/Logout';
import ShowNote from './components/ShowNote';
import { Provider } from 'react-redux';
import store from './redux/store';
export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();
  // const isLogged=()=>{
  //   return "CreateAccount";
  // }
  // useEffect(() => {
  //   getData();
  // },[]);
  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('notesAndUserData');
  //     const data = jsonValue && JSON.parse(jsonValue);
  //     if(data.currentUser.username!==""){
  //       navigation.navigate('Notes');
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // }
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="App" component={App} />
        <Stack.Screen name="Notes" component={Notes}  options={({ navigation, route }) => ({
            headerTitle:"Notes",
          })} />
          <Stack.Screen name="AddNotes" component={AddNotes} />
          <Stack.Screen name="Logout" component={Logout} />
          <Stack.Screen name="ShowNote" component={ShowNote} options={({ navigation, route }) => ({
            headerTitle:"ShowNotes",
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
