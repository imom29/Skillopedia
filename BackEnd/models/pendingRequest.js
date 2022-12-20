const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const pendingRequestSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: [true, 'First Name is Required.'],
        maxlength: [20, 'Can not be longer than 20 chars']
    },
    lastname:{
        type: String,
        required: [true, 'Last Name is Required.'],
        maxlength: [20, 'Can not be longer than 20 chars']
    },
    email:{
        type: String,
        required: [true, 'Please Enter email'],
        match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Please use Valid Email'],
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: [6, 'Password should be atleast 6 chars'],
        select: false
    },
    experience: Number,
    Role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    },
    CurrentProject:{
        type: String, 
        maxlength: [50, 'Can not be longer than 50 chars']
    },
    skills:{
        type: Array,
        default: []
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type: Date,
        default: Date.now
    }
});

pendingRequestSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

pendingRequestSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id : this._id}, process.env.JWTSECRET)
}

module.exports = mongoose.model('PR', pendingRequestSchema)

