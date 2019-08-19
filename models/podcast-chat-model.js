const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

var PodcastChat    = new Schema({
},{collection: 'chat_managements'});

PodcastChat.methods.filterData = function(obj){
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

module.exports = mongoose.model('PodcastChat' , PodcastChat);