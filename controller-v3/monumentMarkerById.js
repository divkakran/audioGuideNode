const markerSchema = require("../models/markersSchema");
const Utilfunction = require("../constants/UtilFunction");
const Chapter      = require("../models/chapter");
const mongoose     = require('mongoose');
const Language      = require('../models/language');

exports.getMarkers = async function(req , res) {
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
    var responseToDeliver = new Object();
    if(!req.body.monId){
        responseToDeliver.status = Utilfunction.getStatusObject('Please provide Monument Id', 204 , true);
        res.json(responseToDeliver);
    }else{
        responseToDeliver.status = Utilfunction.getStatusObject('Data Available', 200 , false);
        markerSchema.find({lat_long_location_monument_id:mongoose.Types.ObjectId(req.body.monId) , lat_long_location_active:1} , async (error , data) => {
            var _temp    = JSON.parse(JSON.stringify(data));
            var markers  = new Array();
            for(let item of _temp){
                let obj = {id: req.body.monId , order: item.lat_long_location_order , lat : item.lat_long_location_latitude , lon: item.lat_long_location_longitude};
                markers.push(obj);
            }
            responseToDeliver.monument_boundary = markers;
            let responseChapterMarkers = await getChapterMarkers(req.body.monId , defaultLangId);
            responseToDeliver.chapter_markers = responseChapterMarkers;
            res.json(responseToDeliver);
        });
    }
}

async function getChapterMarkers(monId , langId){
    var chapterMarkers = [];
    await Chapter.find({chapter_language: mongoose.Types.ObjectId(langId)} , function (error , data) {
        let _temp = JSON.parse(JSON.stringify(data));
        for(let item of _temp){ 
            if(!item.chapter_latitude){
                item.chapter_latitude = "";
            }
            if(!item.chapter_longitude){
                item.chapter_longitude = "";
            }
            let obj = {mon_id:monId , id: item._id ,  name:item.chapter_name , lat: item.chapter_latitude , lon : item.chapter_longitude};
            chapterMarkers.push(obj);
        }
    });
    return chapterMarkers;
}