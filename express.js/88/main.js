//express is a frame work that is used for node (backend)
const express = require('express')  //importing express using commonjs after installing it in 
const app = express()  // define a app -- it is an instance of express -- it handle the http request and add middleware function
const port = 3000    

//serving static files
app.use(express.static('public'));  //public is the folder name 
// app.use is used of middleware and express.static is a build in middleware that will make the file public
//we cannot see the harry.txt -- becoz backend code should not be visible
//after using static we can see the content on the web the public folder is not longer private now we can use to display in web

//app.get, post, put, delete
app.get('/', (req, res) => {    //arg -- path , handler
  res.send('Hello World!')
})

app.get('/about', (req, res) => {  
    res.send('About us')
})
  
app.get('/contact', (req, res) => {  
      res.send('contact info')
})
    
app.get('/blog', (req, res) => {  
    res.send('daily blogs')
    console.log(req.params);
})

//creating secoundary url
app.get('/blog/:slug', (req, res) => {  
    console.log(req.params);    //all the parameters--slug = intro of express 
    console.log(req.query);     //shows the queries--mode = dark
    res.send(`blog on ${req.params.slug}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//for queries we use ?mode=dark


//notes
/* request -- is the way of communicaton between client and server
  Types of request 
  get request -- retrive a data from server -- like feteching a webpage or image
  post request -- send the data to the server to create new resorce -- submission form
  put request -- update or create resorce on server
  delete request -- delelte a specific resorce from the server 
*/