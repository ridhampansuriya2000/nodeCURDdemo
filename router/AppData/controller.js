const AppData = require("../../Models/AppData");
const gplay = require('google-play-scraper');
var store = require('google-play-scraper'); // regular non caching version
var memoized = require('google-play-scraper').memoized(); // cache with default options
var memoizedCustom = require('google-play-scraper').memoized({ maxAge: 1000 * 60 }); // cache with customized options

exports.getAppData = async (req, res) => {
    try{
        const _id = req.params._id
        let appDetails = await AppData.findById({_id});
        res.send(appDetails || {});
    }catch (e) {
        res.status(500).send();
    }
};

exports.getAppsData = async (req, res) => {
    try{
        const createdBy = req.params.createdBy
        const posts = await AppData.find({createdBy});
        res.send(posts || {});
    }catch (e) {
        res.status(500).send(e);
    }
};

exports.addAppData = async (req, res) => {
    try{
        const result = await AppData.create(req.body);
        if(result){
            res.send(result);
        }
    }catch (e) {
        res.status(500).send(e);
    }
};

exports.updateData = async (req, res) => {
    try{
        id = req.params.id
        const updateUser = await AppData.findByIdAndUpdate({_id : id}, req.body,{new : true});
        if(updateUser){
            res.status(200).send(updateUser);
        }
    }catch (e) {
        res.status(500).send(e);
    }
};

exports.deleteAppData = async (req, res) => {
    try{
        let _id = req.params.id;
        const updateUser = await AppData.findByIdAndDelete({_id});
        if(updateUser){
            res.status(200).send(updateUser);
        }
    }catch (e) {
        res.status(500).send(e);
    }
};

exports.getPlayStoreAppData = async (req, res) => {
    try{
        // const _id = req.params._id
        // let appDetails = await AppData.findById({_id});

        /*gplay.app({appId: 'com.tencent.cosna'})*/
        gplay.app({appId: 'credit.card.apply.online.guide'})
        /* gplay.list({
             category: gplay.category.GAME_ACTION,
             collection: gplay.collection.TOP_FREE,
             num: 10
         })*/
        /*gplay.search({
            term: "Gallery",
            num: 2,
            fullDetail: true,
            price: 'free'
        })*/
        /*await gplay.developer({devId: "IQ Techno Leps"})*/
        /* gplay.suggest({term: 'panda'})*/
        /*gplay.reviews({
            appId: 'com.mojang.minecraftpe',
            sort: gplay.sort.RATING, /!*sort.RATING and sort.HELPFULNESS*!/
            num: 3000,
            paginate: true,
            nextPaginationToken: 'CnUKcxJxCm8IABJrMCwxMDAwMDAwLjYzOTg3MjQzMTgsNzM4MDAwOTc1NDksImh0dHA6Ly9tYXJrZXQuYW5kcm9pZC5jb20vZGV0YWlscz9pZD12Mjpjb20ubW9qYW5nLm1pbmVjcmFmdHBlOjEiLDQsZmFsc2U',
        })*/
        // gplay.similar({appId: "com.dxco.pandavszombies", fullDetail : true})
        /*gplay.permissions({appId: "com.dxco.pandavszombies"})*/
        /*gplay.datasafety({appId: "com.dxco.pandavszombies"})*/
        /*gplay.categories()*/

        /*// first call will hit google play and cache the results
        memoized.developer({devId: "DxCo Games"})
        // second call will return cached results
        memoized.developer({devId: "DxCo Games"})*/
        /*gplay.search({term: 'panda', throttle: 10})*/
            .then((resp)=>{
                console.log("response",res);
                res.send(resp || {});
            })
        // .catch((e)=>{
        //     console.log("error in catch of getPlayStoreAppData",e);
        // });
    }catch (e) {
        console.log("error in getPlayStoreAppData",e);
        res.status(500).send(e);
    }
};

const play_app_info = require('playstore-app-info');
exports.getPlayStoreAppData2 = async (req, res) => {
    try{
        // const _id = req.params._id
        // let appDetails = await AppData.findById({_id});

        play_app_info("com.kakarooms")
            .then((resp)=>{
                console.log("response",res);
                res.send(resp || {});
            })
        // .catch((e)=>{
        //     console.log("error in catch of getPlayStoreAppData",e);
        // });
    }catch (e) {
        console.log("error in getPlayStoreAppData",e);
        res.status(500).send(e);
    }
};