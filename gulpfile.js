var gulp = require('gulp');
var sass = require('gulp-sass');

var gulpif = require('gulp-if');
var del = require('del');
var sequence = require('gulp-sequence');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');

var src = './src/';
var dest = './min/';

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || 'Error running gulp',
      message: 'Error: <%= error.message %>',
      sound: true,
    })
  });
}

gulp.task('browserSync', ['sass'], function(){
  browserSync({
    proxy: 'qooki.es/'
  });
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch(src + 'scss/**/*.scss', ['sass']);
  gulp.watch(src + 'js/**/*.js', ['js']);
  gulp.watch(src + '/**/*.html', ['html']);
});

gulp.task('sass', function(){
  return gulp.src(src + 'scss/**/*.scss')
  .pipe(customPlumber('Error running sass'))
  .pipe(sass())
  .pipe(autoprefixer({
    browser: [ 'ie 8-9', 'last 2 versions' ]
  }))
  .pipe(gulp.dest(src + 'css/'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('minify:js', function(){
  return gulp.src([
    src + 'js/qookies.js',
    src + '**/*.js',
    'bower_components/js-cookie/src/js.cookie.js'
  ])
  .pipe(uglify())
  .pipe(gulp.dest(dest + 'js/'));
});

gulp.task('minify:scss', function(){
  return gulp.src([
    src + 'scss/qk-default.scss',
    src + 'scss/qk-theme-default.scss'
  ])
  .pipe(customPlumber('Error running sass'))
  .pipe(sass())
  .pipe(autoprefixer({
    browser: [ 'ie 8-9', 'last 2 versions' ]
  }))
  .pipe(cssnano())
  .pipe(gulp.dest(dest + 'css/'));
});

gulp.task('minify', sequence('minify:scss', 'minify:js'));

gulp.task('html', function(){
  return gulp.src(src + '*.html')
    .pipe(gulp.dest(dest));
});

gulp.task('js', function(){
  return gulp.src(src + 'js/**/*.js')
    .pipe(gulp.dest(dest));
});

gulp.task('default', sequence(['watch', 'html']));
