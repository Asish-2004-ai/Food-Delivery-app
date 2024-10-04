import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    auth0Id:{type:String, require:true},
    email:{type:String,require:true},
    name:{type:String},
    address:{type:String},
    city:{type:String},
    country:{type:String}
});

const User = mongoose.model("user",userSchema);
export default User;        