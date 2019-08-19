var env          = process.env.NODE_ENV || 'development'
   , packageJson = require("../package.json")
   , path        = require('path')
   , express     = require('express')
   , bodyParser  = require('body-parser')
   , mongoose    = require('mongoose')
   , dot         = require('dotenv').config()
   , route       = require('./route');

console.log("app in" + env+ "node");

global.App = {
    app: express()
   ,port: process.env.PORT
   ,version: packageJson.version
   ,root: path.join(__dirname, '..')
   ,imageTesting:'http://testing.birdapps.org/audio_odigos/cms/uploads/'
   ,imageStaging:'http://testing.birdapps.org/audio_odigos/cms/uploads/'
   ,appPath: function(path){
       return this.root + '/' + path;
   }
   ,require: function(path){
       return this.appPath(path)
   }
   ,env: env
   ,start: function(){
        this.started = true
        this.app.listen(this.port , () =>{
            mongoose.connect(process.env.DB_URL , {useNewUrlParser: true});
            console.log("Server is listening on port "+ this.port)
        })
        console.log(process.env.PORT);   
    }
    ,route: function(path){
        return this.require("/"+path)
    }
}

// middleware

const basicAuth = require('express-basic-auth');

App.app.use(basicAuth({
    users: {'admin': 'admin1234' },
    unauthorizedResponse: getUnauthorizedResponse
}));

var errorObj = {"msg":"Invalid request" , "errorCode":401}
var errorNull = {"msg":"No credential provided"}
function getUnauthorizedResponse(req) {
    return req.auth
        ? (errorObj)
        : errorNull
}

App.app.use(bodyParser.json());
App.app.use(route);
