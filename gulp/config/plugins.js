import replace from 'gulp-replace'; //поиск и замена имён файлов
import plumber from 'gulp-plumber'; //обработчик ошибок
import notify from 'gulp-notify'; //сообщения 
import browsersync from 'browser-sync' //локальный сервер
import newer from 'gulp-newer' //проверка обновления
import ifPlugin from 'gulp-if' //условное ветвление
import prettier from "gulp-prettier";


export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin,
    prettier: prettier,
}
