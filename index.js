const express = require("express");
const app = express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const authRoute=require("./api/routes/auth");
const userRoute=require("./api/routes/users");
const postRoute=require("./api/routes/posts");
const categoryRoute=require("./api/routes/categories");
const multer=require("multer");


dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,
useUnifiedTopology:true,
useCreateIndex:true,
}).then(console.log("connected to MongoDB")).catch((err)=>console.log(err));

const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
       // cb(null,pp.jpg);
    },
});
const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
});
app.get("/",(req,res)=>{
    console.log("Server is running");
    res.send("started");
})


app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",categoryRoute)
console.log("hello world");

var port = process.env.PORT || 3000;



app.listen(port, () => {
    console.log("Backend is running");
});
