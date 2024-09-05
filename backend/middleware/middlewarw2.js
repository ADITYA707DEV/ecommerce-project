const jwt = require("jsonwebtoken")
    const jwt_Secret = "hoolululu"
    const User = require("../models/userAccount")
   const JWT_secret2 = "yosh"
const verification =  async (req,res,next)=>{
 
    const token = req.cookies.auth
   

      try{
        
     const data = await jwt.verify(token,jwt_Secret)
 
     const auser = await User.findOne({_id:data.id}).select({password:0})
    
   
     if(auser.address !== undefined ){
      const data2 = {id:auser._id,address:auser.address,email:auser.email}
      const token2 = jwt.sign(data2,JWT_secret2,{expiresIn:"1h"})
    
      res.cookie("verif",token2,{
        httpOnly: true,})
     
     }
         
   return res.send({user:auser,status: true})
      }catch(error){
       next()
      }
     
}

module.exports = verification