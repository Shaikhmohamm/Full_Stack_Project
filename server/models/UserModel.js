import mongoose  from "mongoose";

// Schema for users
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "Please provide an email address"],
        unique : true
    },
    password : {
		type: String,
		required: [true, "Please provide a password"],
	},
    bookmarkmovie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }],
    bookmarkseries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tvseries'}],
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User;