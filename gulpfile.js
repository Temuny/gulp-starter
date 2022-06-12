//Подключение к Gulp и взятие из него методов которые будут использоваться в моем проекте
const{src, dest, watch, series, parallel} = require('gulp')
//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const browserSync = require('browser-sync').create();

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

//Наблюдение
const watcher = () => {
   watch('src/html/**/*.html', html)
}

// Задачи
exports.html = html
exports.watch = watcher
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
   html,
   parallel(watcher, server)
)