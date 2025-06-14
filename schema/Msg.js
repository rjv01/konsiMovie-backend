const mongoose = require('mongoose');

const Msg = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    sendMsgAt:{
        type:Date,
        default:Date.now
    },
},{timestamps:true});


const UserMessage = mongoose.model('UserMessage',Msg);
console.log('UserMessage is working');

module.exports = UserMessage;