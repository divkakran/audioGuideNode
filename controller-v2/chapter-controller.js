const Chapter      = require('../models/chapter');
const UtilFunction = require("../constants/UtilFunction");
const mongoose = require('mongoose');
exports.getChapterDetail = function(req , res){
    let validatingField  = validateFields(req.body);
    var responseToDeliver    = new Object(); 
    if(!validatingField.error){
        Chapter.find({chapter_monument_id: mongoose.Types.ObjectId(req.body.monId) , chapter_language:  mongoose.Types.ObjectId(req.body.langId)} , function(err , data) {
            if(data.length){
                responseToDeliver.status = UtilFunction.getStatusObject("Data available" , 200 , false);
                let _temp = new Chapter().getChapterObject(data);
                responseToDeliver.chapters = _temp;
                res.json(responseToDeliver);
            }else{
                responseToDeliver.status = UtilFunction.getStatusObject("No Data Available" , 200 , true);
                res.json(responseToDeliver);
            }
        });
    }else{
        responseToDeliver.status = UtilFunction.getStatusObject(validatingField.msg, 204 , true);
        res.json(responseToDeliver);
    }
}
function validateFields(data){
    var status = new Object();
    if(!data.langId){
        status.msg   = "Language Id is required";
        status.error = true;
        return status;
    } else if(!data.monId){
        status.msg   = "Monument Id is required";
        status.error = true;
        return status;
    } else{
        status.msg   = "";
        status.error = false;
        return status;
    }
}