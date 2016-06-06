var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('serve', ['css', 'scripts'], function() {
  gulp.watch('styles/**/*.css', ['css']);
  gulp.watch('script/**/*.js', ['scripts']);
  gulp.watch('*.html').on('change', browserSync.reload);

  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('css', function() {
  return gulp.src('styles/**/*.css')
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('script/**/*.js')
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
