const mongoose= require('mongoose');
const GroupSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
   },
    description: {
       type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    studentlist: [{
        name: {
           type: String,
           required: true
        },
        rollnumber: {
            type: String,
            required: true
        },
        phonenumber: {
           type: Number,
           required: true
        },
    }]
},
{ timestamps: true })

const group = mongoose.model('Group', GroupSchema);
module.exports= group 