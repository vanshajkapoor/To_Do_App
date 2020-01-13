const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/to_do_db',{useUnifiedTopology: true,useNewUrlParser:true});

const db=mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('succesfully connected to db');
});