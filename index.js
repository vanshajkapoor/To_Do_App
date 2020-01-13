const expres=require('express');
const port =8000;

const app=expres();
app.set('view engine','ejs');
app.set('views','./views');

app.get('/',function(req,res){
    res.render('home',{
        title: "Home"
    });
});

app.listen(port,function(err){
    if(err){
        console.log("Error in running srver: ",err);
    }

    console.log("Yup! My Server is Running on Port: ",port);
})