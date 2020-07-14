const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const purgecss = require('gulp-purgecss');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// File path

const files = {
  sassPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/!(custom)*.js'
}

// Compile css into scss
function cssTask() {
  return gulp.src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(purgecss({
      content: ['**/*.html']
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
}

// Js Task 
function jsTask() {
  return gulp.src([files.jsPath,
    // Import all bootstrap 
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    'node_modules/popper.js/dist/umd/popper.js',
    'app/js/custom.js'
  ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
}

// Cache Control Task
function cacheBustTask() {
  var cbString = new Date().getTime();
  return gulp.src(['**/*.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(gulp.dest('.'))
}

// Watch files
function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    }
  });

  gulp.watch('app/scss/**/*.scss', cssTask)
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('app/js/**/*.js', jsTask)
}

exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.cacheBustTask = cacheBustTask;
exports.watch = watch;