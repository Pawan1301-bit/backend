// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
import express from 'express'
import path from 'path'
const app = express();

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

//creating userdefine middleware 
// function logingmiddleware(req, res, next){
//     // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     console.log(`This messsage is consoled using middleware`);
//     next(); //pass control to the middleware 
// }

function logingmiddleware(req, res, next) {
    console.log(`This message is consoled using middleware`);
    next();
}
app.use(logingmiddleware);

app.get('/', (req, res)=>{
    res.send("Hello world");
})

const port = 3000;

app.listen(port, ()=>{
    console.log(`The app running at port ${port}`);
})

/*Types of middleware 
1.) Application level middleware -- app.use() app.get() etc
2.) Router level middleware -- express.Router();
3.) Error-handling middleware -- req, res, err, next
4.) Built-In middleware -- express.static('public')
*/