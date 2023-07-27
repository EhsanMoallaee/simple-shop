const fs = require('fs');
const path = require('path');

function deleteFileFromPublic(fileAddress) {
    if(fileAddress) {
        const filePath = path.join(__dirname, '..', '..', fileAddress);
        if(fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
}
module.exports = {
    deleteFileFromPublic,
}