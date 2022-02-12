require('dotenv').config();
const FROM_NUMBER = '+18045757447';
const AUTH_TOKEN = process.env.twilioauthtoken;
const ACCOUNT_SID = process.env.twiliosid;
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
const Test  = require('../models/test')

const savemessagefeedback= async(array_obj,testid)=>{
    let testdata = await Test.findById({_id: testid});
    return new Promise(async(resolve,reject)=>{
        array_obj.forEach((obj)=>{
            testdata.sendmessagestatus =  testdata.sendmessagestatus.concat({...obj})
        })
        await testdata.save()
        resolve("ok")
    })
}


const sendmessage=async(numbers,pdfpassword,testid)=>{
//    var stringg =  'PDF_PASSWORD: '+"\n"  +`${pdfpassword}`+"\n\n"+ 'TEST_ID: '+"\n"+testid
var stringg = '%'+testid+'%'+pdfpassword+'%';
   return new Promise((resolve,reject)=>
   {
       var count = 0;
       var array_obj = []
        numbers.forEach(number=>{
            console.log(number)
            client.messages
            .create({
                body: stringg+number.rollnumber.toString() ,
                from: FROM_NUMBER,
                // statusCallback: 'https://remote-offexam-backend.herokuapp.com',
                to: "+91"+number.phonenumber
            })
            .then(async (message) => {
                console.log(message.sid)
                let temp = {
                    rollnumber: number.rollnumber,
                    uri: message.uri,
                    sid: message.sid
                }
                array_obj.push(temp)
                count = count+1;
                if(count==numbers.length)
                {
                  let gett= await savemessagefeedback(array_obj,testid)
                    // console.log(array_obj)
                   resolve(gett)
                }
          
            }).catch((error) => {
            reject("some error")
            });
        })   
  })
}



module.exports = sendmessage;