const mysql=require('mysql');
const dotenv=require('dotenv');
let instance=null;
dotenv.config();
const connection = mysql.createConnection({
    host     : 'sql12.freemysqlhosting.net',
    user     : 'sql12356223',
    password : '7fjt9XNMHU',
    database : 'sql12356223'
 });

 connection.connect((err)=>{
     if(err){
         console.log(err.message);
     }
     console.log('db '+connection.state);
 })

 class DbService{
     static getDbServiceInstance(){
         return instance? null: new DbService();
     }
 

    async getAllData(){
        try{
            const response=await new Promise((resolve,reject)=>{
                const query="SELECT * FROM names;";
                connection.query(query,(err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            // console.log(response);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }

    async insertNewName(name,password,description,title,category){
        try{
            console.log(password);
            const dateAdded=new Date();
            const insertId=await new Promise((resolve,reject)=>{
                const query="INSERT INTO names(name,date_added,password,title,description,category) VALUES (?,?,?,?,?);";
                connection.query(query,[name,dateAdded,password,title,description,category],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });

            // console.log(insertId);
            return {
                id:insertId,
                name:name,
                dateAdded:dateAdded,
                password:password,
                title: title,
                description: description,
                category: category
            };
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteRowById(id){
        try{
            id=parseInt(id,10);
            const response=await new Promise((resolve,reject)=>{
                const query="DELETE FROM names WHERE id = ?";
                connection.query(query,[id],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            // console.log(response);
            return response===1?true:false;
        }
        catch(error){
            console.log(err.message);
            return false;
        }
    }
    async updateNameById(id,name){
        try{
            id=parseInt(id,10);
            const response=await new Promise((resolve,reject)=>{
                const query="UPDATE names SET name= ? WHERE id= ?";
                connection.query(query,[name,id],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            // console.log(response);
            return response===1?true:false;
        }
        catch(error){
            console.log(err.message);
            return false;
        }
    }

    async searchByName(name){
        try{
            const response=await new Promise((resolve,reject)=>{
                const query="SELECT * FROM names WHERE name =?;";
                connection.query(query,[name],(err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            // console.log(response);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }

    async searchByNamePassword(name,password){
        try{
            const response=await new Promise((resolve,reject)=>{
                const query="SELECT * FROM names WHERE name =? and password = ?;";
                connection.query(query,[name],[password],(err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            // console.log(response);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
}

 module.exports=DbService;