import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import React from 'react';
import {Alert, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TextInput, TouchableOpacity } from 'react-native';
const AddNote = ({navigation, ...props}) =>{

    return (
        <ScrollView>
                    <View style={{padding: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <TextInput style={css.editforma} placeholder='Zapocni' multiline={true} value={props.note} onChangeText={(text)=> props.setNote(text)}/>
                        <TouchableOpacity style={css.dodaj_dugme} onPress={()=> {
                            if(props.note === ''){
                                Alert.alert("Ne moze biti prazno");
                            }else {
                                props.handleNote();
                                navigation.navigate('Biljeske');
                            }
                        }}>
                            <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
                                Dodaj
                            </Text>
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
    dodaj_dugme: {
        backgroundColor: 'orange',
        width:'50%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 20
    },
})
export default AddNote;