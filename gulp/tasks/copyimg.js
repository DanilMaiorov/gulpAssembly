export function copyimg () {
    return app.gulp.src(app.path.src.images)
    .pipe(app.gulp.dest(app.path.build.images))
}