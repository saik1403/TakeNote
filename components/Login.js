import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { login, storeUsers } from '../redux/users/usersActions';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import CreateAccount from './CreateAccount';
const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [userData, setUserData] = useState(props.route?.params?props.route.params:{});
  const [error, setError] = useState('');
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('notesAndUserData', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  // const navigateOnCondition = () => {
  //   let condition = checkCredentials();
  //   console.log(condition);
  //   if (condition) {
  //     navigation.navigate('Notes');
  //   }
  // }
  useEffect(() => {
    getData();
  },[]);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('notesAndUserData');
      const data = jsonValue && JSON.parse(jsonValue);
      console.log(data);
      setUserData(data);
      props.storeUsers(data.users);
      if(data.currentUser.username!==""){
        props.navigation.navigate('Notes');
      }
      console.log(userData);
      return data;
    } catch (e) {
      // error reading value
    }
  }

  const checkCredentials = () => {
    if (!userName || userName === '') {
      setError('Please Enter user name');
      return
    }
    if (!Password || Password === '') {
      setError('Please enter Password');
      return
    }
    console.log(userName, Password);
    console.log(userData);
    let users = userData?.users;
    if (!users) {
      users = [];
    }
    if (userData) {
      let isExist = false;
      for (let i = 0; i < userData.users.length; i++) {
        if (userData.users[i].username == userName) {
          isExist = true;
          if (Password == userData.users[i].password) {
            console.log("in true");
            userData.currentUser.username = userName;
            props.login(userName);
            storeData(userData);
            setUserName('');
            setPassword('');
            setError('');
            props.navigation.navigate('Notes');
          }
          else {
            setError('Wrong Password');
            return
          }
        }
      }
      if (!isExist) {
        console.log("Need to creat account");
        setError(`User Doesn't Exist`);
        return
      }

    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.logintext}> Take Note </Text>
      <View style={styles.login}>
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
          style={styles.loginbutton}
          onPress={() => {
            checkCredentials();
          }}
        >
          <Text style={{color:'white',fontWeight:'bold'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signup} onPress={() => { props.navigation.navigate('CreateAccount',userData) }}>
          <Text style={{fontWeight:'bold',textDecorationLine:'underline'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}
const mapDispatchToProps = dispatch =>{
  return {
    storeUsers:(users)=>{dispatch(storeUsers(users))},
    login:(userName)=>{dispatch(login(userName))}
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
  logintext: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    padding: 20,
    fontSize: 30,
  },
  login: {
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
  loginbutton: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "yellowgreen",
    padding: 10
  },
  signup: {
    fontWeight: 'bold',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignContent: 'flex-end',
    color: 'white',
    alignItems: 'flex-end',
  },
  lables: {
    padding: 15,
    fontWeight:600,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error:{
    fontWeight:'bold',
    color:'red'
  }
});
export default connect(null,mapDispatchToProps)(Login);