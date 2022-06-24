//Подключение к Gulp и взятие из него методов которые будут использоваться в моем проекте
const{watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();

//Конфигурация
const path = require('./config/path.js')

// Задачи
const clear = require('./task/clear.js')
const pug = require('./task/pug.js')
const css = require('./task/css.js')

//Сервер
const server = () => {
   browserSync.init({
      server: {
         baseDir: path.root
      }
   })
}

//Наблюдение
const watcher = () => {
   watch(path.pug.watch, pug).on('all', browserSync.reload)
   watch(path.css.watch, css).on('all', browserSync.reload)
}

//ЗаДачи
exports.pug = pug;
exports.css = css;


//Сборка
exports.dev = series(
   clear,
   pug,
   parallel(pug, css),
   parallel(watcher, server)
)