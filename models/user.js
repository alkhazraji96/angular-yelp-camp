const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, select: false },
  avatarId: { type: String },
  avatarURL: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  bio: { type: String },
  slug: { type: String, unique: true }
})

UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10)
      return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    this.slug = await generateUniqueSlug(this._id, this.username)
    next()
  } catch (err) { return }

})

UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)
module.exports = User

async function generateUniqueSlug(id, userUsername, slug) {
  try {
    // generate the initial slug
    if (!slug) {
      slug = slugify(userUsername);
    }
    // check if a user with the slug already exists
    var user = await User.findOne({ slug: slug });
    // check if a user was found or if the found user is the current user
    if (!user || user._id.equals(id)) {
      return slug;
    }
    // if not unique, generate a new slug
    var newSlug = slugify(userUsername);
    // check again by calling the function recursively
    return await generateUniqueSlug(id, userUsername, newSlug);
  } catch (err) {
    throw new Error(err);
  }
}


function slugify(text) {
  var slug = text.toString().toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '')          // Trim - from end of text
    .substring(0, 75);           // Trim at 75 characters
  return slug + "-" + Math.floor(1000 + Math.random() * 9000);  // Add 4 random digits to improve uniqueness
}