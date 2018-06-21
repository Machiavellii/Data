const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema 
const UserSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

 module.exports = User = mongoose.model('User', UserSchema);
