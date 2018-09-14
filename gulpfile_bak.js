const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");
const gulpUtil = require('gulp-util');
const tsProject = ts.createProject("tsconfig.json");

// static path
const STATIC = {
    css: './static/css/**',
    common: './static/common/**',
    img: './static/img/**',
    js: '/static/js/',
    html: './views/**'
}

// deploy folder and folder name
const DEPLOY_PATH = {
    name: 'dist',
    folder_path: './dist'
}

// move css folder
gulp.task("css", () => {
    return gulp.src(STATIC.css, {
        base: '.'
    }).pipe(gulp.dest(DEPLOY_PATH.name));
});

// common
gulp.task("common", () => {
    return gulp.src(STATIC.common, {
        base: '.'
    }).pipe(gulp.dest(DEPLOY_PATH.name));
});

// image
gulp.task("img", () => {
    return gulp.src(STATIC.img, {
        base: '.'
    }).pipe(gulp.dest(DEPLOY_PATH.name));
});

// move html folder
gulp.task("html", () => {
    return gulp.src(STATIC.html, {
        base: '.'
    }).pipe(gulp.dest('dist'));
});

// remove dist folder
gulp.task("clean", () => {
    return del(['dist/**', '!' + DEPLOY_PATH.name], {
        force: true
    });
});

// watch change the static files
gulp.task('watcher', () => {
    let watcher = {
        css: gulp.watch(STATIC.css, ['css']),
        html: gulp.watch(STATIC.html, ['html']),
        img: gulp.watch(STATIC.img, ['img']),
        common: gulp.watch(STATIC.common, ['common']),
        ts_compile: gulp.watch(tsProject.config['files'][0], ['ts_compile'])
    };
    let notify = (event) => {
        gulpUtil.log('File',
            gulpUtil.colors.yellow(event.path),
            'was',
            gulpUtil.colors.magenta(event.type))
    };
    for (let key in watcher) {
        watcher[key].on('change', notify);
    }
})

// front compile or move file
gulp.task("front-deploy", ["css", "html", "common", "img", 'ts_compile'], () => {});


// typescript compile
gulp.task("ts_compile", () => {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(DEPLOY_PATH.folder_path + STATIC.js));
});