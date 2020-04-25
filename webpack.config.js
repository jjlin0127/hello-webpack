const path = require('path');

module.exports = {
    entry:{
        app: [
            './dest/js/src/file.js', 
            './dest/js/src/file2.js'
        ],
        cusfruits: [
            './dest/js/src/cusfruits/cusfruits.js',
            './dest/js/src/cusfruits/getCusfruits.js',
            './dest/js/src/cusfruits/getRecommendation.js',
            './dest/js/src/cusfruits/lightbox.js',
            './dest/js/src/cusfruits/shopping_cart01.js'
        ],
        vendor:[
            './dest/js/src/vendor/all.js',
            './dest/js/src/vendor/Chart.js',
            './dest/js/src/vendor/fontawesome-all.js',
            './dest/js/src/vendor/jquery-3.4.1.js',
            './dest/js/src/vendor/jquery-ui.js',
            './dest/js/src/vendor/vue.min.js',
            './dest/js/src/vendor/wow.min.js',
        ]
    },
    output: {
        path: path.resolve(__dirname, './dest/js/dist'),
        filename: '[name].bundle.js'
    }
}