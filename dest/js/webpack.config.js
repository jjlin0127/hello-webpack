const path = require('path');

module.exports = {
    entry:{
       cusfruits: [
        './cusfruits/cusfruits.js', 
        './cusfruits/getCusfruits.js',
        './cusfruits/getRecommendation.js',
        './cusfruits/lightbox.js',
        './cusfruits/shopping_cart01.js',
       ],
       vendor: [
        './vendor/all.js',
        './vendor/jquery-3.4.1.js',
        './vendor/jquery-ui.js',
        './vendor/summernote-lite.js.map',
        './vendor/summernote-lite.min.js',
        './vendor/vue.min.js',
        './vendor/wow.min.js',
       ],
    },
    output: {
        path: path.resolve(__dirname, 'dest/js'),
        filename: '[name].js'
    }
}