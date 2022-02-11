const jwt = require('jsonwebtoken')
const User=  require('../models/usermodal')
const auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer', '')
        console.log(token)
        const decoded = jwt.verify(token,'offexam')
        console.log(decoded)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
            if(!user)
            {
                throw new Error();
            }
            req.token = token;
            req.user = user;
            next();
    } catch (error) {
        console.log(error)
        res.status(402).send({ error: 'authetication error' })
    }
}
module.exports = auth