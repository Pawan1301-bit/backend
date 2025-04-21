import express from 'express';
import mongoose, { Model } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

//using middleware
app.use(bodyParser.json());
app.use(cors());

//connecting to mongodb
const url = `mongodb://localhost:27017/userdata`
// const dbname = 'userdata';
// let db;

mongoose.connect(url)
    .then((client) => {
        // db = client.db(dbname);
        console.log(`connected to mongoose`);
    }).catch(error => console.log(`error connecting to mongodb`))


//define a schema and model
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true}
})

const CollectionModel = mongoose.model('User2', userSchema); //based on the arg2 schema this will store the element in arg1 collection
//this will create a collectiton users following this schema

//writing api's 
//to send data
app.post('/submit', async (req, res) => {
    try {
        const { name, password } = req.body
        const newUser = new CollectionModel({name, password}); 
        await newUser.save();
        res.status(200).json({message: "data saved succesfully"})
    } catch (error) {
        res.status(500).json({ message: "error sending data" });
    }
})

app.get('/getapi', async(req, res)=>{
    try{
        const users = await CollectionModel.find(); // this will find all the data of in users2 collection
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: "failed to fetch data", err});
    }
})

app.delete('/delete/:id', async(req, res)=>{
    try {
        const result = await CollectionModel.findByIdAndDelete(req.params.id);
        if(result){
            res.status(200).json({message: "user deleted successfully"});
        }else{
            res.status(404).json({message: "data not found"})
        }
    } catch (error) {
        res.status(500).json({message: "Error Deleting the data", error});
    }
})

const port = 3000;

app.listen(port, () => {
    console.log(`app running on port ${port}`);
})