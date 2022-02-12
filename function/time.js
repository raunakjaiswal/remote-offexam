const comparetime = (starttime, endtime, examdate,shatime, shadate)=>{
    // console.log(examdate,shadate)
    return new Promise((resolve,reject)=>{
     
        if(examdate==shadate && shatime>=starttime && shatime<=endtime)
        {
            // console.log(starttime,endtime,shatime)
            // console.log(true)
            resolve(true)
        }
        else
        {
            resolve(false)
            // console.log(false)
        }
    })
  
}
module.exports = comparetime