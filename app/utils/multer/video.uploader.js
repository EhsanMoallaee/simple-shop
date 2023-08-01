const multer = require('multer');
const path = require("path");
const fs = require("fs");

function createAddress(req) {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'video', year, month, day);
    fs.mkdirSync(directory, {recursive: true});
    const videoPath = path.join('uploads', 'video', year, month, day);
    req.filePath = videoPath.replace(/\\/g, '/');
    return directory;
}

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "video/mpeg" ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'video/wmv'
    ){            
        cb(null, true);            
    } else {
        req.fileValidationError = "میباشند wmv , mp4 , mpeg  فرمت های مجاز برای آپلود ویدئو";
        cb(null, false);
        return cb (new Error(req.fileValidationError));
    }
};  

const videoStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        if(file?.fieldname){
            const filePath = createAddress(req);
            return cb(null, filePath);
        }else {
            return cb(null, '');
        }
    },
    filename: async function(req, file, cb) {
        let originalname = file.originalname.replace(/[^A-Za-z0-9.]/g, "-");
        const filename =   "video" + Date.now() + "-" + originalname;
        req.video = req.filePath + '/' + filename;
        cb(null, filename)
    },
});

const videoUploader = multer({
    storage: videoStorage,
    fileFilter
})
module.exports = {
    videoUploader
}