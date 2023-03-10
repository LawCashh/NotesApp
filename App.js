import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState,useEffect} from 'react';
import Notes from './komponente/Notes';
import AddNote from './komponente/AddNote';
import EditNote from './komponente/EditNote';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
import axios from 'axios';


export default function App() {
  const [note, setNote] = useState();
  const [notes, setNotes] = useState([]);

  function handleNote() {
    let newNote = note;
    /*let newNotes = [newNote, ...notes];
    setNotes(newNotes);
    setNote('');*/
    let data = {content: newNote};
    console.log(data);
    axios.post("http://10.20.10.82:3000/create", data)
    .then(res => {
      console.log("uspjesno");
      console.log(res.data);
      loadNotes();
    })
    .catch(err => {
      console.log("greska :( " + err);
    });

    /*AsyncStorage.setItem('storedNotes', JSON.stringify(newNotes)).then(() => {
      setNotes(newNotes);
      console.log(newNotes);
      console.log(JSON.stringify(newNotes));
    }).catch(error => console.log(error));*/

  }

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    axios.get("http://10.20.10.82:3000/uzmi")
    .then(res => {
      console.log("uspjesan get");
      /*let temp = res.data.map(e => {
        return e.content;
      });
      console.log(temp);
      setNotes(temp);*/
      setNotes(res.data);
    })
    .catch(err => {
      console.log("greskica " + err);
    });
    /*AsyncStorage.getItem('storedNotes').then(data => {
      if(data !== null) {
        setNotes(JSON.parse(data));
      }
    }).catch((error) => console.log(error));*/

  }

  return (
    <NavigationContainer> 
      <Stack.Navigator>

        <Stack.Screen name='Biljeske'>
          {props => <Notes  {...props} notes={notes} setNotes={setNotes} note={note} setNote={setNote} loadNotes={loadNotes}/>}
        </Stack.Screen>

        <Stack.Screen name="Dodaj">
          {props => <AddNote {...props} note={note} setNote={setNote} handleNote={handleNote}/>}
        </Stack.Screen>

        <Stack.Screen name="Izmjeni">
          {props => <EditNote {...props} notes={notes} setNotes={setNotes} loadNotes={loadNotes}/>}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
