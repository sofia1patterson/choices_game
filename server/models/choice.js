const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
    totalCount: { type : Number, default: 0},
    countOne: { type : Number, default: 0},
    countTwo: { type : Number, default: 0}
}, {timestamps: true});

const messageSchema = new mongoose.Schema({
    name: String,
    message: String
}, {timestamps: true});

const choiceSchema = new mongoose.Schema({
    imageOne: {type: String, required: true},
    choiceOne: {type: String, required: true},
    imageTwo: {type: String, required: true},
    choiceTwo: {type: String, required: true},
    question: {type: String, required: true}
}) 

const Count = mongoose.model('counts', countSchema);
const Message = mongoose.model('messages', messageSchema);
const Choice = mongoose.model('choices', choiceSchema);
mongoose.Promise = global.Promise;