const mongoose = require('mongoose');

const post_schema = mongoose.Schema({
    createdBy  : mongoose.Schema.ObjectId
    // STATUS : String,
    // MSG:{
    //     type : String,
    //     // required : true
    // },
    // APP_SETTINGS : Object,
    // PLACEMENT : Object,
    // Advertise_List : Object,
    // MORE_APP_SPLASH : Object,
    // MORE_APP_EXIT : Object,
    // EXTRA_DATA : String,
},{ strict: false });

module.exports = mongoose.model('Post',post_schema);