const express=require('express');
const port =8000;
var mongoose = require('mongoose');
const moment = require('moment');

//database configure
const db =require('./config/mongoose');
//model
const Task = require('./model/Task');


// var ObjectId=require('mongoose').ObjectId;


const app=express();


//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');
//middleware
app.use(express.urlencoded());
//setting up assets
app.use(express.static('assets'));

//i am setting up this format for my date and making it available for all ejs pages to access it ... i will be passing my moment in context
var shortDateFormat = "MMMM Do[,] YYYY";
app.locals.shortDateFormat = shortDateFormat;

//rendering home
app.get('/',function(req,res){
    

    Task.find({},function(err,tasks){
        
        if(err){
            console.log("Error in fetching tasks from db");
            return;
        }
        // tasks=tasks.map(function(doc){
        //     doc.duedate=moment(doc.duedate).format("DD.MM. h:mm");
        // })
        
        res.render('home',{
            title:"To Do App",
            task_list:tasks,
            moment:moment

        })
    })
});



//creating new task from form input given by user
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

// deleting the task

app.post('/delete-task/',function(req,res){
    
    //if nothing is selected
    if(typeof(req.body.Listitem)===undefined){
        req.redirect('back');
    }

    //if one task card selected

    if(typeof(req.body.Listitem)==='string'){
        let id=req.body.Listitem;
        Task.findByIdAndDelete(id,function(err){
            if(err){
                console.log("error in deleting list item",err);
                return;
            }
        });

    }
    //if multiple task acrds selected
    if(typeof(req.body.Listitem)==='object'){
        for(i of req.body.Listitem){
            let id=i;
            Task.findByIdAndDelete(id,function(err){
                if(err){
                    console.log("error in deleting multiple tasks from object",err);
                    return;
                }
            });
        }
    }
    return res.redirect('back');
})




app.listen(port,function(err){
    if(err){
        console.log("Error in running server: ",err);
    }

    console.log("Yup! My Server is Running on Port: ",port);
})