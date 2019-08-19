const  mongoose = require('mongoose');
const Schema    = mongoose.Schema;

var LoginSchema = new Schema({
    email: String,
    password: String
},{collection: 'user_management'});

LoginSchema.methods.findNumber = function findNumber(n){
    return this.model('Login').findOne({email:n} , (err , login) => {
        console.log(JSON.parse(JSON.stringify(login)).email);
    });
}

module.exports = mongoose.model('Login' , LoginSchema);

