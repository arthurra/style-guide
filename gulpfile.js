var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer= require('gulp-autoprefixer');
var sourcemaps= require('gulp-sourcemaps');

// Compile styles
gulp.task('styles', function () {
  return gulp.src('src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

// Static server + watch files
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });

  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/**/*.html', ['html']);
});

gulp.task('default', ['html', 'styles', 'serve']);
