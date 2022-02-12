var request = require('request');
const crypto= require('crypto');
const requestfunction=(link)=>{
  
    return new Promise((resolve, reject) => {
        request.get(link, {encoding: 'base64'},function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var csv = body.toString();
                const hash = crypto.createHash('SHA256')
                 const finalhash = hash.update(csv).digest('hex')
                 resolve(finalhash)
            }
            else
            {
              reject('err')
            }
        });
    })

}
module.exports = requestfunction;