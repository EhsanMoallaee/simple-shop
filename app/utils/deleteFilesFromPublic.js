const fs = require('fs');
const path = require('path');

function deleteFilesFromPublic(files) {
    if(files && !Array.isArray(files)) files = [files]
    if(files && files.length > 0) {
        files.map(file => {
            const filePath = path.join(__dirname, '..', '..', 'public', file);
            console.log('This file removed from server : => ', filePath);
            if(fs.existsSync(filePath)) fs.unlinkSync(filePath);
        })
    }
}
module.exports = {
    deleteFilesFromPublic,
}