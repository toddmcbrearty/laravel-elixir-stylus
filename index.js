var gulp = require('gulp');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var gulpif = require('gulp-if');
var elixir = require('laravel-elixir');

elixir.extend('stylus', function(src, output) {

    var config = this;

    var stylusDir = config.stylusDir || "stylus";

    var baseDir = config.assetsDir + stylusDir;

    src = this.buildGulpSrc(src, baseDir, '**/*.styl');

    gulp.task('stylus', function() {
        var onError = function(err) {
            notify.onError({
                title:    "Laravel Elixir",
                subtitle: "Stylus Compilation Failed!",
                message:  "Error: <%= error.message %>",
                icon: __dirname + '/../laravel-elixir/icons/fail.png'
            })(err);

            this.emit('end');
        };

        return gulp.src(src)
            .pipe(stylus()).on('error', onError)
            .pipe(autoprefixer())
            .pipe(gulpif(config.production, minify()))
            .pipe(gulp.dest(output || config.cssOutput))
            .pipe(notify({
                title: 'Laravel Elixir',
                subtitle: 'Stylus Compiled!',
                icon: __dirname + '/../laravel-elixir/icons/laravel.png',
                message: ' '
            }));
    });

    this.registerWatcher('stylus', baseDir + '/**/*.styl');

    return this.queueTask('stylus');

});
