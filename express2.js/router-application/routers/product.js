
import express from 'express'

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Welcome to Product page');
})
router.get('/list/', (req, res)=>{
    res.send('List of all Products');
}).get('/:id', (req, res)=>{
    res.send(`Detail of the Product with the id ${req.params.id}`);
}).post('', (req, res)=>{
    res.send('Adding a new product');
})

export default router