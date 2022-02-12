require('dotenv').config();
const FROM_NUMBER = '+18045757447';
const AUTH_TOKEN = process.env.twilioauthtoken;
const ACCOUNT_SID = process.env.twiliosid;
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

const sendmessage=(numbers,pdfpassword,testid)=>{
   var stringg =  'PDF_PASSWORD: '+"\n"  +`${pdfpassword}`+"\n\n"+ 'TEST_ID: '+"\n"+testid
   return new Promise((resolve,reject)=>
   {
       var count = 0;
        numbers.forEach(number=>{
            console.log(number)
            client.messages
            .create({
                body: stringg ,
                from: FROM_NUMBER,
                to: number
            })
            .then(message => {
                count = count+1;
                if(count==numbers.length)
                resolve("success")
            // console.log(message)
            }).catch((error) => {
            reject("some error")
            });
        })
      
 
     
  })
}
module.exports = sendmessage;