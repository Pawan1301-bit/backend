const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
//in order to use ejs template engine  

app.get('/', (req, res) => {
  let siteName = 'Adidas'
  let searchText = 'Search Now';
  let arr = [1, 54, 65];
  //taking this content inside the index.html
  res.render('index' , {siteName: siteName, searchText: 
    searchText, arr})
    //variable ki values ko render/ put karana in our templates
    //we can directly access them
})

app.get('/blog/:slug', (req, res) => {
    let blogTitle = 'Adidas when and why'
    let blogContent = 'Its a very good brand';
    res.render('templates/blogpost.html' , {blogTitle: blogTitle, blogContent: blogContent})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//we have used a javascript variable from server to our template using ejs