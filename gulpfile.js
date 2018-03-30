var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer= require('gulp-autoprefixer');

// Compile styles
gulp.task('styles', function () {
  return gulp.src('src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
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
