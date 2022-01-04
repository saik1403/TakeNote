import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { deleteNote, storeNotes } from '../redux/note/noteActions';
import { logout } from '../redux/users/usersActions';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Notes = (props) => {
  const [userData, setUserData] = useState({});
  //let userData;
  //let currentUser;
  //let notes;
  const [currentUser, setCurrentUser] = useState('');
  const [notes, setNotes] = useState([]);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('notesAndUserData', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => {
          console.log("Log out pressed");
          userData.currentUser.username = '';
          storeData(userData);
          props.logout();
          props.navigation.navigate('Login');
        }} title="Logout" />
      ),
    });
  }, [props.navigation, userData]);
  useEffect(async () => {
    await getData();
    //await getNotes();
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('notesAndUserData');
      const data = jsonValue && JSON.parse(jsonValue);
      console.log("At getting data", data);
      //userData = data;
      setUserData(data);
      let name = data.currentUser.username;
      console.log(name);
      if (!data.notes[name]) {
        console.log(data);
        data.notes[name] = [];
        console.log(data);
        storeData(data);
      }
      console.log(userData);
      setNotes(data.notes[name])
      props.storeNotes(data.notes[name]);
      setCurrentUser(data.currentUser.username);

      //notes = userData.notes[currentUser];
      //getNotes();
    } catch (e) {
      // error reading value
    }
  }
  const deleteNote = (idToRemove) => {
    console.log("id to be deleted", idToRemove, notes);
    const filteredNotes = notes.filter((item) => item.id !== idToRemove);
    userData.notes[currentUser] = filteredNotes;
    console.log(userData);
    storeData(userData);
  }
  const showNotes = () => {
    return (
      <View >
        {props.notes.map((note, index) => {
          return (
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: 'grey', padding: 10, marginVertical: 5,flex:1, elevation: 2,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10}}
              onPress={() => { props.navigation.navigate('ShowNote', note); }}
              key={index}
            >
              <View>
              <Text style={{ marginHorizontal: 4, fontWeight: 'bold', flexDirection: 'column' }} numberOfLines={1} >{note.title}</Text>
              <Text style={{ flexDirection: 'column' }}>{
                note.description.length < 35
                  ? `${note.description}`
                  : `${note.description.substring(0, 32)}...`}</Text>
              </View>
              <View >
                <TouchableOpacity style={{ color: 'red', backgroundColor: 'turquoise', height: 25, width: 60, justifyContent: 'center', borderRadius: 8, alignItems: 'center' }} onPress={() => { deleteNote(note.id); props.deleteNote(note.id); }} >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }
  const logout = () => {
    userData.currentUser.username = "";
    //console.log("userData",userData);
    storeData(userData);
    props.navigation.navigate('Login');
  }
  const addNotes = () => {
    props.navigation.navigate('AddNotes', userData);
  }
  const storeNotesToRedux = (notes) => {
    console.log("called function");
  }
  return (

    <View style={styles.container1}>
      <ScrollView>
        <View style={styles.addNotesView}>
          <TouchableOpacity style={styles.addNotes} onPress={() => {
            addNotes()
          }}>
            <Text>Add Notes</Text>
          </TouchableOpacity>
        </View>
        <View>{currentUser && storeNotesToRedux(notes)}</View>
        <View >
          {currentUser && showNotes()}
        </View>
      </ScrollView>
    </View>


  );
}
const mapStateToProps = state => {
  return {
    id: state.note.id,
    notes:state.note.notes
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteNote: (id) => dispatch(deleteNote(id)),
    storeNotes: (notes) => dispatch(storeNotes(notes)),
    logout: ()=>dispatch(logout())
  }
}
const styles = StyleSheet.create({
  container1: {
    margin: 0,
    padding: 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'khaki'
  },
  addNotesView: {
    alignItems: 'flex-end',
    padding: 10
  },
  addNotes: {
    color: 'red',
    backgroundColor: 'palegreen',
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }


});
export default connect(mapStateToProps, mapDispatchToProps)(Notes);