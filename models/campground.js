const mongoose = require('mongoose')

CampgroundSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  imageId: { type: String, required: true },
  imageURL: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  rating: { type: Number, default: 0 },
  slug: { type: String, unique: true }
})

CampgroundSchema.pre('save', async function (next) {
  try {
    // check if a new campground is being saved, or if the campground name is being modified
    if (this.isNew || this.isModified("title")) {
      this.slug = await generateUniqueSlug(this._id, this.title)
    }
    next()
  } catch (err) { next(err) }
})

var Campground = mongoose.model('Campground', CampgroundSchema)
module.exports = Campground

async function generateUniqueSlug(id, campgroundName, slug) {
  try {
    // generate the initial slug
    if (!slug) { slug = slugify(campgroundName) }
    // check if a campground with the slug already exists
    var campground = await Campground.findOne({ slug: slug });
    // check if a campground was found or if the found campground is the current campground
    if (!campground || campground._id.equals(id)) { return slug }
    // if not unique, generate a new slug
    var newSlug = slugify(campgroundName)
    // check again by calling the function recursively
    return await generateUniqueSlug(id, campgroundName, newSlug)
  } catch (err) { throw new Error(err) }
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