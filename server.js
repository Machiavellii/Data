const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const users = require('./routes/api/users');

const app = express();



//Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DataBase Config
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connection'))
    .catch(err => console.log(err));


//Use Routes
app.use('/api/users', users);

//Server Static Assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set Static folder
    app.use(express.static('client'));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running ${port}`));
