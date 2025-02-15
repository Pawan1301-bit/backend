import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.get('/', (req, res)=>{
    //res.send will send the file with text, html , buffer, json content it itself detect them
    // res.send("<h1>Hello World</h1>");

    //send a json response
    // res.json({message:"sucess", status: 200});

    //set httpstatus code and send a response
    // res.status(404).send("file not found");

    //set httpstatus code and send json response
    // res.status(500).json({ error: "Internal Server Error" });

    //to send file to client
    // res.sendFile(path.join(__dirname, 'index.html'));
    
    //to redirect the page
    // res.redirect('https://google.com');

    // Renders a view template (like EJS, Pug).
    // res.render('index', { title: "Home Page" });

    //to end a response without ending data
    res.end();
})

const port = 3000;
 app.listen(port, ()=>{
    console.log(`The app is running at localhost:${port}`);
 })