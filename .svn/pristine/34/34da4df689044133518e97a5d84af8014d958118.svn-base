const LoginModel   = require("../models/login-model");
const UtilFunction = require("../constants/UtilFunction");

exports.Login = function(req , res) {
    var responseToDeliver = new Object();
    var validatingField = validate(req);
    if(validatingField.error){
        responseToDeliver.status = UtilFunction.getStatusObject(validatingField.msg, 204 , true);
        res.json(responseToDeliver);
    } else{
        LoginModel.findOne({email: req.body.email} , (err , login) => {
            if(err){ console.log('asdasd');
                res.json({ success: false, message: 'Server error.' });
            }else if(!login){
                responseToDeliver.status = UtilFunction.getStatusObject("Invalid email address", 204 , true);
                res.json(responseToDeliver);
            }else if(login){
                if(login.password == req.body.password){
                    responseToDeliver.status = UtilFunction.getStatusObject("Successfully logged in", 200 , false);
                    responseToDeliver.body   = login;
                    res.json(responseToDeliver);
                }else{
                    responseToDeliver.status = UtilFunction.getStatusObject("Invalid password", 204 , true);
                    res.json(responseToDeliver);
                }
            }
        });
    }
}

function validate(req) {
    var status = new Object();
    if(!req.body.email){
        status.msg   = "Email is required";
        status.error = true;
        return status;
    } else if(!req.body.password){
        status.msg   = "Password is required";
        status.error = true;
        return status;
    }else{
        status.msg   = "";
        status.error = false;
        return status;
    }
}