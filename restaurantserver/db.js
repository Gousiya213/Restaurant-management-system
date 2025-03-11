import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    username : String,
    email : {type: String, required :true, unique : true},
    password : String,
});
const User = mongoose.model('User', UserSchema);

export default User;