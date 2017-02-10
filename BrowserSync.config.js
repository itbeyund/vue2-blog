const browserSync = require('browser-sync').create();

browserSync.init({
    open: false,
    //proxy: "http://127.0.0.1:2222",
    server: {
        baseDir: "dist",
        directory: false
    },
    middleware: [require("compression")()],
    files: ['dist/*.*']
});
