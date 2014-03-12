var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var react = require('gulp-react');

var clientFiles = ['render_tree'];
var clientLibFiles = ['jquery', 'd3', 'jquery-ui', 'react', 'underscore', 'js-csp'];

function appendPrefixPath(files, path){
  var result = [];
  for(var i = 0; i < files.length; i++) {
    result.push(path + '/' + files[i] + '.js');
  }
  return result;
}

gulp.task('default', ['watch-client'] ,function() {
  // place code for your default task here
});

gulp.task('lint-client', function(){
  return gulp.src(appendPrefixPath(clientFiles, 'client'))
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
      bundle.external('jquery-ui-browserify');
      bundle.external('underscore');
      bundle.external('js-csp');
    })
    .pipe(gulp.dest('public/js_app'));
});

gulp.task('watch-client', function() {
  // linting and then browserify client file
  gulp.watch(appendPrefixPath(clientFiles, 'client'), ['lint-client', 'browserify']);

  // and then uglify them
  gulp.watch(appendPrefixPath(clientFiles, 'public/js_app'), ['uglify-client']);
});

gulp.task('react', function () {
  gulp.src('client/react.jsx')
    .pipe(react())
    .pipe(browserify({
      transform: ['reactify']
    }))
    .on('prebundle', function(bundle){
      bundle.external('react');
    })
    .pipe(gulp.dest('public/js_app'));
});
