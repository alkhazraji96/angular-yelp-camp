const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, select: false },
    avatar: { type: String },
    bio: { type: String}
})

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)