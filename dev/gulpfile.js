var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
  scripts_controllers: ['assets/js/controllers/**/*.js'],
  scripts_vendors: ['assets/js/vendors/**/*.js'],
  scripts_views: ['assets/js/views/**/*.js'],
  images: ['assets/images/**/*'],
  fonts: ['assets/fonts/**/*'],
  html: ['view/**/*.html'],
  sass: ['assets/sass/**/*.scss'],
};

const SRC_SCRIPTS_CONTROLLERS = paths.scripts_controllers;
const DEST_SCRIPTS_CONTROLLERS = '../dist/assets/js/controllers';

const SRC_SCRIPTS_VIEWS = paths.scripts_views;
const DEST_SCRIPTS_VIEWS = '../dist/assets/js/views';

const SRC_SCRIPTS_VENDORS = paths.scripts_vendors;
const DEST_SCRIPTS_VENDORS = '../dist/assets/js/vendors';

const SRC_SASS = paths.sass;
const DEST_SASS = '../dist/assets/css';

const SRC_IMAGES = paths.images;
const DEST_IMAGES = '../dist/assets/images/';

const SRC_HTML = paths.html;
const DEST_HTML = '../dist/view/';

const SRC_FONTS = paths.fonts;
const DEST_FONTS = '../dist/assets/fonts';


gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('controllers', ['clean'], function() {
  return gulp.src(paths.scripts_controllers)
    .pipe(changed(DEST_SCRIPTS_CONTROLLERS))
    .pipe(notify())
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('controllers.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_SCRIPTS_CONTROLLERS));
});

gulp.task('views', ['clean'], function() {
  return gulp.src(paths.scripts_views)
    .pipe(changed(DEST_SCRIPTS_VIEWS))
    .pipe(notify())
    .pipe(sourcemaps.init())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_SCRIPTS_VIEWS));
});

gulp.task('vendors', ['clean'], function() {
  return gulp.src(paths.scripts_vendors)
    .pipe(changed(DEST_SCRIPTS_VENDORS))
    .pipe(notify())
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('vendors.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST_SCRIPTS_VENDORS));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(DEST_IMAGES));
});

gulp.task('sass', ['clean'], function() {
  return gulp.src('assets/sass/**/*.scss')
      .pipe(changed(DEST_SASS))
      .pipe(notify())
      .pipe(sass().on('error', sass.logError))
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
           browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'last 5 iOS versions', 'last 5 Safari versions']
       }))
      .pipe(gulp.dest(DEST_SASS));
});

gulp.task('html', ['clean'], function() {
  return gulp.src(paths.html)
    .pipe(notify())
    .pipe(gulp.dest(DEST_HTML));
});

gulp.task('fonts', ['clean'], function() {
  return gulp.src(paths.fonts)
    .pipe(notify())
    .pipe(gulp.dest(DEST_FONTS));
});

gulp.task('watch', function() {
  gulp.watch(SRC_SCRIPTS_CONTROLLERS, ['controllers']);
  gulp.watch(SRC_SCRIPTS_VENDORS, ['vendors']);
  gulp.watch(SRC_SCRIPTS_VIEWS, ['views']);
  gulp.watch(SRC_IMAGES, ['images']);
  gulp.watch(SRC_HTML, ['html']);
  gulp.watch(SRC_FONTS, ['fonts']);
  gulp.watch(SRC_SASS, ['sass']);
});

gulp.task('default', ['watch', 'controllers', 'views', 'vendors', 'images', 'html', 'fonts', 'sass']);
