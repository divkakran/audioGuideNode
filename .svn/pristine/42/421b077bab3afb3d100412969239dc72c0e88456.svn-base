const  mongoose = require('mongoose');
const Schema    = mongoose.Schema;

var Chapter = new Schema({
    email: String,
    password: String
},{collection: 'chapter_managements'});


Chapter.methods.getChapterObject = function(obj){
    let _parseObj = JSON.parse(JSON.stringify(obj));
    let _temp = []
    for(let item of _parseObj){
        let obj = {
            chapterName: item.chapter_name , 
            audio_duration: item.chapter_audio_file_duration ,
            chapterAudio: App.imageStaging+item.chapter_audio_name , 
            chapterImage:App.imageStaging+item.chapter_image_name , 
            chapterDesc: item.chapter_description ,
            id:item._id ,
            mon_id : item.chapter_monument_id
        };
        if(!item.chapter_audio_file_duration){
            obj.audio_duration = 0;
        }
        _temp.push(obj);
    }
    return _temp;
}

module.exports = mongoose.model('Chapter' , Chapter);