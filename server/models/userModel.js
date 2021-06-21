const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        lowercase: true
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        lowercase: true
    },
      email : {
        type : String,
        required : true,
        trim : true,
        unique: true
    },
    password : {
        type : String,
        required : true,
        trim : true,
        unique: true
    },
    createdAt : {
        type: Date,
        default : Date.now
    }
})

// const blogSchema = new Schema({
//   title : {
//       type: String,
//       required : true,
//       trim : true,

//   },
//   body: {
//     type: String,
//     required : true,
//     trim : true,

//   },
//   createdAt : {
//       type : Date,
//       default : Date.now()
//   }
// })

module.exports = User = mongoose.model('Users', UserSchema);



