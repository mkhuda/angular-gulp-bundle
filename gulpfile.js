'use strict';

var gulp = require('gulp'),
    del = require('del'),
    inject = require('gulp-inject'),
    webserver = require('gulp-webserver'),
    connect = require('gulp-connect'),
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

gulp.task('clean', function () {
    return del(['./dist']);
});

gulp.task('build-app-templates', ['clean'], function() {
    
    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");
    
    return gulp.src("./app/templates/*.html")
        .pipe(ngHtml2Js({
            moduleName: "appTemplates",
            prefix: "./templates/"
        }))
        .pipe(concat("appTemplates.js"))
        .pipe(gulp.dest("./dist"));
});

gulp.task('build-js', ['clean'], function() {
  var b = browserify({
        entries: './app/main.js',
        debug: true,
        paths: ['./app/controllers/'],
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

gulp.task('build', ['build-app-templates', 'build-js'], function(){  
  return gulp.src('app/index.html')
    .pipe(cachebust.references())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./app/index.html', './app/templates/*.html', './app/*.js', './app/**/*.js'], ['build']);
});

gulp.task('start', ['watch', 'build'], function() {
    // gulp.src('.')
    //     .pipe(webserver({
    //         livereload: false,
    //         directoryListing: false,
    //         open: "http://localhost:8000/dist/index.html#!/"
    //     }));
    connect.server({
      root: 'dist/',
      port: 3000
    });
});
