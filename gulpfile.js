// ## Globals
var autoprefixer = require('gulp-autoprefixer');
var changed      = require('gulp-changed');
var concat       = require('gulp-concat');
var flatten      = require('gulp-flatten');
var gulp         = require('gulp');
var rename       = require('gulp-rename');
var runSequence  = require('run-sequence');
var gulpif       = require('gulp-if');
var imagemin     = require('gulp-imagemin');
var jshint       = require('gulp-jshint');
var lazypipe     = require('lazypipe');
var less         = require('gulp-less');
var merge        = require('merge-stream');
var cssNano      = require('gulp-cssnano');
var svgo         = require('gulp-svgo');
var plumber      = require('gulp-plumber');
var rev          = require('gulp-rev');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var stripComments = require('gulp-strip-comments');
var stripCssComments = require('gulp-strip-css-comments');
var uglify       = require('gulp-uglify');
var ngAnnotate   = require('gulp-ng-annotate');
var path         = require('path');
var ngTemplateCache =  require('gulp-angular-templatecache');


var currentPath = path.parse(__dirname);

var path = {
    src: [
        'src/scripts/swiper.module.js',
        'src/scripts/directives/**/*.js',
        'src/scripts/services/**/*.js'
    ],
    styles: 'src/styles/**/*.scss',
    dist: 'dist',
    scriptFilename: 'angular-' + currentPath.name + '.js',
    styleFilename:  'angular-' + currentPath.name
};



var getExtension = function(path) {
    var basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
        // (supports `\\` and `/` separators)
        pos = basename.lastIndexOf(".");       // get last position of `.`

    if (basename === "" || pos < 1) {
        return "";                             //  `.` not found (-1) or comes first (0)
    }            // if file name is empty or ...


    return basename.slice(pos + 1);            // extract extension ignoring `.`
};


// ### CSS processing pipeline
var cssTasks = function(src, dest, filename, min) {
    return gulp.src(src)
        .pipe(plumber())
        .pipe(gulpif(!min, sourcemaps.init()) )
        .pipe(sass({
            outputStyle: 'nested', // libsass doesn't support expanded yet
            precision: 10,
            includePaths: ['.'],
            errLogToConsole: true
        }))
        .pipe(concat(filename))
        .pipe(svgo())
        .pipe(autoprefixer( {
            browsers: [
                'last 2 versions',
                'android 4',
                'opera 12'
            ]
        }))
        .pipe(gulpif(min, cssNano({ safe: true, discardComments: {removeAll: true} })) )
        .pipe(gulpif(min, rename({ suffix: '.min' })) )
        .pipe(stripCssComments())
        .pipe(gulpif(!min, sourcemaps.write('.', { sourceRoot: 'styles/' })) )
        .pipe(gulp.dest(dest));
};

// ### JSHint
// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function() {
    return gulp.src([
        'bower.json', 'gulpfile.js'
    ].concat(path.src))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', require('del').bind(null, [path.dist]));

// ### JS processing pipeline minify
// `gulp scripts` - Runs JSHint then compiles, combines, and optimizes Bower JS
// and project JS.
gulp.task('scripts_min', ['jshint'], function() {

    return gulp.src(path.src)
        .pipe(ngAnnotate())
        .pipe(concat(path.scriptFilename))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.dist));
});



// ### Styles
// `gulp styles` - Compiles, combines, and optimizes Bower CSS and project CSS.
// By default this task will only log a warning if a precompiler error is
// raised. If the `--production` flag is set: this task will fail outright.
gulp.task('styles', function() {

    return cssTasks(path.styles, path.dist, path.styleFilename + '.css', false);
});
gulp.task('styles_min', function() {

    return cssTasks(path.styles, path.dist, path.styleFilename + '.css', true);
});


// ### JS processing pipeline
// `gulp scripts` - Runs JSHint then compiles, combines, and optimizes Bower JS
// and project JS.
gulp.task('scripts', ['jshint'], function() {

    // the same options as described above
    var options = {
        mangle: false,
        compress: false,
        output: { beautify: true }
    };

    return gulp.src(path.src)
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat(path.scriptFilename))
        .pipe(uglify(options))
        .pipe(sourcemaps.write('.', { sourceRoot: path.dist }))
        .pipe(gulp.dest(path.dist));
});


// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task('build', function(callback) {
    runSequence(
        'scripts',
        'scripts_min',
        'styles',
        'styles_min',
        callback);
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});