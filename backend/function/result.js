const requestfunction  = require('../function/request')
const comparetime = require('../function/time')
const messagefeedback=require('../function/messagefeedback')
const verify=async(sendmessagestatus)=>{
    return new Promise(async(resolve,reject)=>{
        let mp= new Map();
        let cnt = 0;
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

let map_verify  = await verify(sendmessagestatus)
console.log("kkkl")
console.log(map_verify)
map_verify.forEach(async(values,keys)=>{
  mp.set(keys, ['','','','',values[0], values[1]])
})
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
mp.forEach(async(values,keys)=>{
    let link  = values[3];
    let sha256=''
    let chk='';
    if(link!='')
        sha256  =  await requestfunction(link)
    if(values[2]!='' && values[1]!='')
       chk = await comparetime(starttime,endtime,examdate,values[2],values[1])

      if(sha256!='' && sha256===values[0])
      {
          if(chk && chk!='')
          {
               let temp={
                   rollnumber: keys,
                   answerlink: values[3],
                   sha256true: true,
                   submittedontime: true,
                   status: values[4],
                   messagetime: values[5]
               }
               vector.push(temp)
          }
          else
          {
                let temp={
                    rollnumber: keys,
                    answerlink: values[3],
                    sha256true: true,
                    submittedontime: false,
                    status: values[4],
                    messagetime: values[5]
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
            submittedontime: false,//NULL
            status: values[4],
            messagetime: values[5]
        }
        vector.push(temp)
      }
    //    if(chk && sha256===values[0])
    //    {
    //        let temp = {
    //            rollnumber: keys,
    //            answerlink:values[3],
    //            bool: true
    //        }
    //        vector.push(temp)
    //    }
    //    else
    //    {
    //         let temp = {
    //             rollnumber: keys,
    //             answerlink:values[3],
    //             bool: false
    //         }
    //         vector.push(temp)
    //    }
       si++;
       if(si==mp.size)
       {
         resolve(vector);
       }  
  })    
})
}
module.exports = result;