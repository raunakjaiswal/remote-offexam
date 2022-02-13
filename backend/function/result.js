const requestfunction  = require('../function/request')
const comparetime = require('../function/time')
const messagefeedback=require('../function/messagefeedback')
const verify=async(sendmessagestatus)=>{
    return new Promise(async(resolve,reject)=>{
        let mp= new Map();
        let cnt = 0;
        if(sendmessagestatus.length==0)
        {
            resolve(mp)
        }
        sendmessagestatus.forEach(async(obj)=>{
            let data = await messagefeedback("https://api.twilio.com"+obj.uri)
            mp.set(obj.rollnumber, [data.status,data.date_sent])
            cnt++;
            if(cnt==sendmessagestatus.length)
            {
                resolve(mp);
            }
        })
})
}

const result = (keyarray, pdfarray, starttime, endtime,examdate,sendmessagestatus)=>{
// console.log(starttime,endtime)
// console.log(starttime.getTime())
return new Promise(async(resolve,reject)=>{

let mp = new Map();
console.log(sendmessagestatus.length)
if(sendmessagestatus.length!=0)
{
let map_verify  = await verify(sendmessagestatus)
console.log("kkkl")
console.log(map_verify)
map_verify.forEach(async(values,keys)=>{
  mp.set(keys, ['','','','',values[0], values[1]])
})
}
keyarray.forEach(element => {
  
    let status='';
    let messagetime='';
    let roll = element.rollnumber;
    if(mp.has(roll))
    {
        status  = mp.get(roll)[4];
        messagetime = mp.get(roll)[5]
    }
    let key = element.key;
    let time = element.submissiontime;
    let submissiondate = time.toLocaleDateString('en-US', {timeZone: 'Asia/Kolkata',});
    let submissiontime = time.toLocaleTimeString('en-US', {timeZone: 'Asia/Kolkata', hour12: false});
    mp.set(roll, [key,submissiondate,submissiontime,'',status,messagetime,status,messagetime])
});

pdfarray.forEach((element)=>{
    let roll = element.rollnumber;
    let link = element.anssheet;
    let time='';
    let shakey = '';
    let date = '';
    let status='';
    let messagetime='';
    if(mp.has(roll))
    {
        shakey = mp.get(roll)[0];
        date = mp.get(roll)[1]
        time = mp.get(roll)[2];
        status  = mp.get(roll)[4];
        messagetime = mp.get(roll)[5]
    }
    mp.set(roll, [shakey,date,time,link,status,messagetime])
})
let vector = []
let si = 0
console.log("ydd")
console.log(mp)
console.log(mp.size)
if(mp.size==0)
{
    resolve([])
}
mp.forEach(async(values,keys)=>{
    let link  = values[3];
    let sha256=''
    let chk='';
    if(link!='')
        sha256  =  await requestfunction(link)
    if(values[2]!='' && values[1]!='')
       chk = await comparetime(starttime,endtime,examdate,values[2],values[1])

       if(sha256 !='' && values[0]!='')
       {
           // student has submit both sha256 and answer
           if(sha256===values[0])
           {
               // sha256 got matched
               if(chk)
               {
                   // sha256 got submitted on same date within given time limit
                   let temp={
                       rollnumber: keys,
                       answerlink: values[3],
                       sha256true: true,
                       keysubmissiontime:values[2],
                       keysubmissiondate: values[1],
                       submissiontime: true,   
                       status:values[4],
                       messagetime: values[5]
                       // true
                   }
                 vector.push(temp)
               }
               else
               {
                   let temp={
                    rollnumber: keys,
                    answerlink: values[3],
                    sha256true: true,
                    keysubmissiontime:values[2],
                    keysubmissiondate: values[1],
                    submissiontime: false,   
                    status:values[4],
                    messagetime: values[5]
                    // false
                   }
                   vector.push(temp)

               }
           }
           else
           {
                let temp={
                    rollnumber: keys,
                    answerlink: values[3],
                    sha256true: false,
                    keysubmissiontime: '-',
                    keysubmissiondate: '-',
                    submissiontime: '-',   
                    status:values[4],
                    messagetime: values[5]
                    // false
                }
             vector.push(temp)
           }
       }
     else if(sha256=='' && values[0]!='')
     {
         // sha has receive but pdf not recieve

        if(chk)
        {
            // chk sha was submitted on time or not
            let temp={
                rollnumber: keys,
                answerlink: 'waiting',
                sha256true: '-',
                keysubmissiontime:values[2],
                keysubmissiondate: values[1],
                submissiontime: true,   
                status:values[4],
                messagetime: values[5]
            }
            // waiting
            vector.push(temp)
        } 
        else
        {
            let temp={
                rollnumber: keys,
                answerlink: 'waiting',
                sha256true: '-',
                keysubmissiontime:values[2],
                keysubmissiondate: values[1],
                submissiontime: false,   
                status:values[4],
                messagetime: values[5]
            }
            // false
            vector.push(temp)
        }
     }
     else if(sha256=='' && values[0]=='')
     {
         let temp={
            rollnumber: keys,
            answerlink: '-',
            sha256true: '-',
            keysubmissiontime: '-',
            keysubmissiondate: '-',
            submissiontime: '-',   
            status:values[4],
            messagetime: values[5]
         }
         vector.push(temp)
     }
       si++;
       if(si==mp.size)
       {
         resolve(vector);
       }  
  })    
})
}
module.exports = result;