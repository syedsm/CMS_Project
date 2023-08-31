const mongoose = require('mongoose')

const regschema = mongoose.Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    mobile: Number,
    desc:String,
    img: {type:String,default:'user.png'},
    role:{type:String,default:'public'}
    //more feilds are pending ,making more creation form in this table //coming soon
})

module.exports = mongoose.model('reg', regschema)