const express = require("express");
const cors = require('cors');
const bodyparser = require("body-parser");
const {MongoClient, ObjectId} = require("mongodb");
const {objectId} = require("mongodb");

const app = express();

//using middleware
app.use(cors());    //used to handle request from one domain to another domain  like we are using 2 domain for backend  and our reactapp
app.use(bodyparser.json());

//connect to mongodb
const url = "mongodb://localhost:27017"
const dbname = "userdata"
let db;

//making the connection 
//function connectToDatabase(url, dbName) {
    MongoClient.connect(url)
      .then(client => {
        console.log("Connected to MongoDB");
        db = client.db(dbname);  // Select the database
        // You can return the db or perform other operations here
      })
      .catch(err => console.error("MongoDB connection failed:", err));
// }
// connectToDatabase(url, dbname);

//post request routes to handle form submission
app.post("/submit-feedback", async (req, res)=>{    //submit-feedback is the endpoint or the router path where client will send data
    try{
        const {name, email, password } = req.body
        const collection = db.collection("user");
        const result = await collection.insertOne({name, email, password});
        res.send(200).json({"message": "your data submitted succesfully", result});
     }catch(err){
        // console.log(`fetching  error ${err}`);
        console.error("Error inserting data into MongoDB:", err);
        res.status(500).json({"message": "server error"});
    }
})

app.get("/api/entries", async(req, res)=>{
    try{
        const collection = db.collection("user");
        const allUser = await collection.find({}).toArray();
        res.status(200);
        res.json(allUser);
    }catch(error){
        console.log(`error fetching data from mongodb ${error}`);
        res.status(500).json({ message: "Server error while fetching data" });
    }
})

app.get("/home", (req,res)=>{
    res.send("Welcome to the home page");
})

//lets work with deleting part 
app.delete("/api/entries/:id", async(req,res)=>{
    try {
        const id = req.params.id;   //req contain info about the incomming http request
        //params - parameter is the routers path -- value capture by url path
        const collection = db.collection("user");
        const result = await collection.deleteOne({_id: new ObjectId(id)});  //delete id is in string formation but inside mongodb the id is a special object so we will convert the string to mongodb object ObjectId
        if(result.deletedCount === 1){
            res.status(200).json({message: "user deleted succesfully"})
        }else{
            res.status(404).json({message: "user not found"});
        }
    } catch (err) {
        console.error("Error deleting data from MongoDB:", err);
        res.status(500).json({ message: "Server error while deleting data" });
    }
})


const port = 3000;
app.listen(port, ()=>{
    console.log(`server running at port localhost:${port}`);
})