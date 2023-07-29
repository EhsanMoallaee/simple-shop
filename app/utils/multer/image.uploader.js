const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createAddress(req) {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'blogs', year, month, day);
    fs.mkdirSync(directory, {recursive: true});
    const imagePath = path.join('uploads', 'blogs', year, month, day);
    req.filePath = imagePath.replace(/\\/g, '/');
    return directory;
}

function fileFilter(req, file, cb) {
    if (
        file.mimetype === 'image/webp' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif' ||
        file.mimetype === 'image/svg'
    ){            
        cb(null, true);
    } else {
        return cb ("WrongImageFileFormat", false);
    }    
}
let imagesArray = [];
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file?.fieldname){
            const filePath = createAddress(req);
            return cb(null, filePath);
        }else {
            return cb(null, '');
        }
    },
    filename: (req, file, cb) => {
        if(file?.originalname) {
            let originalname = file.originalname.replace(/[^A-Za-z0-9.]/g, "-");
            const filename = "img" + Date.now() + "-" + originalname;            
            imagesArray.push(req.filePath + '/' + filename);
            req.images = imagesArray;
            return cb(null, filename);
        }
        cb(null, null);
    }
});

const maxFileSize = 1 * 1024 * 1024;
const imageUploader = multer({
    storage,
    limits: {fileSize : maxFileSize},
    fileFilter
});

module.exports = {
    imageUploader,
}