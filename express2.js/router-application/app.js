import express from 'express';
import user from './routers/user.js';
import product from './routers/product.js';
import order from './routers/orders.js';


const app = express();

app.get('/', (req, res)=>{
    res.send('Welcome to our main page');
})

app.use('/user', user);
app.use('/product', product);
app.use('/order', order);

const port = 3000;
app.listen(port, ()=>{
    console.log(`server running at http//:locathost:${port}`);
})

