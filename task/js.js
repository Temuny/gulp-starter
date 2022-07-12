//Подключение к Gulp и взятие из него методов которые будут использоваться в моем проекте
const{src, dest} = require('gulp')
//Конфигурации
const path = require('../config/path.js')
const app = require('../config/app.js')
//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');


//Обработка JavaScript
const js = () => {
   return src(path.js.src, { sourcemaps: app.isDev})
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: 'JavaScript',
            message: error.message
         }))
      }))
      .pipe(babel())
      .pipe(webpack(app.webpack))
      .pipe(dest(path.js.dest, { sourcemaps: app.isDev}))  
}

module.exports = js;