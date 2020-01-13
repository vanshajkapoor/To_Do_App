const express=require('express');
const port =8000;

const db =require('./config/mongoose');
const Task = require('./model/Task');

const app=express();
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());

app.get('/',function(req,res){
    

    Task.find({},function(err,tasks){
        if(err){
            console.log("Error in fetching tasks from db");
            return;
        }
        res.render('home',{
            title:"To Do App",
            task_list:tasks

        })
    })
});

app.post('/create-task/',function(req,res){
    // console.log(req.body);
    // res.redirect('back');
    Task.create({
        description: req.body.desc,
        category: req.body.category,
        duedate:req.body.duedate


    },function(err,newTask){
        if(err){
            console.log('error in creating a new task',err);
            return;
        }

        console.log('*****',newTask);
        return res.redirect('back');
    })

});

app.listen(port,function(err){
    if(err){
        console.log("Error in running server: ",err);
    }

    console.log("Yup! My Server is Running on Port: ",port);
})