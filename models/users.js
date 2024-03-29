const mongoose = require('mongoose');

const multer = require('multer');
//where the file will be stored
const path = require('path');
//which path (path name)
const AVATAR_PATH = path.join('/uploads/users/avatars');


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    avatar:{
        type:String
    },
    chatMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chatMessage' 
    },
    friendship:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Friend'
        }
    ]
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname, '..' , AVATAR_PATH));
    },

    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
}); 

//static methods
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;