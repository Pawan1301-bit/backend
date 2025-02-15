import e from "express";
const router = e.Router();  //a builtin middleware function  that used to define router

router.get('/', (req, res)=>{
    res.send(`Welcome to the page`);
})

router.get('/about', (req, res)=>{
    res.send(`This is our about page`);
})

export default router;
//export the router to use in different file