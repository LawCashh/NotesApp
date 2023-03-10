import React from 'react';
import { View, Text,StyleSheet, TouchableOpacity, TextInput, ScrollView, Keyboard, Alert } from 'react-native';
import { ApplicationProvider, IconRegistry, Layout, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Notes = ({navigation, ...props}) => {

    const [searchNote, setSearchNote] = useState();

    function deleteNote(index,id) {
        
        axios.delete(`http://10.20.10.82:3000/delete/${id}`)
        .then(res => {
            console.log("uspio delete ");
            props.loadNotes();
        })
        .catch(err => {
            console.log(err);
        });

        /*let newArray = [...props.notes];
        newArray.splice(index, 1);
        props.setNotes(newArray);*/

        /*AsyncStorage.setItem('storedNotes', JSON.stringify(newArray)).then(() => {
            props.setNotes(newArray)
          }).catch(error => console.log(error))*/
    }

    function search(){
        if(searchNote === ''){
            Alert.alert('Ne moze biti prazno');
        } else if (searchNote !== '') {
            props.notes.forEach((item,index) => {
                if(item.includes(searchNote)) {
                    let searchItem = [...props.notes];
                    let firstElOfArray = searchItem[0];
                    let index = [...props.notes].indexOf(item);
                    searchItem[0] = item;
                    searchItem[index] = firstElOfArray;
                    props.setNotes(searchItem);
                }
            })
        }
        setSearchNote('');
        Keyboard.dismiss();
    }

    return (
        <View style={css.body}>
            <View style={css.header}>
                <Text style={css.naslov}>Moje biljeske</Text>
                <View style={{flexDirection: 'row'}}> 
                    <TouchableOpacity style={css.naslov_dugme} onPress={() => navigation.navigate('Dodaj')}>
                    <IconRegistry icons={EvaIconsPack}/>
                    <ApplicationProvider {...eva} theme={eva.light}>
                        <Icon name="plus-outline" fill="black" style={{width: 25, height: 50}}/>
                    </ApplicationProvider>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={css.searchform}>
                <TextInput placeholder='Pretrazi' style={css.input} value={searchNote} onChangeText={(text)=> setSearchNote(text)}/>
                <TouchableOpacity style={css.search_dugme} onPress={() => search()}>
                    <IconRegistry icons={EvaIconsPack}/>
                    <ApplicationProvider {...eva} theme={eva.light}>
                        <Icon name ="search" fill="black" style={{width: 25, height: 50}}/>
                    </ApplicationProvider>
                </TouchableOpacity>
            </View>
            <ScrollView style={css.notemptybody}>
                {props.notes.length === 0 ? 
                    <View style={css.emptybody}>
                        <Text>Jos nema biljeski, klikni plus za dodavanje</Text>
                    </View> : 
                    props.notes.reverse().map((item, index) => 
                        <View style={css.note} key={index}>
                            <View style={css.notenaslov}>
                                <Text style={css.notenaslov_text}>{/*item*/item.content}</Text>
                            </View>
                            <TouchableOpacity onPress={()=> deleteNote(index,item._id)}>
                                <Text style={css.minibutton}>Obrisi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Izmjeni', {
                                i: index, n: item
                            })}>
                                <Text style={css.minibutton}>Izmjeni</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </ScrollView>
        </View>
    )
}


export const css = StyleSheet.create({
    body:{
        marginTop:10,
        paddingHorizontal:20,
        marginBottom:70,
    },

    header: {
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 120,
    },

    naslov:{
        fontSize:35,
        fontWeight:'700',
        color: 'orange',
        marginBottom: 10,
    },
        
    naslov_dugme: {
        backgroundColor: 'orange',
        width:'50%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },

    searchform:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        marginBottom: 10
    },

    input:{
        height: 40,
        width: '65%',
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
        backgroundColor: 'white',
        borderColor: 'orange',
        paddingLeft: 10,
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 10
    },

    search_dugme:{
        backgroundColor: 'orange',
        width:'50%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },

    emptybody:{
        alignItems: 'center',
        marginTop: 100
    },

    note:{
        marginBottom: 20,
        marginTop: 10,
        padding: 20,
        backgroundColor: 'white',
        borderColor: 'orange',
        borderWidth: 5,
        borderRadius: 10,
        flexDirection: 'row',
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    notenaslov: {
        width: '55%',
        fontWeight: '600',
    },

    notenaslov_text: {
        fontWeight: '600',
        fontSize: 20
    },

    minibutton: {
        color: 'black',
        backgroundColor: 'orange',
        padding: 5  
    },

})

export default Notes;