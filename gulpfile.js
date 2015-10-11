var gulp  = require('gulp'),gutil = require('gulp-util'), concat = require('gulp-concat'),sourcemaps = require('gulp-sourcemaps'), concatCss = require('gulp-concat-css'),jasmine = require('gulp-jasmine');

var input  = {      
  'javascript': '*.js'      
};

var output = {
  'stylesheets': '',
  'javascript': ''
};

gulp.task('default', ['run-tests']);

gulp.task('build-js', function() {
  return gulp.src(input.javascript)
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output.javascript));
});


 
gulp.task('build-css', function () {
  return gulp.src('*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest(''));
});
 
gulp.task('run-tests', function () {
    return gulp.src('spec/tests.js')
        .pipe(jasmine());
});