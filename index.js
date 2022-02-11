
const express= require('express');
require('./db/mongodb')
const userrouter= require('./routers/user');
const grouprouter =require('./routers/group')
const testrouter= require('./routers/test')
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var cors = require('cors');
app.use(cors({credentials: true, origin: process.env.frontend}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","*");
    res.header('Access-Control-Request-Headers', '*');
    next();
})
app.use(userrouter)
app.use(grouprouter)
app.use(testrouter)
app.listen(process.env.PORT||80,async () => {
    console.log('listening on port 80')
})



