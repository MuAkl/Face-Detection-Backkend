const handleSignIn = (db,bcrypt)=>(Req,Res)=>{
    const {email,password} = Req.body;
    
    if(!email||!email.includes('@')){
        return Res.status(400).json('Please enter valid email');
    }

    if(!password||password.length<6){
        return Res.status(400).json('Password shoud be more than 6 characters');
    }

    db.select('email','hash').from('login')
        .where('email','=',email)
        .then(data=>{
            const isValid = bcrypt.compareSync(password,data[0].hash);
            if(isValid){
               return db.select('*').from('users')
                .where('email','=',email)
                .then(user=>{
                  Res.json(user[0])
                })
                .catch(err=>Res.status(400).json('Unable to get user'))
            }
            else{
                Res.status(400).json('Wrong email or password');
            }
        })
        .catch(err=>Res.status(400).json('Wrong email or password'))
                      
}

module.exports = {
    handleSignIn:handleSignIn
};