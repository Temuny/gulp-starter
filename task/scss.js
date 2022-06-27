//Подключение к Gulp и взятие из него методов которые будут использоваться в моем проекте
const{src, dest} = require('gulp')
//Конфигурации
const path = require('../config/path.js')
const app = require('../config/path.js')
//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const shorthand = require('gulp-shorthand');
const groupCssMediaQueries = require('gulp-group-css-media-queries');
const sass = require('gulp-sass')(require('sass'));


//Обработка SCSS
const scss = () => {
   return src(path.scss.src, { sourcemaps: true })
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: 'SCSS',
            message: error.message
         }))
      }))
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(shorthand())
      .pipe(groupCssMediaQueries())
      .pipe(dest(path.scss.dest, { sourcemaps: true })) 
      .pipe(rename({suffix: '.min'}))
      .pipe(csso())
      .pipe(dest(path.scss.dest, { sourcemaps: true }))  
}

module.exports = scss