//middleware is a function that sits between request from the user and respond from the server
//it modify the request

const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000

// app.use(expre)ss.static("public");
//a build in middleware which will modilfy the request if the particular file present in public folder before sending it to the server for req

//middleware must be declare before the reqest function
//we can create a our own middleware
const myLogger = function (req, res, next) {
    console.log(req.headers)
    req.harry = "I am harry";
    fs.appendFileSync("logs.txt", `${Date.now()} is a ${req.method}\n`) //adding in the file using middleware
    console.log(`${Date.now()} is a ${req.method} `);
    next()  //to pass control to the next middleware function in tthe stack   -- otherwise it will stuck here
}
  
app.use(myLogger)
//without using next() the request will stuck in  the current middleware and won't proceed to the next step

//middleware 2
app.use((req, res, next)=>{
  console.log('m2')
  next()
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/about', (req, res) => {
  res.send('Hello World! ' + req.harry)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



//concept 
/*Types of middleware
1.) Application level middleware -- which we have used -- created and used for our application level
2.) Router level middleware -- a middleware which is created for a specific router like we have used for blogs
3.) Error handline middleware -- used to handle errors in our application (err, req, res, next)
4.) Buildin middleware -- this middleware is already defined in our express pakage  ex - express.static(""); 
5.) Third Party middleware -- this middleware is define by someone else which we are using in our application  ex - cookie-parser


Applications of middleware -- logging, passward and authentication, compress , serving static files
 */