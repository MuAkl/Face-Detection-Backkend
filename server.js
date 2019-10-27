const express= require('express');
const bodyParser= require('body-parser');
const app=express();
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex = require('knex');
const register = require('./Controllers/register');
const signIn = require('./Controllers/signin');
const image = require('./Controllers/image');
const profile=require('./Controllers/profile');
const db=knex({
                client: 'pg',
                connection: {
                host : '127.0.0.1',
                user : 'postgres',
                password : 'admin',
                database : 'smart-brain'
                }
            });

app.use(bodyParser.json());
app.use(cors());


app.get('/',(Req,Res)=>{
    Res.send(database.users);
})

app.post('/signin',signIn.handleSignIn(db,bcrypt))
app.post('/register',register.handleRegister(db,bcrypt))
app.get('/profile/:id',profile.handleProfile(db))
app.put('/image',image.handleImage(db))
app.post('/imageurl',image.handleApiCall())

/*




bcrypt.compare("veggies",hash,function(err,res){

});
*/ 
app.listen(3000,()=>{
    console.log('App is running on port 3000');
});