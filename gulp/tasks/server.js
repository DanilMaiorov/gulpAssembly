export function server () {
    app.plugins.browsersync.init({
        server: {
            baseDir: `${app.path.build.html}`
        }, 
        notify: false, //собещиня в браузере отключены
        port: 3000,
    })
}