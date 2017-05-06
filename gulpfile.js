'use strict';

var gulp = require('gulp'),
    del = require('del'),
    inject = require('gulp-inject'),
    webserver = require('gulp-webserver'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('serve', function () {
  console.log('Sample Serve');
});

gulp.task('clean', function (cb) {
    console.log('cleaning dist');
    del([
        'dist'
    ], cb);
});


gulp.task('build-js', function() {
  var b = browserify({
        entries: './app/main.js',
        debug: true,
        transform: [ngAnnotate]
    });
  return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
          .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build', ['build-js'], function(){  
  console.log('building index');
  return gulp.src('app/index.html')
    .pipe(cachebust.references())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./app/index.html', './app/*.js'], ['build']);
});

gulp.task('start', ['watch', 'build'], function() {
  gulp.src('.')
      .pipe(webserver({
          livereload: false,
          directoryListing: true,
          open: "http://localhost:8000/dist/index.html"
      }));
})
