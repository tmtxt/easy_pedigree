var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');

var clientFiles = ['render_tree'];
var clientLibFiles = ['jquery', 'd3'];

function appendPrefixPath(files, path){
  var result = new Array();
  for(var i = 0; i < files.length; i++) {
    result.push(path + '/' + files[i] + '.js');
  }
  return result;
}

gulp.task('default', ['watch'] ,function() {
  // place code for your default task here
});

gulp.task('lint', function(){
  return gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('uglify-client', function(){
  gulp.src(appendPrefixPath(clientFiles, 'public/js_app'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js_app'));
});

gulp.task('uglify-client-lib',function(){
  gulp.src(appendPrefixPath(clientLibFiles, 'public/js_app/lib'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js_app/lib'));
});

gulp.task('browserify', function(){  
  gulp.src(appendPrefixPath(clientFiles, 'client'))
    .pipe(browserify())
    .on('prebundle', function(bundle){
      bundle.external('jquery-browserify');
      bundle.external('d3-browserify');
    })
    .pipe(gulp.dest('public/js_app'));
});

gulp.task('watch', function() {
  // browserify client file
  gulp.watch(appendPrefixPath(clientFiles, 'client'), ['browserify']);

  // and then uglify them
  gulp.watch(appendPrefixPath(clientFiles, 'public/js_app'), ['uglify-client']);
});
