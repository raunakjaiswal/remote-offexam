const requestfunction  = require('../function/request')
const comparetime = require('../function/time')
const result = (keyarray, pdfarray, starttime, endtime,examdate)=>{
// console.log(starttime,endtime)
// console.log(starttime.getTime())
return new Promise((resolve,reject)=>{

let mp = new Map();

keyarray.forEach(element => {
    let roll = element.rollnumber;
    let key = element.key;
    let time = element.submissiontime;
    let submissiondate = time.toLocaleDateString('en-US', {timeZone: 'Asia/Kolkata',});
    let submissiontime = time.toLocaleTimeString('en-US', {timeZone: 'Asia/Kolkata', hour12: false});
    mp.set(roll, [key,submissiondate,submissiontime,''])
});

pdfarray.forEach((element)=>{
    let roll = element.rollnumber;
    let link = element.anssheet;
    let time='';
    let shakey = '';
    let date = '';
    if(mp.has(roll))
    {
        shakey = mp.get(roll)[0];
        date = mp.get(roll)[1]
        time = mp.get(roll)[2];
    }
    mp.set(roll, [shakey,date,time,link])
})
let vector = []
let si = 0
mp.forEach(async(values,keys)=>{
    let link  = values[3];
       let sha256  =  await requestfunction(link)
      let chk = await comparetime(starttime,endtime,examdate,values[2],values[1])

      if(sha256===values[0])
      {
          if(chk)
          {
               let temp={
                   rollnumber: keys,
                   answerlink: values[3],
                   sha256true: true,
                   submittedontime: true,
                   status: true,
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
                    status: false,
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
            submittedontime: false, //null
            status: false,
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