const  mongoose = require('mongoose');
const  Schema    = mongoose.Schema;

var ChapterSynopsis = new Schema({
    email: String,
    password: String
},{collection: 'chapter_managements'});


ChapterSynopsis.methods.getChapterSynopsisObject = function(obj , typeOfDescription){
    let _parseObj = JSON.parse(JSON.stringify(obj)); 
    let _temp = []
    for(let item of _parseObj){
        // if blank detailed else synopsis
        if(typeOfDescription=="synopsis"){
            var obj = {
                chapterName: item.chapter_name , 
                audio_duration: item.chapter_audio_file_duration ,
                chapterAudio: App.imageStaging+item.chapter_audio_name , 
                chapterImage:App.imageStaging+item.chapter_image_name , 
                images: [],
                chapterDesc: item.chapter_description ,
                id:item._id ,
                mon_id : item.chapter_monument_id,
                lat:item.chapter_latitude,
                lng:item.chapter_longitude,
                type: "synopsis"
            };
            if(item.chapter_image_name){
                obj.images.push(App.imageStaging+item.chapter_image_name);
            }if(item.chapter_image_2){
                obj.images.push(App.imageStaging+item.chapter_image_2);
            }if(item.chapter_image_3){
                obj.images.push(App.imageStaging+item.chapter_image_3);
            }if(item.chapter_image_4){
                obj.images.push(App.imageStaging+item.chapter_image_4);
            }if(item.chapter_image_5){
                obj.images.push(App.imageStaging+item.chapter_image_5);
            }
            if(!item.chapter_audio_file_duration){
                obj.audio_duration = 0;
            }
        }else {
            var obj = {
                chapterName: item.chapter_detailed_name , 
                audio_duration: item.chapter_detailed_audio_file_duration ,
                chapterAudio: App.imageStaging+item.chapter_detailed_audio_name , 
                chapterImage:App.imageStaging+item.chapter_detailed_image_name , 
                images: [],
                chapterDesc: item.chapter_detailed_description ,
                id:item._id ,
                mon_id : item.chapter_monument_id,
                lat:item.chapter_latitude,
                lng:item.chapter_longitude,
                type: "description"
            };
            if(item.chapter_detailed_image_name){
                obj.images.push(App.imageStaging+item.chapter_detailed_image_name);
            }if(item.chapter_detailed_image_name2){
                obj.images.push(App.imageStaging+item.chapter_detailed_image_name2);
            }if(item.chapter_detailed_image_name3){
                obj.images.push(App.imageStaging+item.chapter_detailed_image_name3);
            }if(item.chapter_detailed_image_name4){
                obj.images.push(App.imageStaging+item.chapter_detailed_image_name4);
            }if(item.chapter_detailed_image_name5){
                obj.images.push(App.imageStaging+item.chapter_detailed_image_name5);
            }
            if(!item.chapter_detailed_audio_file_duration){
                obj.audio_duration = 0;
            }
        }
        _temp.push(obj);
    }
    return _temp;
}

module.exports = mongoose.model('ChapterSynopsis' , ChapterSynopsis);