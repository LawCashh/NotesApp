import Note from './schema.js';

const uri = "mongodb+srv://cajo:cajo123@notesappcluster.nk75wyo.mongodb.net/?retryWrites=true&w=majority";
const baza = 'NotesBaza';
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
/*const express = require("express");
const mongoose = require("mongoose");*/

const backend = express();

// create application/json parser
var jsonParser = bodyParser.json()
 
backend.use(jsonParser)

// listen on port 3000
backend.listen(3000, () => {
 console.log("Server is listening on port 3000");
});

mongoose
 .connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 })
 .then(() => {
   console.log("Connected to MongoDB");
 })
 .catch((err) => console.log(err));

// this is a javascript file
backend.post("/create", async (req, res) => {
    console.log(req.body.content);
    const content = req.body.content;
    const note = new Note({
      content: req.body.content,
    });
    try {
      await note.save();
      res.status(201).json({
        message: "note created",
        note,
      });
    } catch (error) {
      console.log(error);
    }
   });

backend.get("/uzmi", async (req, res) => {
    try {
        let data = await Note.find({});
        console.log(data);
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
      }
});

backend.delete("/delete/:id", async (req, res) => {
    try{
        console.log(req.params);
        await Note.deleteOne({_id: req.params.id});
        res.status(200).json();
    }
    catch (err) {
        console.log(err);
    }
});


backend.get("/search/:s", async (req, res) => {
  try {
      let data = await Note.find({content: { $regex: '.*' + req.params.s + '.*' } });
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
});

/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cajo:cajo123@notesappcluster.nk75wyo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const baza = 'NotesBaza';

async function otvaranjeBaze() {
    let result = await client.connect();
    db = result.db(baza);
    collection = db.collection('notes');
}

async function printData(){
    let data = await collection.find({}).toArray();
    console.log(data);
}

otvaranjeBaze().catch(console.error);*/
