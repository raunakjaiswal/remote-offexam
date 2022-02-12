var axios = require('axios');
require('dotenv').config();
const messagefeedback=async(link)=>{
    return new Promise((resolve, reject)=>{

  
    var config = {
    method: 'get',
    url: link,
    headers: { 
        'Authorization': process.env.auth
    }
    };

    axios(config)
    .then(function (response) {
    console.log(response.data);
    resolve(response.data)
    })
    .catch(function (error) {
    console.log(error);
    resolve('err')
    });
})
}
module.exports = messagefeedback;