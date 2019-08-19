const StateList     = require('../models-v3/stateListModel');
const Utilfunction  = require("../constants/UtilFunction");
const mongoose      = require('mongoose');
const Monument      = require('../models/monuments');
const Language      = require('../models/language');
const monV2         = require('../models-v3/stateListResponse'); 

exports.getStateList = async function(req , res){ 
    var defaultLangId = '';
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
            // lang.push(obj)
        }
        if(defaultLangId == ''){
            defaultLangId = req.body.langId;
        }
    });
    var responseToDeliver  = new Object();
    var resForSent = [];
    responseToDeliver.status = Utilfunction.getStatusObject('Data Available', 200 , false);
    StateList.find({state_active : 1} , async (error , stateList) => {
        let response = JSON.parse(JSON.stringify(stateList));
        for(let item of response){ 
            var data  = await Monument.aggregate([
                {
                    $match:
                    {
                        "monument_state_id" : mongoose.Types.ObjectId(item._id),
                        "monument_active"   : 1
                    }
                },
                {
                    $lookup: 
                    {
                        from: "monument_language_managements",
                        localField: "_id",
                        foreignField: "monument_id",
                        as: "monumentList"
                    }
                }
            ]);
            var _temp = JSON.parse(JSON.stringify(data));  
            let monumentArray = []; 
            for(let item of _temp){ console.log(item);
                for(let i of item.monumentList){
                    if(i.monument_language_id == mongoose.Types.ObjectId(defaultLangId)){
                        // let monObj = {
                        //     "id"      : item._id,
                        //     "image"   : item.image_name,
                        //     "desc"    : i.monument_language_description,
                        //     "mon_id"  : item.monument_city_id,
                        //     "name"    : item.monument_name,
                        //     "title"   : i.monument_language_title,
                        //     "lang"    : i.monument_language_id
                        // }
                        let monObj = new monV2 (
                            item._id,
                            item.image_name,
                            i.monument_language_description,
                            item.monument_name,
                            i.monument_language_title
                        )
                        monumentArray.push(monObj);
                    }
                }
            };
            var obj = {
                id: item._id,
                name: item.state_name,
                language:req.body.langId,
                monument: monumentArray
            }; 
            resForSent.push(obj);
        }
        responseToDeliver.state = resForSent;
        res.json(responseToDeliver);
    });
}
    