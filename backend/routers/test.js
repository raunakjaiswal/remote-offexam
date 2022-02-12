const express = require('express');
const router = express.Router();
const auth  = require('../middleware/auth');
const Test = require('../models/test')
const fileUpload = require('../middleware/multer')
let streamifier = require('streamifier');
const cloudinary= require('../cloudinary/cloudinary')
const resultfun = require('../function/result')
const Group=require('../models/groups')
const HummusRecipe = require('hummus-recipe');
const axios = require('axios').default;
const fs = require('fs');
const pdf2base64 = require('pdf-to-base64');
//require dotenv
const Sendmessage= require('../twilio/sendmessage')
require('dotenv').config();
const FROM_NUMBER = '+18045757447';
const AUTH_TOKEN = process.env.twilioauthtoken;
const ACCOUNT_SID = process.env.twiliosid;
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
const twiliostring_function = require('../function/twiliostring');
const { CompositionSettingsList } = require('twilio/lib/rest/video/v1/compositionSettings');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const uploading = (data) => {
    console.log("Called");
    return new Promise((resolve, reject) => {
        try {
            let cld_upload_stream = cloudinary.uploader.upload_stream(
                {
                    folder: "pdfss",
                },
                function (error, result) {
                    resolve(result)
                }
            );
            streamifier.createReadStream(data).pipe(cld_upload_stream);
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}


// create test
router.post('/test', auth,fileUpload.single('file'),async(req,res)=>{
    try {
        
        let pdf = req.file.buffer
        console.log(pdf)
        fs.writeFileSync("./routers/test.pdf", pdf);
        let uploaded_file_data=  await uploading(req.file.buffer)
        console.log(uploaded_file_data)
        let file_link = uploaded_file_data.secure_url
        ///encrypt aa file
        var s = makeid(10);
        //**** */
        const pdfDoc = new HummusRecipe("./routers/test.pdf", `./routers/${s}.pdf`);
        pdfDoc.encrypt({
            userPassword: req.body.password,
            ownerPassword: req.body.password,
            userProtectionFlag: 4
        }).endPDF();
        //***** */
        let file_link_encrypted = await pdf2base64("./routers/"+s+".pdf");
        // console.log(file_link_encrypted)
            const test=  new Test({...req.body, orginialquestionpaper: file_link, encryptedquestionpaper: file_link_encrypted.toString(), pdfpassword: req.body.password,owner: req.user._id});
            //, owner: req.user._id
            await test.save() 
            console.log("saved");
            // console.log("Encrypted Link:", file_link_encrypted);
            // console.log("decrypted Link:", file_link);    
            res.send("test created suceessfully")              
        //res.sendFile(__dirname+ "encrypted.pdf");
    } catch (error){
        console.log(error)
       return res.send(error)
    }
})

// get all test basic info
router.get('/test',auth,async(req,res)=>{
    try {
        let senttestdata=[]
        const test = await Test.find({owner: req.user._id});
        test.forEach((tes)=>{
           let temp={
               name: tes.name,
               description: tes.description,
               starttime: tes.starttime,
               endtime: tes.endtime,
               date: tes.date,
               testid: tes._id
           }
           senttestdata.push(temp)
        })
        res.send(senttestdata)
    } catch (error) {
        return res.send('err')
    }
})

//get particular test all data
router.get('/gettestdata/:id', auth,async(req,res)=>{
    try {
        let testid  = req.params.id;
        const test = await Test.findById({_id: testid});
        test.encryptedquestionpaper= "data:application/pdf;base64,"+test.encryptedquestionpaper
        res.send(test)
    } catch (error) {
        return res.send('err')
    }
})


// router.post('')
// router.post()



// router.post('/passwordcheck',fileUpload.single('file'),async(req,res)=>{
//     try {
//         let uploaded_file_data=  await uploading(req.file.buffer)
//         let file_link = uploaded_file_data.secure_url
//         const pdfDoc = new HummusRecipe(file_link, '../data/output.pdf');
//         pdfDoc
//             .encrypt({
//                 userPassword: '123',
//                 ownerPassword: '123',
//                 userProtectionFlag: 4
//             })
//             .endPDF();
//             res.send("success")
        
//     } catch (error) {
//         return res.send('err')
//     }
// })


//submit student key 
router.post('/student/key', async(req,res)=>{
    // console.log(req.body)
    // console.log(req.body)
    // console.log("yes")
    // console.log(req.body.Body)
    let obj = twiliostring_function(req.body.Body);
    // console.log(obj)
    try {
        // let rollnumber = req.body.rollnumber;
        // let key = req.body.key;
        // let examid = req.body.testid;
        // const test  = await Test.findById({_id: examid})
        const test  = await Test.findById({_id: obj.testid})
        test.shakeysubmit = test.shakeysubmit.concat({rollnumber: obj.rollnumber, key: obj.key})
        await test.save()
        // console.log("done")
        res.send('key submitted successfully')

    } catch (error) {
        return res.send('err')
    }
})

// student will upload answer pdf
router.post('/student/answer',fileUpload.single('file'),async(req,res)=>{
    console.log(req.body)
    try {
        let examid = req.body.testid;
        let uploaded_file_data=  await uploading(req.file.buffer);
        let answer_link = uploaded_file_data.secure_url;
        let rollnumber = req.body.rollnumber;
        const test = await Test.findById({_id: examid});
        test.answersubmit = test.answersubmit.concat({rollnumber: rollnumber,anssheet: answer_link });
        await test.save()
        res.send("answer submitted successfully")
    } catch (error) {
        console.log(error)
        return res.send('err')
    }
})


router.get('/test/result/:id',auth,async(req,res)=>{
    let examid = req.params.id;
    try {
        const test  = await Test.findById({_id: examid})
        // console.log(test)
        let keyarray = test.shakeysubmit;
        let pdfarray = test.answersubmit;
        let starttime = test.starttime;
        let endtime  = test.endtime;
        let examdate = test.date
        let pp =  await resultfun(keyarray,pdfarray, starttime,endtime, examdate);
        res.send(pp)
    } catch (error) {
    }
})

//send message
router.post('/test/sendmessage',async(req,res)=>{
    try {
        let testid = req.body.testid;
        console.log(testid)
        let test =  await Test.findById({_id: testid})
        let pdfpassword=  test.pdfpassword;
        let group = test.group;
        let groupdata = await Group.findById({_id: group});
        let studentlist = groupdata.studentlist;
        console.log(studentlist)
        var numbers = []
        studentlist.forEach((student)=>{
        numbers.push("+91"+student.phonenumber)
        })   
        let msg = await Sendmessage(numbers,pdfpassword,testid);
        res.send(msg)
    } catch (error) {
        res.send('error')
    }
    
})

router.post("/twiliomessage",async(req,res)=>{
    console.log("Message Recieved:");
    console.log(req)
    res.send({
        msg:"Message Received",
        success: true,
        msg: req.body
    })
})

router.get("/gtwiliomessage",async(req,res)=>{
    res.send("twilio");
})


router.post('/trysendmessage',async(req,res)=>{
    var chk = await  Sendmessage(['+917762845211','+917762845211','+917762845211'],'a6b9855e10fb06788d415b56e5a1bb6119019584db4d60ccacbb124bd4b1cc98','nwkjnedfefefeefefeefefe');
    res.send(chk);
})

module.exports = router;