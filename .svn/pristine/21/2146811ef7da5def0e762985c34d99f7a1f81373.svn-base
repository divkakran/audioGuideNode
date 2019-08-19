const express        = require('express');
const cityController = require('../controllers/city-list');
const allCity        = require('../controllers/city-list-v2')
const controller     = require('../controllers');
const controllerv2   = require('../controller-v2');
const controllerv3   = require('../controller-v3');

const controllerv4   = require('../controller-v4');

const router  = express.Router();

const C = require('../models/test');



router.get('/getCityDetails' , cityController.getCityList);
router.get('/cityList'       , allCity.getAllCity);
router.post('/signUp'        , controller.registration.Registration);
router.post('/login'         , controller.loginController.Login);
router.post('/getChapter'    , controller.chapterList.getChapterDetail);

// v-2 routing
router.post('/v-2/getCityDetails'     , controllerv2.cityWithDetail.getCityListV2);
router.post('/v-2/getChapter'         , controllerv2.chapterList.getChapterDetail);
router.get('/v-2/languageList'        , controllerv2.langController.getLanguageList);
router.get('/v-2/getCityList'         , controllerv2.cityList.getAllCity);
router.post('/v-2/getMonumentMarker'  , controllerv2.marker.getMarkers);

// v-3 routing
router.post('/v-3/getStateList' , controllerv3.getStateList.getStateList);
router.post('/v-3/getMonumentMarker' , controllerv3.monMarkerById.getMarkers);

// v-4 routing
router.post('/v-4/getChapter' , controllerv4.getSynopsis.chapterSynopsisController);
router.post('/v-4/getCityDetails' , controllerv4.cityWithDetail.getCityListV2);
router.get('/v-4/languageList'    , controllerv4.langController.getLanguageList);
router.post('/v-4/getCityList'     , controllerv4.cityList.getAllCity);
router.post('/v-4/getMonumentMarker' , controllerv4.marker.getMarkers);
router.post('/v-4/getPodcast' , controllerv4.podcastData.getPodcastData);

// C.find({} , (resssss, r) => {
//     let response=JSON.parse(JSON.stringify(r))
//     let a = new test({username:'dd'})
//     console.log(response[0].city_name);
//     res.json({msg: response[0].city_name});
// }));


module.exports = router;