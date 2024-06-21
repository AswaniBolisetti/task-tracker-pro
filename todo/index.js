const express = require('express');
const fs = require('fs');
const path = require('path');
const port = 4036;

const db = require('./config/mongoose');
const tasks = require('./models/tasks');

const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true})); 

// app.get('/',function(req,res){
//     res.render('home');
// })

app.get('/', function(req, res) {
    tasks.find({})
        .then(tasks => {
            res.render('home', {
                total_tasks: tasks,
                deleted_tasks : deletedtasks
            });
        })
        .catch(err => {
            console.error("Error in fetching the tasks from db:", err);
            // Handle the error appropriately, such as sending an error response to the client
            res.status(500).send("Error in fetching tasks from the database");
        });
});
// app.get('/DarkHome', function(req, res) {
//     // Render the DarkHome page
//     res.render('darkhome');
// });


app.post('/add_task', function(req, res) {
    tasks.create({
        task_name: req.body.task,
        category: req.body.category,
        date : req.body.date
    })
    .then(newTask => {
        console.log("New task created:", newTask);
        return res.redirect('/');
    })
    .catch(err => {
        console.error("Error in creating a task:", err);
        // Handle the error appropriately, such as sending an error response to the client
        res.status(500).send("Error in creating a task");
    });
});

let deletedtasks = [];

app.get('/remove_task', function(req, res) {
    let id = req.query.id;
    tasks.findByIdAndDelete(id)
        .then(deletedtask => {
            if (!deletedtask) {
                console.log("task not found or already deleted.");
                return res.redirect('/');
            }
            console.log("task deleted:", deletedtask);
            deletedtasks.push(deletedtask);
            return res.redirect('/');
        })
        .catch(err => {
            console.error("Error in deleting a task from db:", err);
            // Handle the error appropriately, such as sending an error response to the client
            res.status(500).send("Error in deleting a task from the database");
        });
});

app.post('/delete_history', function(req, res) {
  deletedtasks = [];
  return res.redirect('/');
});
// app.post('/mode', function(req, res) {
    
//     return res.redirect('/DarkHome');
//   });


app.listen(port,function(err){
    if(err){
        console.log('Error',err);
        return;
    }
    else{
        console.log("Express Server started running on ",port);
    }
})