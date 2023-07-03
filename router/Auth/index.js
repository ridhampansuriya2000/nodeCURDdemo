const {Router} = require('express');

const {login, signup, logout, userMe ,updateUser} = require('./controller.js')
const {tokenVerify} = require("../../Middleware/index.js")

const authRouter = Router();
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        // Check if the file is an image
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Accept the file
        } else {
            console.log("Only image files are allowed-------------------------------->")
            req.fileValidationError = 'Only image files are allowed';
            cb(null, false); // Reject the file
        }
    }
});

authRouter.route('/login').post(login);
authRouter.route('/signup').post(signup);
authRouter.route('/logout').get( tokenVerify,logout);
authRouter.route('/user/me').get(tokenVerify,userMe);
authRouter.route('/update/profiles').post(tokenVerify, upload.single('image'),updateUser);

module.exports = authRouter;