const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

var Podcast    = new Schema({

},{collection: 'podcast_managements'});

Podcast.methods.filterData = function(obj){
    let _parseObj = JSON.parse(JSON.stringify(obj)); 
    let _temp = [];
    for(let item of _parseObj){ 
        var obj = {
            podcast_name : item.podcast_name,
            podcast_id   : item._id,
            // images: []
        }
        // if(item.podcast_image_1){
        //     obj.images.push(item.podcast_image_1)
        // }if(item.podcast_image_2){
        //     obj.images.push(item.podcast_image_2)
        // }if(item.podcast_image_3){
        //     obj.images.push(item.podcast_image_3)
        // }if(item.podcast_image_4){
        //     obj.images.push(item.podcast_image_4)
        // }if(item.podcast_image_5){
        //     obj.images.push(item.podcast_image_5)
        // }
        _temp.push(obj);
    }
    return _temp;
}

module.exports = mongoose.model('Podcast' , Podcast);