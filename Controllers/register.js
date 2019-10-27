const handleRegister =(db,bcrypt)=>(Req,Res)=>{
    
    const {email,name,password} = Req.body;
    const hash = bcrypt.hashSync(password);
    
    if(!email||!email.includes('@')){
        return Res.status(400).json('Please enter valid email');
    }
    if(!name){
        return Res.status(400).json('Please enter name');
    }
    if(!password||password.length<6){
        return Res.status(400).json('Password shoud be more than 6 characters');
    }

    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{      
            return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name:name,
                joined:new Date()
            }).then(user=>{
                    return Res.json(user[0]);

                 })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err=>Res.status(400).json('Email already exists'));

}

module.exports={
    handleRegister:  handleRegister
};