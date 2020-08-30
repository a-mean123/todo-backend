

const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./connect/mongoose');

const {Todo} = require('./models/todo');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.post('/addtodo' , (req, res)=>{

    var t = req.body;
    var todo = new Todo(t);

    todo.save().then(
        ()=>{
            console.log('saved !!');
        },
        (err)=>{
            console.log(err);
        }

    );
    
});



app.get('/getall' , (req , res)=>{

    Todo.find({}).then(
        (alltodo)=>{
            res.send(alltodo);
        },
        (err)=>{
            console.log(err);
        }

    );
    
});



app.get('/getbyid/:id' , (req , res)=>{

    var id = req.params.id;
    Todo.findOne({_id: id}).then(
        (todo)=>{
            res.send(todo);
        },
        ()=>{
            console.log('erreur');
        }
    );

} );


app.delete('/delete/:id' , (req, res)=>{


    var id  = req.params.id;

    Todo.findByIdAndRemove({_id: id}).then(
        ()=>{
            console.log('deleted !!');
        },
        ()=>{
            console.log('erreeur!!');
        }
    );



});


app.put('/update/:id' , (req , res)=>{

    id = req.params.id;
    t = req.body.title;
    d = req.body.description;
    c = req.body.completed;

    Todo.findByIdAndUpdate({_id: id} , 
        {$set : { title: t, description: d, completed:c  }}
        ).then(
            ()=>{
                console.log('updated !!!');
            },
            ()=>{
                console.log('erreeeur!!!');
            }

        );



    console.log('update work');
});





app.listen(3000, ()=>{

    console.log('server work!!!');

});
