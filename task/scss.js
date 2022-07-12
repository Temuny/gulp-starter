//Подключение к Gulp и взятие из него методов которые будут использоваться в моем проекте
const{src, dest} = require('gulp')
//Конфигурации
const path = require('../config/path.js')
const app = require('../config/app.js')
//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const size = require('gulp-size');
const shorthand = require('gulp-shorthand');
const groupCssMediaQueries = require('gulp-group-css-media-queries');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob')
const webpCss = require('gulp-webp-css');


//Обработка SCSS
const scss = () => {
   return src(path.scss.src, { sourcemaps: app.isDev })
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: 'SCSS',
            message: error.message
         }))
      }))
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(webpCss())
      .pipe(autoprefixer())
      .pipe(shorthand())
      .pipe(groupCssMediaQueries())
      .pipe(size({title: "main.css"}))
      .pipe(dest(path.scss.dest, { sourcemaps: app.isDev })) 
      .pipe(rename({suffix: '.min'}))
      .pipe(csso())
      .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))  
}

module.exports = scss