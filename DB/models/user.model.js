import bcryptjs from "bcryptjs";
import { Schema, Types, model } from "mongoose";



const userSchema = new Schema({
    userName: {
        type: String, trim: true, require: true, maxLength: 20, minLength: 4
    },
    email: {
        type: String, trim: true, require: true, maxLength: 30, minLength: 4, unique: true
    },
    password: {
        type: String, trim: true, require: true, maxLength: 25, minLength: 4
    },
    role: { type: String, enum: ['User', 'Admin'] },
    gender: { type: String, enum: ['Male', 'Female', 'Not Selected'], default: "Not Selected" },
    phone: { type: String },
    addresses: [{
        type: String, trim: true, require: true, maxLength: 20, minLength: 4
    }],
    age: {
        type: Number, max: 99, min: 12
    },
    fav_cats: [{
        type: Types.ObjectId, ref: "category"
    }],
    image: [{ public_id: String, secure_url: String }],
    whish_list: {
        type: Types.ObjectId, ref: "Book"
    },
    confirmedEmail: {
        type: Boolean, default: false
    },
    virefyCode: String


}, { timestamps: true, v: false })

userSchema.pre(["save", /^update/, /^create/], async function () {
    const defultRound = parseInt(process.env.SALT_ROUNDS)
    if (this.password && bcryptjs.getRounds(this.password) != defultRound) {
        this.password = bcryptjs.hashSync(this.password, parseInt(process.env.SALT_ROUNDS))
    }
})

const UserModel = model("User", userSchema)

export default UserModel