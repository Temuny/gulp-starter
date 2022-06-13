//Подключение к Gulp и взятие из него методов которые будут использоваться в моем проекте
const{src, dest, watch, series, parallel} = require('gulp')
//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const browserSync = require('browser-sync').create();
const del = require('del');
const pugs = require('gulp-pug');



//Удаление директории
const clear = () => {
   return del('./public')
}

//Обработка HTML
const html = () => {
   return src('./src/html/*.html')
      .pipe(plumber({
         errorHandler: notify.onError()
      }))
      .pipe(fileInclude())
      .pipe(size({title: 'До сжатия'}))
      .pipe(htmlmin({ 
         collapseWhitespace: true 
      }))
      .pipe(size({title: 'После сжатия'}))
      .pipe(dest('./public'))  
      .pipe(browserSync.stream())
}

//Обработка Pug
const pug = () => {
   return src('./src/pug/**/*.pug')
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: 'Pug',
            message: error.message
         }))
      }))
      .pipe(pugs({
         pretty: true,
         data: {
            news: require('./data/news.json')
         }
      }))
      .pipe(dest('./public'))  
      .pipe(browserSync.stream())
}

//Наблюдение
const watcher = () => {
   watch('./src/pug/**/*.pug', pug)
}
// Задачи
exports.pug = pug
exports.watch = watcher
exports.clear = clear
//Сервер
const server = () => {
   browserSync.init({
      server: {
         baseDir: 'public'
      }
   })
}


//Сборка
exports.dev = series(
   clear,
   pug,
   parallel(watcher, server)
)