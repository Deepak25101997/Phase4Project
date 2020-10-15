const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// const User = {
//     name: "Deepak",
//     email: "demo@demo.com",
//     phone: "1478523695",
//     username: "test",
//     password: "test"
// }

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

//setting up parsers
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// for handling CORS errors
app.use(cors())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connected to the database !");
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Hello from back"
    });
})


//  routes imported
require('./routes/events')(app);
require('./routes/auth')(app);


app.listen(3001, (err) => {
    if (err) console.log("Server not able to start !")
    console.log("Backend server running on port 3001 !");
})