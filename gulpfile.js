//основной модуль
import gulp from 'gulp';

//импорт путей
import { path } from './gulp/config/path.js';

//импорт общих плагинов
import { plugins } from './gulp/config/plugins.js';

//передача значений в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'), //если есть флаг, то режим продакшена
    isDev: !process.argv.includes('--build'), //если нет флага, то режим разработки
    path: path,
    gulp: gulp,
    plugins: plugins,
}
//импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { copyimg } from './gulp/tasks/copyimg.js';
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { sprite } from "./gulp/tasks/svgsprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
//import { images } from './gulp/tasks/images.js'//НЕ РАБОТАЕТ МОДУЛЬ ПРИ СБОРКЕ

//наблюдатель ща изменениями в файлах
function watcher () {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.images, copyimg)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)

    //gulp.watch(path.watch.images, images)  //НЕ РАБОТАЕТ МОДУЛЬ ПРИ СБОРКЕ
}
export { sprite }

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)
//переменная с основными задачами
const mainTasks = gulp.series(fonts, copy, html, scss, js, /* images, */ copyimg)

//построение сценариев выполнения задач

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)
const deployZip = gulp.series(reset, mainTasks, zip)
const deployFtp = gulp.series(reset, mainTasks, ftp)

//экспорт сценариев
export { dev }
export { build }
export { deployZip }
export { deployFtp }
//выполнение сценария по умолчанию
gulp.task('default', dev);