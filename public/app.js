const express=require("express")
var mongoose=require("mongoose")
var body_p=require("body-parser")
const app=express()
const port=3500
// var urlencode=body.urlencoded({extends:false})

app.use(body_p.json())
app.use(express.static('public'))
app.use(body_p.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/flicuser',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db=mongoose.connection;

db.on('error',()=>console.log("error while connecting to db"));
db.once("open",()=>console.log("connection successful"));

app.post('/sign_up',(req,res)=>{
    var email=req.body.email;
    var password=req.body.psw;

    var data={
        "email":email,
        "password":password
    }
    db.collection('userdata').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }else{
            console.log("record inserted Successfully");
        }
    });
    return res.redirect('login.html')
})
app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect("index.html")
});
app.listen(port,()=>console.log("server started"))