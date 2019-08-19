const  mongoose = require('mongoose');
const Schema    = mongoose.Schema;

var CityLanguage = new Schema({
    id: String,
    name: String
},{collection: 'city_language_managements'});

module.exports = mongoose.model('CityLanguage' , CityLanguage);
