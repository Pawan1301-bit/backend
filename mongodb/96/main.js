// hw -- explore https://www.npmjs.com/pakage/mongodb
// mongoos -- a package that provide staright forward, schema based solution to model application data and interact with a Mongodb database

import mongoose, { mongo } from "mongoose";
import express from "express";
import { Todo } from "./models/Todo.js";

let conn = await mongoose.connect('mongodb://localhost:27017/todo');
// mogodb do not follow any schema whiile mongoos can do  that we want

// const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const todo = new Todo({ title: "Hey first todo", desc: "Description to the todo", isDone: false , days: Math.floor(54*Math.random() + 45  * Math.random())});
  todo.save();
  res.send('Hello World!')
})

app.get('/a', async(req, res) => {
  let todo = await Todo.findOne({})
  res.json({status: todo.isDone, desc: todo.desc})=
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})