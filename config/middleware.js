var middlewareObj = {}

middlewareObj.storage = {
    filename: function (req, file, cb) {        
        cb(null, file.fieldname + '_' + Date.now())
    }
}

middlewareObj.imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

middlewareObj.opts = {
    cloud_name: 'alkhz',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}

module.exports = middlewareObj