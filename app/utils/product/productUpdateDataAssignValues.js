function productUpdateDataAssignValues(data, product) {
    const productUpdateData = {
        $set: {
            title: data.title ? data.title : product.title,
            brief_text: data.brief_text ? data.brief_text : product.brief_text,
            text: data.text ? data.text : product.text,
            tags: data.tags ? data.tags : product.tags,
            category: data.category ? data.category : product.category,
            price: data.price ? data.price : product.price,
            discount: data.discount ? data.discount : product.discount,
            count: data.count ? data.count : product.count,
            type: data.type ? data.type : product.type,
            format: data.format ? data.format : product.format,
            supplier: data.supplier ? data.supplier : product.supplier,
            image: data.image ? data.image : product.image,
            gallery_images: data.gallery_images ? data.gallery_images : product.gallery_images,
            features: {
                length: data.length ? data.length : product.length,
                height: data.height ? data.height : product.height,
                width: data.width ? data.width : product.width,
                weight: data.weight ? data.weight : product.weight,
                colors: data.colors ? data.colors : product.colors,
                made_in: data.made_in ? data.made_in : product.made_in
            }
        }
    }
    return productUpdateData;
}

module.exports = {
    productUpdateDataAssignValues
}