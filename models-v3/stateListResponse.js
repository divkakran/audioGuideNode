require('../config/app');
function MonumentResV2(id , image , desc , monName , monTitle){
    this.monumentId     = id;
    if(!image){
        this.monumentsImage = '';
    }else{
        this.monumentsImage =  App.imageTesting+image;
    }
    this.monumentDesc   = desc;
    this.monumentName   = monName;
    this.monTitle       = monTitle;
}
module.exports = MonumentResV2