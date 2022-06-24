//Подключение к Gulp и взятие из него методов которые будут использоваться в моем проекте
const{src, dest} = require('gulp')
//Конфигурации
const path = require('../config/path.js')
const app = require('../config/path.js')
//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const cssimport = require('gulp-cssimport');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const shorthand = require('gulp-shorthand');
const groupCssMediaQueries = require('gulp-group-css-media-queries');


//Обработка CSS
const css = () => {
   return src(path.css.src, { sourcemaps: true })
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: 'CSS',
            message: error.message
         }))
      }))
      .pipe(concat('main.css'))
      .pipe(cssimport())
      .pipe(autoprefixer())
      .pipe(shorthand())
      .pipe(groupCssMediaQueries())
      .pipe(dest(path.css.dest, { sourcemaps: true })) 
      .pipe(rename({suffix: '.min'}))
      .pipe(csso())
      .pipe(dest(path.css.dest, { sourcemaps: true }))  
}

module.exports = css