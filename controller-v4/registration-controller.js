const RegistrationModel = require("../models/registration");
const UtilFunction      = require('../constants/UtilFunction');

exports.Registration = function(req , res){
    var responseToDeliver = new Object();
    var validatingField = validate(req);
    if(validatingField.error){
        responseToDeliver.status = UtilFunction.getStatusObject(validatingField.msg, 204 , true);
        res.json(responseToDeliver);
    }else{
        RegistrationModel.find({email: req.body.email} , (err , value) => {
            if(value.length>0){
                responseToDeliver.status = UtilFunction.getStatusObject('Duplicate account' , 400 , false);
                res.json(responseToDeliver);
            }else{
                let obj = new RegistrationModel({
                    name    : req.body.name,
                    email   : req.body.email,
                    phone   : req.body.phone,
                    gender  : req.body.gender ,
                    password: req.body.password
                });
                obj.save((err , status) => {
                    if(err){
                        res.json({"msg":"can not save"});
                    }else{
                        responseToDeliver.status = UtilFunction.getStatusObject("Account created", 200 , false);
                        responseToDeliver.body   = obj;
                        res.json(responseToDeliver);
                    }
                });
            }
        }
    )};
}

function validate(req){
    var status = new Object();
    if(!req.body.name){
        status.msg   = "Name is required";
        status.error = true;
        return status;
    }else if(!req.body.email){
        status.msg   = "Email is required";
        status.error = true;
        return status;
    }else if(!req.body.password){
        status.msg   = "Password is required";
        status.error = true
        return status;
    }else if(!req.body.phone){
        status.msg   = "Phone is required";
        status.error = true;
        return status;
    }else if(!req.body.gender){
        status.msg   = "Gender is required";
        status.error = true
        return status;
    }else{
        status.msg   = "";
        status.error = false;
        return status;
    }
}