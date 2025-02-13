const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000


//adding middleware 
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

//creating api
const data = {
    message : 'creating our api',
    items: [{Name : 'Pawan', Id: 1},
            {Name : 'Kunal', Id: 2},
            {Name : 'Sidhant', Id: 3}
    ]
};

//using post -- allowing  user to add data 
//Use express.json() middleware to parse incoming JSON data.
//Create a POST endpoint to handle incoming data.
//Update the data object (or database) with the new data.


app.get('/', (req, res) => {
    res.send("Building our api's");
  })

app.get('/api', (req, res) => {
  res.json(data);
})


//adding new data
app.post('/api', (req, res)=>{
    const newItem = req.body;   //got the new item from the request body 

    if (!newItem.Name || !newItem.Id) {
        return res.status(400).json({ message: 'Name and Id are required' });
    }
    data.items.push(newItem);
    res.status(201).json({message: 'new item added succesfully'});
})

app.put('/api/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateItem = req.body;
  const index = data.items.findIndex(item=>item.Id === id);
  if(index !== -1){
    data.items[index] = { ...data.items[index], ...updateItem };
    res.json(data.items[index]);
  }else{
    res.status(404).json({error: "Item not found"});
  }
 });

 app.delete('/api/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const index = data.items.findIndex(item=>item.Id === id);
    if(index != -1){
       data.items.splice(index, 1);
       res.json({message : "item deleted successfully"});
    }else{
      res.status(404).json({ error: 'Item not found' });
    }
 })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


/* cors(cross origin resorce sharing ) CORS is a security mechanism implemented by browsers to prevent web pages from making requests to a different domain (or origin) than the one that served the web page. In your case --  */