const stringToArray = (field) => {
    return function(req, res, next) {
        if (req.body?.[field]) {
            if(typeof (req.body[field]) == 'string') {
                if(req.body[field].indexOf('#') >= 0) {
                    req.body[field] = (req.body[field].split('#')).forEach(item => {if(item?.trim().length > 0) return item.trim() })
                }
            } else if(((req.body[field]).constructor()).toString().toLowercasw().indexOf('array') >= 0) {
                req.body[field].map(item => item.trim());
            }
        } else {
            req.body[field] = [];
        }
        next();
    }
}

module.exports = {
    stringToArray
}