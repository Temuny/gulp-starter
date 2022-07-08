//Подключение к Gulp и взятие из него методов которые будут использоваться в моем проекте
const{src, dest} = require('gulp');

//Конфигурации
const path = require('../config/path.js')
const app = require('../config/app.js')

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const webpHtml = require('gulp-webp-html');

//Обработка HTML
const html = () => {
   return src(path.html.src)
      .pipe(plumber({
         errorHandler: notify.onError()
      }))
      .pipe(fileInclude())
      .pipe(webpHtml())
      .pipe(size({title: 'До сжатия'}))
      .pipe(htmlmin(app.htmlmin))
      .pipe(size({title: 'После сжатия'}))
      .pipe(dest(path.html.dest))  
}

//Экспорт функции
module.exports = html