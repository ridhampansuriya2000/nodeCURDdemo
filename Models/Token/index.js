const {Schema, model} = require("mongoose");

const revoke = async function () {
    const {modifiedCount} = await Token.updateOne({_id : this._id, status: "ACTIVE"}, {status: "REVOKED"});
    if (!modifiedCount)
        throw new Error("Invalid token provided");
};

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    accessToken: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum : ['ACTIVE', 'EXPIRED', 'REVOKED'],
    }
},{
    timestamps: true,
    methods: {
        revoke,
    },
});

const Token = model("Token", tokenSchema);

module.exports = {
    Token
};