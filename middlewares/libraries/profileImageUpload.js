const multer = require('multer');
const path = require('path');
const CustomError = require('../../helpers/error/CustomError');

// Storage, FileFilter

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, '/public/uploads'));
    },
    filename: function(req, file,  cb){
        const extension = file.mimetype.split('/')[1]; //image/png
        req.savedProfileImage = 'image_' + req.user.id + '.' +extension;
        cb(null, req.savedProfileImage);
    }
});

const fileFilter = function(req, file, cb){
    let allowedMimeTypes = ['image/jpg', 'image/gif', 'image/jpeg', 'image/png'];

    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new CustomError('Sadece jpg, gif, jpeg ya da png uzantılı dosya gönderebilirsiniz', 400), false);
    }

    return cb(null, true);
}

const profileImageUpload = multer({storage, fileFilter});

module.exports = profileImageUpload;