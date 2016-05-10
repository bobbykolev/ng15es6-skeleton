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

// Where our files are located
var jsFiles   = "src/app/**/*.js";
var viewFiles = "src/app/**/*.html";
var sassFiles = "src/sass/**";

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
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
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('app.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function() {
  return gulp.src("src/index.html")
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

gulp.task('bootstrap', function () {
    return gulp.src('node_modules/bootstrap/dist/**')
            .pipe(gulp.dest('./dist/bootstrap'));
});

// This task is used for building production ready
// minified JS/CSS files into the prod/ folder
gulp.task('build', ['html', 'bootstrap', 'sass', 'browserify'], function() {
  var html = gulp.src("dist/index.html")
                 .pipe(gulp.dest('./prod/'));

  var js = gulp.src("dist/app.js")
               .pipe(uglify())
               .pipe(gulp.dest('./prod/'));

   var css = gulp.src("dist/css/style.css")
               .pipe(gulp.dest('./prod/css/'));

   //todo add libs

  return merge(html,css, js);
});

gulp.task('default', ['html', 'bootstrap', 'sass', 'browserify'], function() {

  browserSync.init(['./dist/**/**.**'], {
    server: "./dist",
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

  gulp.watch("src/index.html", ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(sassFiles, ['sass']);
  gulp.watch(jsFiles, ['browserify']);
});
