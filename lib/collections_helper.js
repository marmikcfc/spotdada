updateLastModifiedForProduct = function (productId) {
    "use strict";
    Products.update({_id: productId}, {$set: {lastModified: new Date()}});
};