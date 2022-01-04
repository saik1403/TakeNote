import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addNotes } from '../redux/note/noteActions';
import { v4 as uuidv4 } from 'uuid';
const AddNotes = (props)=>{
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [userData, setUserData] = useState(props.route.params);
    const [error,setError]=useState('');
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
      // },[]);
    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('notesAndUserData');
          const data = jsonValue && JSON.parse(jsonValue);
          console.log(data);
          setUserData(data);
          console.log(userData);
          return data;
        } catch (e) {
          // error reading value
        }
      }
      const saveNotes=()=>{
        if (!title || title === '') {
            setError('Please Enter Title');
            return
          }
          if (!description || description === '') {
            setError('Please enter Description');
            return
          }
          const note={
              id:uuidv4(),
              title: title,
              description: description
          };
        console.log("at save Notes",userData.currentUser.username,note);
        const username=userData.currentUser.username;
        userData.notes[username].push(note);
        storeData(userData);
        props.addNotes(note);
        setTitle('');
        setDescription('');
        props.navigation.navigate('Notes');
    }
    return (
        <View style={styles.container}>
      <Text style={styles.addtext}> Add Notes </Text>
      <View style={styles.addnote}>
        <Text style={styles.lables}>Title</Text>
        <TextInput
          style={styles.inputbox}
          onChangeText={setTitle}
          value ={title}
          placeholder="Enter Title"
        />
        <Text style={styles.lables}>Description</Text>
        <TextInput
          style={styles.inputbox1}
          multiline={true}
          onChangeText={setDescription}
          value ={description}
          placeholder="Enter Description"
        />
        <Text> {error} </Text>
        <TouchableOpacity
          style={styles.savebutton}
          onPress={() => {
            saveNotes();
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
      );
}
const mapDispatchToProps = dispatch => {
  return {
    addNotes: (note) => dispatch(addNotes(note)),
  }
}
const styles = StyleSheet.create({
    container: {
      margin: 0,
      padding: 0,
      flex:1,
      flexDirection:'column',
      backgroundColor: 'aquamarine',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial',
    },
    addtext: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'Black',
      padding: 3,
      fontSize: 30,
    },
    addnote: {
      justifyContent: 'center',
      height: 470,
      width: 320,
      overflow: 'hidden',
      marginTop: 3,
      padding: 5,
      backgroundColor: 'mintcream',
      borderRadius: 15,
    },
    inputbox: {
      flexDirection: 'row',
      height: 40,
      padding: 10,
      borderRadius: 7,
      marginHorizontal: 10,
      border: 3,
      borderColor: 'white'
    },
    inputbox1: {
        flexDirection: 'row',
        height: 200,
        padding: 10,
        borderRadius: 5,
        marginTop:'Top',
        marginHorizontal: 10,
        border: 3,
        borderColor: 'white'
      },
    savebutton: {
      marginTop:'auto',
      alignItems: "center",
      backgroundColor: "yellowgreen",
      padding: 10
    },
    lables: {
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
export default connect(null,mapDispatchToProps)(AddNotes);