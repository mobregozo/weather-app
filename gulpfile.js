const gulp = require('gulp');
const gutil = require('gulp-util');
const bower = require('bower');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const sh = require('shelljs');
const connect = require('gulp-connect');
const templateCache = require('gulp-angular-templatecache');
const ngAnnotate = require('gulp-ng-annotate');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const open = require('gulp-open');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const concat = require('gulp-concat');
var gulpNgConfig = require('gulp-ng-config');

//Convert config Json file in Angular App Component
gulp.task('config', function() {
    gulp.src('config.json')
        .pipe(gulpNgConfig('weatherPortal.config'))
        .pipe(gulp.dest('app'))
});

//Paths of files for the different task
const paths = {
    sass: ['app/**/*.scss', '!app/assets/lib/**/*.scss'],
    css: ['app/assets/*.css'],
    templateCache: ['app/shared/header.html', 'app/components/**/*.html'],
    ng_annotate: ['app/components/**/*.js', 'app/shared/**/*.js'],
    useref: ['app/*.html'],
    images: ['app/assets/images/**/*.*'],
    extras: ['app/favicon.ico'],
    libs: ['app/assets/lib/**/*.*'],
    jshint: ['app/**/*.js']
};

//Convert all views to Angular templatecache elements
gulp.task('templatecache', function(done) {
    gulp.src(paths.templateCache)
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest('app/shared', {
            override: true
        }))
        .on('end', done)
        .pipe(connect.reload());
});

//Generate a report in console with all warnings and errors from javascript files
gulp.task('jshint', function() {
    return gulp.src(paths.jshint)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

//Transfor to verbose Angular dependency injection format
gulp.task('ng_annotate', function(done) {
    gulp.src(['app/components/**/*.js', '!app/components/**/*.spec.js'])
        .pipe(ngAnnotate({
            single_quotes: true
        }))
        .pipe(gulp.dest('./dist/scripts/app'))
        .on('end', done)
        .pipe(connect.reload());
});

//Imagemin images and ouput them in dist
gulp.task('imagemin', function() {
    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/images/'));
});

//Copy all other files to dist directly
gulp.task('copy', function() {
    // Copy extra html5bp files
    gulp.src(paths.extras)
        .pipe(gulp.dest('./dist/'));
});

//Copy all installed lib to dist folder
gulp.task('copy-libs', function() {
    // Copy extra html5bp files
    gulp.src(paths.libs)
        .pipe(gulp.dest('./dist/assets/lib'));
});

//Read Index annotations
gulp.task('useref', ['ng_annotate', 'sass'], function(done) {
    gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify({
            output: {
                quote_style: 3
            },
            mangle: false
        })))
        .pipe(gulp.dest('./dist'))
        .on('end', done);
});

//Sass files compilation
gulp.task('sass-compile', ['clean-css'], function() {
    return gulp.src(paths.sass)
        .pipe(concat('main.scss'))
        .pipe(gulp.dest('app/assets/css'));
});

//Compile all sass in one minified css file
gulp.task('sass', ['sass-compile'], function(done) {
    gulp.src('app/assets/css/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('app/assets/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('app/assets/css/'))
        .on('end', done)
        .pipe(connect.reload());
});

gulp.task('zip', function() {
    return gulp.src(['./dist/**/*', '!./dist/scripts/app', '!./dist/scripts/app/**'])
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('./distribution'));
});

//Delete the dist directory
gulp.task('clean', function() {
    return gulp.src('./dist')
        .pipe(clean());
});

//Delete the dist directory
gulp.task('clean-css', function() {
    return gulp.src(paths.css)
        .pipe(clean());
});

//Connect the local to be opened
gulp.task('connect', function() {
    connect.server({
        root: ['app'],
        livereload: true,
        port: 9000

    });
});

//Open Prod version of the App
gulp.task('open-prod', function() {
    connect.server({
        root: ['./dist'],
        livereload: true,
        port: 9000

    });
});

//Open LOCAL url in the default browser
gulp.task('open', function() {
    var options = {
        uri: 'http://localhost:9000/#/'
    };
    gulp.src(__filename)
        .pipe(open(options));
});

//Different watch process and dependencies
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.templateCache, ['templatecache']);
    gulp.watch(paths.ng_annotate, ['ng_annotate']);
    gulp.watch(paths.useref, ['useref']);
    gulp.watch(paths.jshint, ['jshint']);
});

//Prod task definition
gulp.task('prod', ['open-prod']);

//Default task definition
gulp.task('default', ['copy', 'copy-libs', 'config', 'sass', 'templatecache', 'ng_annotate', 'useref', 'imagemin', 'jshint', 'watch', 'connect', 'open']);