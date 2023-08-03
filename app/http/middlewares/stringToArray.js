const stringToArray = (...args) => {
    return function(req, res, next) {
        const fields = args;
        fields.forEach(field => {
            if (req.body[field]) {
                if(typeof (req.body[field]) == 'string') {
                    if(req.body[field].indexOf('#') >= 0) {
                        const arr = []
                        (req.body[field].split('#')).map(item => {
                            if(item?.trim().length > 0) {
                                arr.push(item.trim());
                            }
                        });
                        req.body[field] = arr;
                    } else if(req.body[field].indexOf(',') >= 0) {
                        const arr = [];
                        (req.body[field].split(',')).map(item => {
                            if(item?.trim().length > 0) {
                                arr.push(item.trim());
                            }
                        });
                        req.body[field] = arr;
                    } else {
                        req.body[field] = [ req.body[field] ];
                    }
                } else if(Array.isArray(req.body[field])) {
                    req.body[field].map(item => item.trim());
                }
                req.body[field] = [... new Set(req.body[field])];
            } else {
                req.body[field] = [];
            }
        })
        next()
    }
}

module.exports = {
    stringToArray
}