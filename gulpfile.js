const {src, dest} = require('gulp');

function copyHtml() {
    return src('./src/index.html')
    .pipe(dest('./dist/'))
}

module.exports = {
    build
}
