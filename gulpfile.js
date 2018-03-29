var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer= require('gulp-autoprefixer');

// Compile styles
gulp.task('styles', function () {
  gulp.src('./scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// Static server + watch files
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('./scss/*.scss', ['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'serve']);
