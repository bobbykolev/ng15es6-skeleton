var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var gulpIgnore = require('gulp-ignore');
var buffer = require('vinyl-buffer');
var ver = require('gulp-version-append');
var argv = require('yargs').argv;

var buildType = argv.buildType || 'development';
var env = argv.env || "DEV";
var isProduction = buildType == 'production';

//paths
var jsFiles   = "src/app/**/*.js";
var viewFiles = "src/app/**/*.html";
var sassFiles = "src/sass/**";

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('browserify', ['views'], function() {
  return browserify('./src/app/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulpif(isProduction, uglify()))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function() {
    var file = 'src/index.html';

    return gulp.src(file)
      .pipe(ver(['html', 'js', 'css']))
      .on('error', interceptErrors)
      .pipe(gulp.dest('./dist/'));
});

gulp.task('config', function() {
    var file = 'src/config.js';

    return gulp.src(file)
      .on('error', interceptErrors)
      .pipe(gulp.dest('./dist/'));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./src/app/config/'));
});

gulp.task('sass', function () {
    return sass('src/sass/style.scss')
            .pipe(autoprefixer('last 2 version', 'ie 9', 'ios 6', 'android 4'))
            .on('error', interceptErrors)
            .pipe(gulp.dest('./dist/css'));
});

gulp.task('vendors', function(){
    return gulp.src(["node_modules/fastclick/lib/fastclick.js",
                      "node_modules/hammerjs/hammer.min.js"])
         .pipe(concat('vendors.js'))
         .pipe(gulp.dest('./dist/libs'));
});

gulp.task('bootstrap', function () {
    return gulp.src('node_modules/bootstrap/dist/**')
            .pipe(gulp.dest('./dist/bootstrap'));
});

gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**')
            .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('img', function () {
    return gulp.src('./src/img/**')
            .pipe(gulp.dest('./dist/img'));
});

gulp.task('resources', ['bootstrap', 'fonts', 'img', 'vendors', 'config'], function(){

});

gulp.task('build', ['html', 'resources', 'sass', 'browserify'], function() {

});

gulp.task('default', ['build'], function() {

  browserSync.init(['./dist/**/**.**'], {
    server: "./dist",
    open: false,
    port: 5000,
    notify: false
  });

  gulp.watch("src/index.html", ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(sassFiles, ['sass']);
  gulp.watch(jsFiles, ['browserify']);
});