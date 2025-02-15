/*router are used to divide our program into small components -- they allow to group related routers togethar make the code more clean and maintainable 
we can use them to group related routers and use them at different parts of our code*/

import express from 'express';
import myRouter from './router/myRouter.js';    //importing the router
const app = express();

app.use('/', myRouter);

const port= 3000;
app.listen(port, ()=>{
    console.log(`the servers started at ${port}`);
})