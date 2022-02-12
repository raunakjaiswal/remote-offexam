const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    phonenumber:{
        type: Number,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    tokens: [{
          token: {
              type: String,
              required: true,
          }
    }]
},
{ timestamps: true }
)

UserSchema.statics.findbycredential= async(email,password)=>
{
  const user = await User.findOne({email});
  if(!user)
  {
      throw new Error('unable to login')
  }
  const ismatch = (password=== user.password)
  if(!ismatch)
  {
      throw new Error('unable to login')
  }
  return user
}


UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens
    return userObject;
}


UserSchema.methods.generatetoken=async function(){
    const user = this;
    console.log(user)
    const token = jwt.sign({_id: user._id.toString()}, 'offexam', {expiresIn: '7 days'})
    user.tokens = user.tokens.concat({token: token})
    await user.save()
    return token;
}
const User = mongoose.model('User', UserSchema);
module.exports = User

