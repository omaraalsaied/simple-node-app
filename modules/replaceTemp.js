module.exports = (temp, product) => {
    
    // using regexp for placeholders with /g flag "global" to replace all instances of that placeholder 
    let output = temp.replace(/{%product_name%}/g, product.productName);
    output = output.replace(/{%product_image%}/g, product.image);
    output = output.replace(/{%product_from%}/g, product.from);
    output = output.replace(/{%product_nuitritons%}/g, product.nutrients);
    output = output.replace(/{%product_price%}/g, product.price);
    output = output.replace(/{%product_quantity%}/g, product.quantity);
    output = output.replace(/{%product_desc%}/g, product.description);
    output = output.replace(/{%product_id%}/g, product.id);
    if (!product.organic) output = output.replace(/{%not_organic%}/g, 'not-organic');
    return output;
}
