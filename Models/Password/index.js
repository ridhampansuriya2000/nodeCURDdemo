const {Schema, model} = require("mongoose");

const passwordSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum : ['ACTIVE', 'CHANGED', 'FORGOTTEN'],
    }
},{
    timestamps: true
});

const Password = model("Password", passwordSchema);

module.exports = {
    Password
};