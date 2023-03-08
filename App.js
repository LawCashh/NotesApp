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

export default function App() {
  const [note, setNote] = useState();
  const [notes, setNotes] = useState([]);

  function handleNote() {
    let newNote = note;
    let newNotes = [newNote, ...notes];
    setNotes(newNotes);
    setNote('');

    AsyncStorage.setItem('storedNotes', JSON.stringify(newNotes)).then(() => {
      setNotes(newNotes)
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    AsyncStorage.getItem('storedNotes').then(data => {
      if(data !== null) {
        setNotes(JSON.parse(data));
      }
    }).catch((error) => console.log(error));
  }

  return (
    <NavigationContainer> 
      <Stack.Navigator>

        <Stack.Screen name='Biljeske'>
          {props => <Notes  {...props} notes={notes} setNotes={setNotes} note={note} setNote={setNote}/>}
        </Stack.Screen>

        <Stack.Screen name="Dodaj">
          {props => <AddNote {...props} note={note} setNote={setNote} handleNote={handleNote}/>}
        </Stack.Screen>

        <Stack.Screen name="Izmjeni">
          {props => <EditNote {...props} notes={notes} setNotes={setNotes}/>}
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
