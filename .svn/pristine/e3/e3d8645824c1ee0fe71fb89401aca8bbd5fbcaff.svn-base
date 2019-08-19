const UtilFunction = require("../constants/UtilFunction");

const podcast      = require('../models/podcast-model');
const podCastLang  = require("../models/podcast-lang-model");
const podChat      = require("../models/podcast-chat-model");

const mongoose     = require('mongoose');

exports.getPodcastData = async function(req  , res ){
    let validatingField = validateFields(req.body);
    var responseToDeliver    = new Object();
    if(!validatingField.error){
        var _data = await podcast.find({podcast_monument_id: mongoose.Types.ObjectId(req.body.monId)});
            if(_data.length){
                responseToDeliver.status = UtilFunction.getStatusObject("Data available" , 200 , false);
                let _temp = new podcast().filterData(_data);
                responseToDeliver.podcast = _temp; 
                responseToDeliver.audioDetail =  await loadPodcastAudio(_temp , req.body.langId);
                responseToDeliver.chat        =  await loadPodcastChat(_temp , req.body.langId);
                res.json(responseToDeliver);
            }else{
                responseToDeliver.status = UtilFunction.getStatusObject("No Data Available" , 200 , true);
                res.json(responseToDeliver);
            }
    }else{
        responseToDeliver.status = UtilFunction.getStatusObject(validatingField.msg, 204 , true);
        res.json(responseToDeliver);
    }
}

async function loadPodcastAudio(data , langId){
    var pod_audio;
    var data = await podCastLang.find({podcast_id: mongoose.Types.ObjectId(data[0].podcast_id) ,
        podcast_language: mongoose.Types.ObjectId(langId)});
    pod_audio = new podCastLang().filterData(data);
    return pod_audio; 
}

async function loadPodcastChat(data , langId){
    var pod_chat ;
    var data = await podChat.find({chat_podcast_id: mongoose.Types.ObjectId(data[0].podcast_id) ,
        chat_language: mongoose.Types.ObjectId(langId)});
        // pod_chat = await new podChat().filterData(data);
        pod_chat = await filterPodChat(data);
         //console.log("data" , pod_chat);
        return pod_chat; 
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


// added after bug
async function filterPodChat(obj){
    let _parseObj = JSON.parse(JSON.stringify(obj)); 
    let _temp = []
    for(let item of _parseObj){ 
        var obj = {
            id       : item._id,
            question : item.chat_question,
            answer   : item.chat_answer,
            images   : []
        }
        if(item.chat_image_1){
            obj.images.push(App.imageStaging+item.chat_image_1);
        }if(item.chat_image_2){
            obj.images.push(App.imageStaging+item.chat_image_2);
        }if(item.chat_image_3){
            obj.images.push(App.imageStaging+item.chat_image_3);
        }
        _temp.push(obj);
    }
    return _temp;
}