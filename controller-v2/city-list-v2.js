const CityList     = require('../models/city-list');
const Utilfunction = require("../constants/UtilFunction");

exports.getAllCity = function(req, res){
    CityList.find({city_active: 1} , (error , list) => {
        var responseToDeliver = new Object();
        responseToDeliver.status = Utilfunction.getStatusObject("Data Available" , 200 , false);
        let _temp = JSON.parse(JSON.stringify(list));
        let resp  = [];
        for(let item of _temp){
            let _temp = {id: item._id , cityName: item.city_name};
            resp.push(_temp);
        }
        responseToDeliver.cityList = resp;
        res.json(responseToDeliver);
    });
}