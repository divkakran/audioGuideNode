const CityList     = require('../models/city-list');
const Language     = require('../models/language');
const mon          = require('../models/monumentRes');    
const monV2        = require('../models/monumentResV2');   
const Monument     = require('../models/monuments');
const Utilfunction = require("../constants/UtilFunction");
const mongoose     = require('mongoose');


exports.getCityListV2 = async function(req , res){
    var defaultLangId = '';
    var responseToDeliver    = new Object();
    responseToDeliver.status = Utilfunction.getStatusObject("Data Available" , 200 , false);
    if(responseToDeliver.status.errorStatus) {
        res.json(responseToDeliver);
    }else{
        CityList.find({city_status: 1} , async (error , cityList) => {
            let response = JSON.parse(JSON.stringify(cityList));
            var resForSent = [];
            var lang       = [];
            await Language.find({language_status: 1} , (err , data) => {
                let _temp = JSON.parse(JSON.stringify(data));
                for(let item of _temp){
                    let obj = {
                        languageId   : item._id,
                        languageName : item.language_name
                    }
                    if(item.language_name == "English" && !req.body.langId){
                        defaultLangId = item._id; 
                    }
                    lang.push(obj)
                }
                if(defaultLangId == ''){
                    defaultLangId = req.body.langId;
                }
            });
            for(let item of response){ 
               var data =  await Monument.aggregate([
                   {
                        $match:
                        {
                            "monument_active":1,
                            "monument_city_id":mongoose.Types.ObjectId(item._id)
                        }
                   },
                   {
                        $lookup:
                        {
                            from:"monument_language_managements",
                            localField: "_id",
                            foreignField:"monument_id",
                            as:"monument_desc"
                        } ,
                       
                    },
                    {
                        $unwind: {
                            "path":"$monument_desc",
                            "preserveNullAndEmptyArrays":true
                        }
                    },
                    {
                        $match:
                        {
                            "monument_desc.monument_language_id":new mongoose.Types.ObjectId(defaultLangId),
                            // "monument_desc.monument_language_status":1
                        }
                    }
                ]);
                let _temp = JSON.parse(JSON.stringify(data)); 
                let monumentArray = []
                for(let item of _temp){
                    if(item.monument_description == undefined){
                        item.monument_description = 'I will add description later';
                    }
                     let monObj = new monV2 (
                         item._id,
                         item.image_name,
                         item.monument_desc.monument_language_description,
                         item.monument_city_id,
                         item.monument_name,
                         item.monument_desc.monument_language_title
                     )
                     monumentArray.push(monObj);
                }
                 var obj = {
                     id: item._id,
                     city_name: item.city_name,
                     language:lang,
                     monument: monumentArray
                 }; 
                 resForSent.push(obj);
            }
            responseToDeliver.city = resForSent;
            res.json(responseToDeliver);
        });
    }
}