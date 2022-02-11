const express = require('express');
const router = express.Router();
const User =require('../models/usermodal')

router.post('/signin', async(req,res)=>{
    try {
        console.log(req.body.email)
        const user = await  User.findbycredential(req.body.email, req.body.password)
        const usertoken = await user.generatetoken()
        res.send({user, usertoken});
    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
})
router.post('/signup', async(req,res)=>{
    const user = new User(req.body)
      console.log(user)
      console.log(req.body.password)
      try {
          let finduser = await User.findOne({email: req.body.email});
         console.log(finduser)
          if(finduser)
          {
             return res.send({message: 'user already registered'})
          }
          await user.save();
          return res.send({message: 'registered successful'});
          
      } catch (error) {
          return res.send({message: 'something went wrong'})
      }

})

router.get("/", (req, res) => {
    res.send("Hello");     
});
router.get('/user', (req,res)=>{
    res.send({msg: 'bvbvbv'})
})
module.exports = router;
