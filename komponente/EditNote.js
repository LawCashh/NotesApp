import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import React from "react";
import { ScrollView, Text, KeyboardAvoidingView, Keyboard, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {styles} from './AddNote';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const EditNote = ({route, navigation, ...props}) => {
    const {i, n} = route.params;
    const [newEdit, setNewEdit]= useState(n.content);

    function updateNote() {
        axios.post("http://10.20.10.82:3000/create", {content: newEdit})
        .then(res => {
            console.log("uspjesno");
            console.log(newEdit);
            props.loadNotes();
            navigation.navigate('Biljeske');
        })
        .catch(err => {
            console.log("greska :( " + err);
        });
    }

    function editNote() {


        /*let edited = [...props.notes];
        edited[i] = newEdit;
        props.setNotes(edited);*/

        axios.delete(`http://10.20.10.82:3000/delete/${n._id}`)
        .then(res => {
            console.log("uspio pola edita");
            updateNote();
        })
        .catch(err => {
            console.log(err);
        });

        /*AsyncStorage.setItem('storedNotes', JSON.stringify(edited)).then(() => {
            props.setNotes(edited);
            console.log(edited);
        }).catch(error => console.log(error))*/
    }

    return (
        <ScrollView>
                    <View style={{padding: 20, flexDirection: 'column', alignItems: 'center'}}>
                        <TextInput style={css.editforma} value={newEdit.toString()} onChangeText={(text) => setNewEdit(text)}/>
                        <TouchableOpacity style={css.editdugme} onPress={() => editNote()}>
                            <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>Izmjeni</Text>
                        </TouchableOpacity>
                    </View>
        </ScrollView>
    )
}

export const css = StyleSheet.create({
    editforma: {
        paddingTop: 20,
        padding: 20,
        width: '100%',
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
        backgroundColor: 'white',
        borderColor: 'orange',
        borderWidth: 5,
        borderRadius: 5,
        height: 300
    },
    editdugme: {
        backgroundColor: 'orange',
        width:'50%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 20
    },
})

export default EditNote;