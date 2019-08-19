const language = require('../models/language');
const Utilfunction = require("../constants/UtilFunction");

exports.getLanguageList =  function(req,res){
    language.find({language_status:1} , (error , list) => {
        var responseToDeliver = new Object();
        responseToDeliver.status = Utilfunction.getStatusObject("Data Available" , 200 , false);
        let _temp = JSON.parse(JSON.stringify(list));
        let resp  = [];
        for(let item of _temp){
            let _temp = {languageId: item._id , languageName: item.language_name};
            resp.push(_temp);
        }
        responseToDeliver.languageList = resp;
        res.json(responseToDeliver);
    });
}