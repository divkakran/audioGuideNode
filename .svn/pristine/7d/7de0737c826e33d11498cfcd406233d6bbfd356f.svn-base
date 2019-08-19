const CityList     = require('../models/city-list');
const CityLang     = require('../models/city-language-model');
const Utilfunction = require("../constants/UtilFunction");
const Language     = require('../models/language');
const mongoose     = require('mongoose');

exports.getAllCity = async function(req, res){
    var responseToDeliver = new Object();
    var resp  = [];
    var defaultLangId='';
    var list  = await CityList.find({city_active: 1});
    // setting defaul language
    var languages = await Language.find({language_status: 1});
    let languageObject     = JSON.parse(JSON.stringify(languages));
    for(let item of languageObject){
        if(item.language_name == "English" && !req.body.langId){
            defaultLangId = item._id;
        }
    }
    if(defaultLangId == ''){
        defaultLangId = req.body.langId;
    }
    // setting default language
    responseToDeliver.status = Utilfunction.getStatusObject("Data Available" , 200 , false);
    var _temp = JSON.parse(JSON.stringify(list));
    for(let item of _temp){ 
        let cityByLanguage = await CityLang.find({ city_language_city_id:mongoose.Types.ObjectId(item._id) , city_language_id:mongoose.Types.ObjectId(defaultLangId) });
        let _temp = {id: item._id , cityName: JSON.parse(JSON.stringify(cityByLanguage[0])).city_language_name};
        resp.push(_temp);
    }
    responseToDeliver.cityList = resp;
    res.json(responseToDeliver);
}