const handleProfile = (db)=>(Req,Res)=>{
    const {id} = Req.params;
    
    db.select('*').from('users').where({id})
    .then(user=>{
        if(user.length){
            Res.json(user[0]);
        }
        else{
            Res.status(400).json('Not Found');
        }

    })
        .catch(err=>Res.status(400).json('Error getting user'));
}

module.exports={
    handleProfile:handleProfile
};