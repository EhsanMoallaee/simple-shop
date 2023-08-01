function deleteNullsFromObjects(obj = {}, blackListFields = []) {
    let nullishData = ["", " ", "0", 0, null, undefined, 'undefined']
    Object.keys(obj).forEach(key => {
        if (blackListFields.includes(key)) delete obj[key]
        if (typeof obj[key] == "string") obj[key] = obj[key].trim();
        if (Array.isArray(obj[key]) && obj[key].length > 0) obj[key] = obj[key].map(item => item.trim())
        if (Array.isArray(obj[key]) && obj[key].length == 0) delete obj[key]
        if (nullishData.includes(obj[key])) delete obj[key];
    })
}

module.exports = {
    deleteNullsFromObjects,
}