const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
  res.send('Blog home page')
})
//we have used router instead of app -- so we can send access them using other file

// define the about route
router.get('/about', (req, res) => {
    res.send('About blog')
})
// define the about route
router.get('/blogpost/:slug', (req, res) => {
  res.send(`fetch the blogpost for ${req.params.slug}`)
})

module.exports = router


/* routers -- are the object that allow  you to group of routes that allow you to do a specific part of your application
they are used to set application of a specific endpoints */