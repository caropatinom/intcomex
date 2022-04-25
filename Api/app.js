const express = require('express');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mysql
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'intcomex'
  });
  

  app.post('/login', (req, res) => {
    const user = 
     { id: 1,
       nombre: "caro" }
    jwt.sign({user:user}, 'secretkey',{expiresIn: '60s'},(error,token)=>{
      res.json({
        token
      });
    });     
   });

   function verifyToken(req,res,next){
      const bearerHeader = req.headers['authorization'];
      if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1]; 
        req.token= bearerToken;
        next();
      }
      else{
          res.sendStatus(403);
      }
   }
  // consulta un empleados  
  app.get('/employees/:id', verifyToken, (req, res)=>{
    jwt.verify(req.token,'secretkey', (error,authData)=>{
      if(error){
          res.sendStatus(403);
      }
      else{
        const {id } = req.params  
        const sql = `SELECT * FROM employee WHERE emp_no = ${id}`;
        connection.query(sql, (error, results)=>{
          if(error) throw error;
          if(results.length > 0){
            res.json(results);
          } else{
            res.send('no hay resultados');
          }
        }); 
      }
    });
  });
   //verificar conexion
  connection.connect(error=>{
      if(error) throw error;
        console.log('hay conexion a la bd');
  });
  app.listen(PORT,()=> console.log('el servidor esta corriendo por el puerto 3055'));
   
  