const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify compiled CSS
gulp.task('minify-css', gulp.series('sass', function() {
  return gulp.src(['css/*.css', '!css/*.min.css'])
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
}));

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src(['js/*.js', '!js/*.min.js'])
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  return gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('vendor/bootstrap'))

  return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('vendor/jquery'))

  return gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('vendor/jquery-easing'))

  return gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('vendor/font-awesome'))

  return gulp.src([
      'node_modules/devicons/**/*',
      '!node_modules/devicons/*.json',
      '!node_modules/devicons/*.md',
      '!node_modules/devicons/!PNG',
      '!node_modules/devicons/!PNG/**/*',
      '!node_modules/devicons/!SVG',
      '!node_modules/devicons/!SVG/**/*'
    ])
    .pipe(gulp.dest('vendor/devicons'))

  return gulp.src(['node_modules/simple-line-icons/**/*', '!node_modules/simple-line-icons/*.json', '!node_modules/simple-line-icons/*.md'])
    .pipe(gulp.dest('vendor/simple-line-icons'))
})

// Default task
gulp.task('default', gulp.series('sass', 'minify-css', 'minify-js', 'copy'));

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3001
  });
  // done(); // necessary for gulp to continue
});

// Dev task with browserSync
// gulp.task('dev', gulp.series('browserSync', 'sass', 'minify-css', 'minify-js'), function() {
//   gulp.watch('scss/*.scss', ['sass']);
//   gulp.watch('css/*.css', ['minify-css']);
//   gulp.watch('js/*.js', ['minify-js']);
//   // Reloads the browser whenever HTML or JS files change
//   gulp.watch('*.html', browserSync.reload);
//   gulp.watch('js/**/*.js', browserSync.reload);
//   gulp.watch('css/*.css', browserSync.reload);
// });

gulp.task('dev', gulp.series('browserSync', 'sass', 'minify-css', 'minify-js', function devWatch() {
  gulp.watch('scss/*.scss', gulp.series('sass'));
  gulp.watch('css/*.css', gulp.series('minify-css'));
  gulp.watch('js/*.js', gulp.series('minify-js'));
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('js/**/*.js').on('change', browserSync.reload);
  gulp.watch('css/*.css').on('change', browserSync.reload);
}));
