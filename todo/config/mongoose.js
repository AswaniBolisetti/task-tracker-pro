//require the library
const mongoose = require('mongoose')
//connect to the db
mongoose.connect('mongodb://localhost/todo_db')
//acquire the connection(to check if it is successfull)
const db = mongoose.connection;
//error
db.on('error',console.error.bind(console,'error connecting to db'))
//up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to the db')
})
module.exports = db;
