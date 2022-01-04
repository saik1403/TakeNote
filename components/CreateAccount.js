import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import notesAnduserData from './notesAndUserData';
import { connect } from 'react-redux';
import { addUser } from '../redux/users/usersActions';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
const CreateAccount = (props) => {
  const [userName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [userData, setUserData] = useState(props.route.params);
  const [error, setError] = useState('');
  console.log("userData at sigup",props.route.params);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('notesAndUserData', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  // useEffect(() => {
  //   getData();
  // }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('notesAndUserData');
      const data = jsonValue && JSON.parse(jsonValue);
      console.log(data);
      setUserData(data);
      return data;
    } catch (e) {
      // error reading value
    }
  }
  const addUser = async() => {
    let isExist = false;
    if (!userName || userName === '') {
      setError('Please Enter user name');
      return
    }
    if (userName.length < 3) {
      setError("Enter Valid userName length greater than 3");
      return 
    }
    if (!Password || Password === '') {
      setError('Please enter Password');
      return
    }
    if (Password.length < 3) {
      setError("Enter a valid password length greater than 3");
      return
    }
    for (let i = 0; i < userData.users.length; i++) {
      if (userData.users[i].username == userName) {
        isExist = true;
        setError("User Name exits try another");
        return
      }
    }
    if (!isExist) {
      userData.users.push({ username: userName, password: Password });
      props.addUser({ username: userName, password: Password })
    }
    console.log(userData);
    storeData(userData);
    setUserName('');
    setPassword('');
    setError('');
    await getData();
    props.navigation.navigate("Login",userData);
  }
  const showData = () => {
    console.log(userData.users);
    //userData.users.push({username:"demo",password:"demo"});
    for (let i = 0; i < userData.users.length; i++) {
      console.log(userData.users[i].username);
    }
    console.log(userData);
  }
  return (
    <View style={styles.container}>
      <Text styles={styles.signuptext}>Creat Account</Text>
      <View style={styles.signups}>
        <Text style={styles.lables}>User Name</Text>
        <TextInput
          style={styles.inputbox}
          onChangeText={setUserName}
          value ={userName}
          placeholder="Enter Username"
        />
        <Text style={styles.lables}>Password</Text>
        <TextInput
          style={styles.inputbox}
          secureTextEntry={true}
          onChangeText={setPassword}
          value ={Password}
          placeholder="Enter password"
        />
        <Text style={styles.error}> {error} </Text>
        <TouchableOpacity
          style={styles.signupbutton}
          onPress={() => {
            addUser();
          }}
        >
          <Text style={{color:'white',fontWeight:'bold'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>

  );
}
const mapDispatchToProps = dispatch =>{
  return {
    addUser : (user)=>{dispatch(addUser(user))}
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    flex: 1,
    backgroundColor: 'bisque',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial',
  },
  container1: {
    margin: 0,
    padding: 0,
    backgroundColor: '#fff',
    fontFamily: 'Arial',
  },
  signuptext: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    padding: 20,
    fontSize: 30
  },
  signups: {
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    marginTop: 10,
    padding: 5,
    backgroundColor: 'mintcream',
    borderRadius: 15,
  },
  inputbox: {
    flexDirection: 'row',
    height: 40,
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 15,
    border: 3,
    borderColor: 'white'
  },
  signupbutton: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "yellowgreen",
    padding: 10
  },
  signup: {
    marginTop: 10,
    justifyContent: 'flex-start',
    alignContent: 'flex-end',
    color: 'white'
  },
  lables: {
    padding: 15,
    fontWeight: 600,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error:{
    fontWeight:'bold',
    color:'red'
  }
});
export default connect(null,mapDispatchToProps)(CreateAccount);