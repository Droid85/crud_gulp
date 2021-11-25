const {src, dest, series, parallel, watch} = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');

function cleanDist() {
    return src('./dist', {read: false})
    .pipe(clean())
}

function copyHtml() {
    return src('./src/index.html')
    .pipe(dest('./dist'))
}

function minCss() {
    return src('./src/styles.css')
    .pipe(cleanCss())
    .pipe(dest('./dist'))
}

function copyJs() {
    return src(['./src/script/environment.js', './src/script/https.js', './src/script/ui.js', './src/script/script.js'])
    .pipe(concat('app.js'))
    .pipe(dest('./src'))
}

function minJs() {
    return src('./src/app.js')
    .pipe(uglify())
    .pipe(dest('./dist'))
}

function watchFiles() {
    return watch('./src/**/*.js', {events: 'all'}, copyJs)
}

module.exports = {
    build: series(cleanDist, copyJs, parallel(copyHtml, minJs, minCss)),
    serve: series(cleanDist, copyJs, parallel(copyHtml, minJs, minCss), watchFiles)
}
