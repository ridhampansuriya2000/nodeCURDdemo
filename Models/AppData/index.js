const mongoose = require('mongoose');

const post_schema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: [4, 'Name is too short!'],
        maxLength: 15
    },
    email: {
        type: String,
        required: [true, 'What is your Email?'],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },              
    productName:{
        type:String,
        required: [true, 'What is your Product Name?'],
    },
    mobileNumber:{
        type: Number,
        required: [true, 'What is your contact number?'],
        min: [10, 'Phone number should contain at least ten digits!']
    },
    isAdmin: {
        type: Boolean,
        required: [true, "if you are Admin Please Select"],
        default: false,
    },
   
}, { strict: false });

module.exports = mongoose.model('Post', post_schema);