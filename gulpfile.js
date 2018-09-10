// Defining variables from gulp packages
var gulp = require('gulp');                           // Gulp package to tie everything together
var concat = require('gulp-concat');                  // Concats files
var uglify = require('gulp-uglify');                  // Minifies JavaScript
var cleancss = require('gulp-clean-css');             // Minifies CSS
var browserSync = require('browser-sync').create();   // Handles livereload, .create() creates a browsersync instance

/* Task to concat (put together) and minify JavaScript */
gulp.task('concat-js', function(){
  return gulp.src('dev/js/*.js')         // src() source of the js files to use
          .pipe(concat('main.min.js'))   // runs concat function and saves files to main.min.js
          .pipe(uglify())                // next run uglify function to minify the concated files
          .pipe(gulp.dest('dist/js/'));  // destination for the new js file
});

/* Task to concat (put together) and minify CSS */
gulp.task('concat-css', function(){
  return gulp.src('dev/css/*.css')        // src() source of the css files to use
          .pipe(concat('style.min.css'))  // runs concat function and saves files to style.min.css
          .pipe(cleancss())               // next run cleancss function to minify the concated files
          .pipe(gulp.dest('dist/css/'));  // destination for the new css file
});


/* Task to copy over html files from the development folder to distribution folder */
gulp.task('copy-html', function(){
  return gulp.src('dev/*.html')           // src() source of the html files to use
          .pipe(gulp.dest('dist/'));      // destination for the new html files
});

/* Task to copy over image files from the development folder to distribution folder */
gulp.task('copy-img', function(){
  return gulp.src('dev/img/*.{gif,jpg,png,svg}') // src() source of the image files to use, * indicates any files in the images folder
          .pipe(gulp.dest('dist/img/')); // destination for the new image files
});

/* Task to do update the browser when changes are made in development files */
gulp.task('browser-sync', function() {  
  browserSync.init({ // Initiating a local server
      server: {
          baseDir: "dist/"
      }
  });
});

/* Task to watch after changes in the development files, 
   when changes occur run specified task and do a browser reload with browsersync */
gulp.task('watch', ['browser-sync'], function(){
  gulp.watch('dev/js/*.js', ['concat-js']).on('change', browserSync.reload); // When changes occur on files run task and reload browser
  gulp.watch('dev/css/*.css', ['concat-css']).on('change', browserSync.reload);
  gulp.watch('dev/images/*', ['copy-img']);
  gulp.watch('dev/*.html', ['copy-html']).on('change', browserSync.reload);;
});

/* Default task to run with the command 'gulp'
   Will run every task once before starting the watch task and browsersync.
*/
gulp.task('default',['concat-js', 'concat-css', 'copy-img', 'copy-html', 'watch', 'browser-sync'], function() {
  console.log("Default task is run");
});