const markerSchema = require("../models/markersSchema");
const Utilfunction = require("../constants/UtilFunction");
const Chapter      = require("../models/chapter");
const mongoose     = require('mongoose');

exports.getMarkers = function(req , res) {
    var responseToDeliver = new Object();
    if(!req.body.monId){
        responseToDeliver.status = Utilfunction.getStatusObject('Please provide Monument Id', 204 , true);
        res.json(responseToDeliver);
    }else{
        responseToDeliver.status = Utilfunction.getStatusObject('Data Available', 200 , false);
        markerSchema.find({lat_long_location_monument_id:mongoose.Types.ObjectId(req.body.monId) , lat_long_location_active:1} , async (error , data) => {
            var _temp = JSON.parse(JSON.stringify(data));
            var markers        = new Array();
            for(let item of _temp){
                let obj = {id: item._id , order: item.lat_long_location_order , lat : item.lat_long_location_latitude , long: item.lat_long_location_longitude};
                markers.push(obj);
            }
            responseToDeliver.monument_markers = markers;
            // console.log(getChapterMarkers());
            let d = await getChapterMarkers();
            responseToDeliver.chapter_markers = d
            res.json(responseToDeliver);
        });
    }
}

function getChapterMarkers(){
    var chapterMarkers = new Array();
    Chapter.find({} , async (error , data) => {
        let _temp = JSON.parse(JSON.stringify(data));
        for(let item of _temp){ console.log("1");
            let obj = {id: item._id , lat: item.chapter_latitude , long : item.chapter_longitude};
            chapterMarkers.push(obj);
        }
        console.log("total" , chapterMarkers);
        return chapterMarkers;
    });
}