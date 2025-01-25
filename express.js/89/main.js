// const exp = require('constants');
const express = require('express')
const blog = require('./routes/blog')   //this  will handle all the /blog endpoints

const app = express()
const port = 3000

app.use(express.static("public"));  //here we are using middleware

app.use('/blog', blog)  //base path of the router define in the routers

app.get('/', (req, res) => {
    console.log("\nget request");
    res.send('Hello World')
})

app.post('/', (req, res) => {
    console.log("\npost request");
    res.send('Hello World post')
}).put('/', (req, res) => {     //can also chain them
    console.log("\nput request");
    res.send('Hello World put')
})

app.get("/index", (req, res) => {
    console.log("hey its index");
    res.sendFile('templates/index.html', { root: __dirname });   //we have to give absolute path not relative 
});

//some other methords to try
/*res.downloads()
res.end()
res.json()
res.jsonp()
res.redirect()
res.render()
res.send()
res.sendFile()
res.sendStatus()
*/

app.get("/api", (req, res) => {
    res.json({ a: 1, b: 2, c: 3, d: 4, name: ["Pawan", "Harry", "billu"] });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})