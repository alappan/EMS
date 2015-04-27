var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  bistre = require('bistre'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha'),
  jscs = require('gulp-jscs'),
  stylish = require('gulp-jscs-stylish'),
  noop = function() {};

var paths = {
  lintables: [
    "./adapters/**/*.js",
    "./services/**/*.js",
    "./test/**/*.js"
  ],
  test: "./test/**/*.js"
};

var options = {
  mocha: {
    timeout: 60000
  }
}

gulp.task('nodemon', function() {
  process.env.NODE_ENV = 'dev';
  nodemon({
      script: 'app.js',
      ignore: [
        'node_modules/',
        'public/',
        'test/'
      ],
      stdout: false,
    })
    .on('readable', function() {
      this.stdout
        .pipe(bistre({
          time: true
        }))
        .pipe(process.stdout);
      this.stderr
        .pipe(bistre({
          time: true
        }))
        .pipe(process.stderr);
    });
});

gulp.task('lint', function() {
  gulp.src(paths.lintables)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('style', function() {
  gulp.src(paths.lintables)
    .pipe(jscs()) // enforce style guide
    .on('error', noop) // don't stop on error
    .pipe(stylish());
})

gulp.task('test', function() {
  process.env.NODE_ENV = 'test';
  gulp.src(paths.test)
    .pipe(jshint())
    .pipe(mocha(options.mocha))
    .once('end', function() {
      process.exit();
    });
});


gulp.task('build', ['lint', 'style']);
gulp.task('dev', ['nodemon']);
gulp.task('default', ['nodemon']);
