// import exp from 'constants';
import express from 'express'

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Welcome to user page');
})
router.get('/list/', (req, res)=>{
    res.send('List of all user');
}).get('/:id', (req, res)=>{
    res.send(`Detail of the user with the id ${req.params.id}`);
}).post('', (req, res)=>{
    res.send('create a new user');
})

export default router