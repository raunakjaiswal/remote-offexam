const mongoose= require('mongoose');
const TestSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
    description: {
       type: String,
       required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    starttime: {
      type: String,
      required: true,
    },
    endtime: {
       type: String,
       required: true
    },
    date: {
        type: String,
        required: true,
    },
    orginialquestionpaper:{
         type: String,
         required: true,
    },
    encryptedquestionpaper: {
        type: String,
        required: true,
    },
    pdfpassword:{
        type: String,
        required: true,
    },
    answersubmit: [{
        rollnumber: {
            type: String,
            required: true,
        },
        anssheet: {
          type: String,
          required: true
        },
        submissiontime: {
            type: Date,
            default: Date.now()
        },
        verified: {
            type: Boolean,
            default: false
        }
    }],
    shakeysubmit: [{
       rollnumber: {
           type: String,
           required: true
           
       },
       key:{
           type: String,
           required: true
       },
       submissiontime: {
        type: Date,
        default: Date.now()
    },
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Group'
    },

},{ timestamps: true })

const Test = mongoose.model('Test', TestSchema);
module.exports= Test