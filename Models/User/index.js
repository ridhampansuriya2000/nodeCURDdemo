const {model, Schema} = require("mongoose");
const jwt = require("jsonwebtoken");
const {Token} = require("../Token/index.js");
const {Password} = require("../Password/index.js");
const bcrypt = require("bcrypt");

const generateAuthToken = async function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY);
    await Token.create({
        userId: this._id,
        accessToken: token,
    });
    return token;
};

const matchPassword = async function ({password}) {
    const passwordObj = await Password.findOne({userId : this._id, status : "ACTIVE"})
    if (!passwordObj)
        throw new Error("Password does not set till. Generate a new password though the forgot password");

    if(!await bcrypt.compare(password, passwordObj?.password))
        throw new Error("Enter the valid password");
};

const checkIsExist = async function ({email}) {
    const userObj = await this.findOne({email})
    return !!userObj;
};

const userSchema = new Schema({
    firstName: {
        type: String, required: true, trim: true
    }, lastName: {
        type: String, required: true, trim: true
    }, email: {
        type: String, required: true, unique: true, trim: true,
    },
    imgURL: {
        type: String,
    },
    imgId:{
        type: String,
    },
    phoneNum:{
        type: String, unique: true,
        match: [/\d{10}/, "no should only have digits"],
        minLength: [10, "no should have minimum 10 digits"],
        maxLength: [10, "no should have maximum 10 digits"],
    }
}, {
    timestamps: true,
    methods: {
        generateAuthToken,
        matchPassword
    },
    statics: {
        checkIsExist
    }
});


userSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    const unknownFields = Object.keys(update).filter(
        (field) => !userSchema.paths.hasOwnProperty(field) && field !== '$set' && field !== '$setOnInsert'
    );
    if (unknownFields.length > 0) {
        const error = new Error(`Unknown field found: ${unknownFields.join(', ')}`);
        return next(error);
    }
    next();
});

const User = model("User", userSchema);

module.exports = {
    User
}