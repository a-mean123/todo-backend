


const mongoose = require('mongoose');


var Todo = mongoose.model('Todo' , {

    title: String,
    description: String,
    completed: Boolean


});


module.exports = {Todo};