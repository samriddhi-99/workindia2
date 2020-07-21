const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();

const dbService=require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/login/:name/:password',(request,response)=>{
    const{name,password}=request.params;
    const db=dbService.getDbServiceInstance();
    const result=db.searchByNamePassword(name,password);
    result
    .then(data=>response.json({data:data}))
    .catch(err=>console.log(err));
});

app.post('/insert',(request,response)=>{
    console.log(request.body);
    // const {name,password,description,title,category}=request.body;
    // console.log(name);
    const db=dbService.getDbServiceInstance();
    const result=db.insertNewName(request.body.name,request.body.password,request.body.description,request.body.title,request.body.category);
    result
    .then(data=>response.json({data:data}))
    .catch(err=>console.log(err.message));
});

app.get('/getAll',(request,response)=>{
    const db=dbService.getDbServiceInstance();
    const result=db.getAllData();
    result
    .then(data=>response.json({data:data}))
    .catch(err=>console.log(err));
});

app.delete('/delete/:id',(request,response)=>{
    const {id}=request.params;
    const db=dbService.getDbServiceInstance();
    const result=db.deleteRowById(id);
    result
    .then(data=>response.json({success:data}))
    .catch(err=>console.log(err.message));
});

app.patch('/update',(request,response)=>{
    const{id,name}=request.body;
    const db=dbService.getDbServiceInstance();
    const result=db.updateNameById(id,name);
    result
    .then(data=>response.json({success:data}))
    .catch(err=>console.log(err.message));
});

app.get('/search/:name',(request,response)=>{
    const{name}=request.params;
    const db=dbService.getDbServiceInstance();
    const result=db.searchByName(name);
    result
    .then(data=>response.json({data:data}))
    .catch(err=>console.log(err));
})

app.listen(process.env.PORT, ()=> console.log('app is running'));