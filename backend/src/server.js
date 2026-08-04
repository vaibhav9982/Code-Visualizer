import express from "express";

const app = express();
const port = 5000;

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"server is running"
    })
})

app.listen(port,()=>{
    console.log(`server is listening on port:${port}`);
})
