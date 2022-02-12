const cloudinary = require('cloudinary').v2
require('dotenv').config()
cloudinary.config({
    // cloud_name: 'devwf0bjp',
    // api_key: '365872832633884',
    // api_secret: 'A17jc8Bc9VTX_IwepuB5A3AyFKE'
    cloud_name: process.env.cloudname,
    api_key: process.env.apikey,
    api_secret: process.env.apisecretkey
});

module.exports = cloudinary;