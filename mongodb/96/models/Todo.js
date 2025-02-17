//creating the schema for our data base 

import mongoose from "mongoose";

  //if we write  name: a interger it will convert it to string or if we send the string place of number we get error
const TodoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    isDone: Boolean,
    days: Number
});

export const Todo = mongoose.model('Todo', TodoSchema);