import dartSass from 'sass'; //компилятор файлов
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename' //переименовыватель scss в css 

import cleanCss from 'gulp-clean-css' //сжатие файла 
import webpcss from 'gulp-webpcss' //вывод WEBP изображений 
import autoprefixer from 'gulp-autoprefixer' //доавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries' //группировка медиа запросов
 
const sass = gulpSass(dartSass)

export function scss () {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message%>"
        })))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(sass({
        outputStyle: 'expanded' //изначальный стиль файлов
    }))
    .pipe(
        app.plugins.if(
            app.isBuild,
            groupCssMediaQueries())
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            webpcss({
        webpClass: ".webp", //нужно будет добавлять JSкод
        noWebpClass: ".no-webp",
    }))
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 3 versions"],
        cascade: true
    }))
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(
        app.plugins.if(
            app.isBuild,
            cleanCss())
    )
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream())
    }