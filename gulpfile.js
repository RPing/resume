var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var shell = require('gulp-shell')

gulp.task('copy', function() {
  gulp.src('resume.css')
      .pipe(gulp.dest('node_modules/markdown-resume/assets/css'))
})

// Default task
gulp.task('default', ['dev'])

gulp.task('MDtoHTML', function () {
  return gulp.src('resume.md', {read: false})
             .pipe(shell(['md2resume <%= file.path %>']))
})

// Configure the browserSync task
gulp.task('browserSync', ['MDtoHTML'], function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'resume.html'
    },
  })
})

gulp.task('watch', ['MDtoHTML'], function (done) {
    browserSync.reload()
    done()
})

// Dev task with browserSync
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('resume.md', ['watch'])
})
