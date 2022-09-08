const express = require("express");
const app = express();
const cors = require('cors');
const {VerifyToken} = require('./auth')
const {Encrypt,Decrypt} = require('./Encryption');

const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodesystem'
})
connection.connect((err)=>{if(err){console.log("Error Databse")}else{console.log("Database Connect...")}});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/',(req,res) =>
{
    res.send("Rest Api Working")
})
/*
app.post('/users/add', async (req,res) =>
{
    const body = req.body;
    const Salt = await bcrypt.genSalt(10);
    const HashPassword = await bcrypt.hash(req.body.pass,Salt);
    var sql = `INSERT INTO users (uid,name,email,pass) values (${body.uid},'${body.name}','${body.email}','${HashPassword}')`;
    connection.query(sql,[body.uid,body.name,body.email,HashPassword], (error, results) => {
        if (error) {
            res.send({
              "code":400,
              "failed":"error ocurred",
              "error": error
            })
        }else{
            res.send({
                "code":200,
                result : results
            });
        }
    });
})
*/
app.get('/users',async (req,res) =>
{
    var sql = `select * from users;`;
    connection.query(sql,(error,result) =>
    {
        if(error)
        {
            res.send(error);
        }
        else
        {
            res.send(result);
        }
    })
})

app.post('/user/login', async (req,res) =>
{
    let body = req.body;
    let email = req.body.email;
	let password = req.body.pass;
    var sql = `select * from users where email = ? `;
    connection.query(sql,[email],async (error, results) => {
        if (error) return res.status(400).send("Server error !!!");
        if(results.length>0)
        {
            let row = results[0];
            let dbpass = row.pass;
            const ComparePass = await bcrypt.compare(password, dbpass);
            if(!ComparePass)
            { 
                return res.status(400).send(`password incorrect : ${dbpass}`)
            }
            else{
                const key = process.env.TOKEN_SECRET;
                const token = jwt.sign({uid:row.uid,name:row.name,email:row.email,password:password}, key);
                //localStorage.setItem('jwt-token',token);
                /*
                res.cookie("jwt-token", Encrypt(token), {
                        //expires: new Date(Date.now() + 900000),
                        secure: false,
                        httpOnly: true,
                });
                */
                
                res.send(Encrypt(token));
            }
        }
        else
        {
            return res.status(400).send("user not found!!")
        }
    });
});

app.get('/users/:id',VerifyToken , async (req,res) =>
{
    var sql = `select * from users where id = ?;`;
    connection.query(sql,[req.params.id],(error,result) =>
    {
        if(error)
        {
            res.send(error);
        }
        else
        {
            res.send(result[0]);
        }
    })
});

app.get('/user/info',VerifyToken, (req,res) =>
{
    //const token = req.header("auth-token");
    try
    {
        //var x = req.params.id;
        //const EncryptToken = req.header("auth-token");
        const EncryptToken = req.cookies['jwt-token'];
        const token = Decrypt(EncryptToken);
        const key = process.env.TOKEN_SECRET;
        const decoded = jwt.verify(token, key);  
        
        res.send(decoded)
    }
    catch(err)
    {
        res.send({
            'Action' : 'Info',
            'error' : err.toString()
        })
    }
});

app.get("/logout", VerifyToken , (req, res) =>
{
    try
    {
        res.clearCookie('jwt-token');
    }
    catch(err)
    {
        res.status(400).send({
            'Action' : 'Logout',
            'error' : err.toString()
        })
    }
});














app.listen(5000,()=>console.log("Server is runnig is port 5000"))