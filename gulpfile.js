const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const tsProject = ts.createProject('tsconfig.json');
const sourceMaps = require('gulp-sourcemaps');

// src path
const SRC_PATH = {
  base: 'src',
  bin: 'src/bin/**/*',
  assets: 'src/assets/**/*',
  views: 'src/views/**/*',
}

// deploy path
const DEPLOY_PATH = {
  folderName: 'dist',
  default: './dist/',
}


gulp.task('cp_views_assets', () => {
  return gulp.src([SRC_PATH.bin, SRC_PATH.assets, SRC_PATH.views], {
      base: SRC_PATH.base
    })
    .pipe(gulp.dest(DEPLOY_PATH.folderName));
});

gulp.task('tsc', () => {
  return tsProject.src()
    .pipe(sourceMaps.init())
    .pipe(tsProject())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(DEPLOY_PATH.default));
});

gulp.task('clean', () => {
  return del.sync([`${DEPLOY_PATH.folderName}/`, `!DEPLOY_PATH.folderName`]);
});

gulp.task('cmp', ['clean', 'tsc', 'cp_views_assets'], () => {});
