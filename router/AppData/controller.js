const AppData = require("../../Models/AppData");

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
             res.json({ data: result, status: "success" });
    }catch (e) {
        res.status(500).send(e);
    }
};

exports.updateData = async (req, res) => {
    try{
        id = req.params.id
        const updateUser = await AppData.findByIdAndUpdate({_id : id}, req.body,{new : false});
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