const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task_name :{
        type : String,
        required : true
    },
    category :{
        type : String,
        required: true
    },
    date:{
        type : Date,
        required : true
    }
});

const tasks = mongoose.model('tasks',taskSchema);
module.exports = tasks;