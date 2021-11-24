const {src, dest, series, parallel} = require('gulp');

function copyHtml() {
    return src('./src/index.html')
    .pipe(dest('./dist'))
}

function copyJs() {
    return src('./src/script.js')
    .pipe(dest('./dist'))
}

module.exports = {
    build: parallel(copyHtml, copyJs)
}
