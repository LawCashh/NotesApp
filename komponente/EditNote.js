import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import React from "react";
import { ScrollView, Text, KeyboardAvoidingView, Keyboard, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {styles} from './AddNote';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditNote = ({route, navigation, ...props}) => {
    const {i, n} = route.params;
    const [newEdit, setNewEdit]= useState(n);

    function editNote() {
        let edited = [...props.notes];
        edited[i] = newEdit;
        props.setNotes(edited);

        navigation.navigate('Biljeske');

        AsyncStorage.setItem('storedNotes', JSON.stringify(edited)).then(() => {
            setNotes(edited)
        }).catch(error => console.log(error))
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