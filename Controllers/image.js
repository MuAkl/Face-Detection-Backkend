const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: '580c5829f71f4033b09d14b41451abf6'
 });

 const handleApiCall=()=>(Req,Res)=>{
     app.models.predict(Clarifai.FACE_DETECT_MODEL,Req.body.input)
     .then(data=>Res.json(data))
     .catch(err=>Res.status(400).json('Unable to work with API'))
    }

const handleImage =(db)=>(Req,Res)=>{
    const {id} = Req.body;
    
    db('users').where('id','=',id)
      .increment('entries',1)
      .returning('entries')
      .then(entries=>{
          if(entries.length){
              Res.json(entries[0]);
          }
          else{
              Res.status(400).json('unable to get entries')
          }
        })
        .catch(err=>Res.status(400).json('unable to get entries'))
    
}
module.exports={
    handleImage:handleImage,
    handleApiCall:handleApiCall
};