const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

var PodcastLang    = new Schema({
    podcast_language_audio_name: String,
    podcast_audio_file_duration: String,
    podcast_language_description: String,
},{collection: 'podcast_language_managements'});

PodcastLang.methods.filterData = function(obj){
    let _parseObj = JSON.parse(JSON.stringify(obj)); 
    for(let item of _parseObj){ 
        var obj = {
            podcast_audio : App.imageStaging+item.podcast_language_audio_name,
            podcast_audio_duration: item.podcast_audio_file_duration,
            podcast_description: item.podcast_language_description,
        }
        return obj;
    }
    // return _temp;
}

module.exports = mongoose.model('PodcastLang' , PodcastLang);