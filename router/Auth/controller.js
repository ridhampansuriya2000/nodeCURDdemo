const bcrypt = require('bcrypt');

const {loginBodySchema, sighupBodySchema ,updateBodySchema} = require('./bodySchema.js');
const {schemaErrorResponse} = require("../../Utiles/index.js");
const {User, Password, Token} = require("../../Models/index");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require("firebase/storage");

//Initialize a firebase application
const firebaseConfig = {
    apiKey: "AIzaSyBfvaIyztjGclk2ZlbHp4wasPP8JsMtpqI",
    authDomain: "application-management-image.firebaseapp.com",
    projectId: "application-management-image",
    databaseURL: "gs://application-management-image.appspot.com/",
    storageBucket: "application-management-image.appspot.com",
    messagingSenderId: "583186316885",
    appId: "1:583186316885:web:727d238efdbdd5ea279edc",
    measurementId: "G-7VT2891CFS"
};
initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

const login = async (request, response) => {
    try {
        const {value, error} = loginBodySchema.validate(request.body);
        if (error)
            return schemaErrorResponse({response, error});

        const user = await User.findOne({email : value.email});
        if (!user)
            return response.status(400).json({message: `User with email ${value.email} does not exist`});

        await user.matchPassword({password : value.password});

        const token = await user.generateAuthToken();

        return response.status(200).json({message: "Login successful", token, user});

    } catch (error) {
        response.status(400).send({error : error.message});
    }
};

const signup = async (request, response) => {
    try {
        const {value, error} = sighupBodySchema.validate(request.body, {abortEarly: false});
        if (error)
            return schemaErrorResponse({response, error});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(value.password, salt);

        const userIsExist = await User.checkIsExist({email : value.email});
        if(userIsExist)
            return response.status(400).json({message: `User with email '${value.email}' is already exist`});

        const user = await User.create({
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
        });

        await Password.create({
            password: hashPassword,
            userId: user._id,
        });

        response.status(200).send({message: "User created successfully"});
    } catch (error) {
        response.status(400).send({error : error.message});
    }
};

const logout = async (request, response) => {
    try {
        const tokenObj = await Token.findOne({userId : request.user._id, accessToken: request.user.token.accessToken});
        await tokenObj.revoke();
        response.status(200).send({message: "Logout successful"});
    } catch (error) {
        response.status(400).send({error : error.message});
    }
};

const userMe = async (request, response) => {
    try {
        const userObj = await User.findOne({_id : request.user._id});

        return response.status(200).send({ user :userObj, token :request.user.token.accessToken});

    } catch (error) {
        response.status(400).send({error : error.message});
    }
};

const updateUser = async (req,res) =>{
    try{
        const {value, error} = updateBodySchema.validate(req.body, {abortEarly: false});
        if (error){
            return schemaErrorResponse({error : error, response : res});
        }
        const userObj = await User.findOne({_id : req.user._id});
        let nerObj = {};
        if (req.fileValidationError) {
            return res.status(400).json({ error: req.fileValidationError });
        }else if(req.file){
            if(userObj?.imgId){
                const fileRef = ref(storage, 'files/' + userObj?.imgId); // Assuming imgID contains the ID of the file you want to delete

                deleteObject(fileRef)
                    .then(() => {
                        console.log('File deleted successfully.');
                    })
                    .catch((error) => {
                        console.log('Error deleting file:',error);
                        // res.status(500).send({'Error deleting file:' : error});
                    });
            }

            const dateTime = giveCurrentDateTime();
            const storageRef = ref(storage, `files/${req.file.originalname + `${req.user._id}` + dateTime}`);
            // Create file metadata including the content type
            const metadata = {
                contentType: req.file.mimetype,
            };
            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            const imgID = snapshot.metadata.name;
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);
            nerObj = { imgURL : downloadURL, imgId : imgID};
        }
        if(req.body) nerObj = {...nerObj, ...req.body}
        const newUserObj = await User.findByIdAndUpdate({_id : req.user._id}, nerObj, {new : true, runValidators: true } ).then(updatedDocument => {
            console.log("newUserObj",newUserObj);
            res.status(200).send({data : newUserObj });
        })
            .catch(error => {
                res.status(500).send({error : error.message });
            });;;

    }catch (e) {
        console.log("error in upload Image",e);
        res.status(500).send({error : e });
    }
}

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

module.exports = {
    login,
    logout,
    signup,
    userMe,
    updateUser
}