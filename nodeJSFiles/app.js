const http=require('http')
const fs =require('fs')
var cors = require('cors');
const express=require('express'),
port = process.env.port || 3001,
app = express()
// const account=require('./accountModel')
app.use(cors());
const data=require('./accountHolder.json');
// const { parse } = require('path');

app.get('/', function(req, res) { res.json(data)})
app.delete('/delete/:id',(req,res)=>{
    console.log(req.params.id);
    const body=[]
    data.data=data.data.filter(n=>n.id != req.params.id)
    fs.writeFileSync('./accountHolder.json',JSON.stringify(data),()=>{
        res.status().send(200);
    })
    res.json("true")
})
app.post('/new',(req,res)=>{
    const body=[]
        req.on('data',(chunk)=>{
            body.push(chunk)
            const parsedBody=Buffer.concat(body).toString()
            data.data.push(JSON.parse(parsedBody))
            fs.writeFileSync('./accountHolder.json',JSON.stringify(data),()=>{
                res.status().send(200);
            })
        })
    res.send("true")
})
app.post('/edit',(req,res)=>{
    const body=[]
    req.on('data',(chunk)=>{
        body.push(chunk)
        const parsedBody=Buffer.concat(body).toString()
        let m=JSON.parse(parsedBody)
        for(let i=0;i<data.data.length;i++){
            if(data.data[i].id===m.id){
                data.data[i]=m
                return
            }
        }
        fs.writeFileSync('./accountHolder.json',JSON.stringify(data),()=>{})
    })
    res.send("true")
})


app.listen(port, () => console.log(`Server start at ${port}`))
