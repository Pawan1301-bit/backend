import express from 'express';
import mongoose, { Model } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt, { genSalt, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';

const app = express();

//using middleware
app.use(bodyParser.json());
app.use(cors());

//connecting to mongodb
const url = `mongodb://localhost:27017/userdata`
// const dbname = 'userdata';
// let db;

mongoose.connect(url)
    .then((client) => {
        // db = client.db(dbname);
        console.log(`connected to mongoose`);
    }).catch(error => console.log(`error connecting to mongodb`))


//define a schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
})

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email id',  // Your email address
        pass: 'app pass key'  // Your Gmail password or app-specific password
    }
});


// Helper function to send email
const sendLoginNotification = (userEmail) => {
    const mailOptions = {
        from: 'email id',
        to: userEmail,
        subject: 'Login Alert',
        text: 'You have successfully logged into your account.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


//we have to hashpassword before saving
userSchema.pre('save', async function (next) {    //this set up a function that run automatically before the user document is saved
    if (!this.isModified('password')) return next();

    try {
        //salt is a string added to password for security and 10 is the complexity of our password hash
        const salt = await genSalt(10);
        //we will change the plain text into the hash text
        this.password = await hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }

})


const CollectionModel = mongoose.model('User2', userSchema); //based on the arg2 schema this will store the element in arg1 collection
//this will create a collectiton users following this schema

//writing api's 
//to send data
app.post('/submit', async (req, res) => {
    try {
        const { name, password, email } = req.body
        const newUser = new CollectionModel({ name, password, email });
        // await newUser.save();
        await newUser.save();

        //login user immediatly after signup
        const token = jwt.sign(
            { id: newUser._id, name: newUser.name },
            'jwt key',
            { expiresIn: '1h' }
        );
        sendLoginNotification(newUser.email);
        res.status(200).json({ message: "data saved succesfully" })
    } catch (error) {
        res.status(500).json({ message: "error sending data" });
    }
})

//for login form
app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await CollectionModel.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "invalid credentials" });
        }

        //otherwise i will create a token to login for 1 hr
        const token = jwt.sign(
            { id: user._id, name: user.name },
            '22021857',
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: "login successfull" });
    } catch (err) {
        res.status(500).json({ message: "error finding user " })
    }
})

app.get('/getapi', async (req, res) => {
    try {
        const users = await CollectionModel.find().select('-password'); // this will find all the data of in users2 collection

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "failed to fetch data", err });
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const result = await CollectionModel.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: "user deleted successfully" });
        } else {
            res.status(404).json({ message: "data not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error Deleting the data", error });
    }
})

const port = 3000;

app.listen(port, () => {
    console.log(`app running on port ${port}`);
})