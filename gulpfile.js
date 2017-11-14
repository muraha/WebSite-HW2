let gulp = require('gulp'),
    scss = require('gulp-sass'),
    smap = require('gulp-sourcemaps'),
    prefix = require('autoprefixer'),
    // lint = require('stylelint'),
    lint = require('gulp-stylelint'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');


// gulp.task('lint', () =>
//     gulp.src( /*base.scss + */ 'app/scss/style.scss')
//     .pipe(lint({
//         failAfterError: true,
//         reporters: [{
//             formatter: 'verbose',
//             console: true
//         }],
//         debug: true
//     }))
// );

gulp.task('scss', () =>
    gulp
    .src('app/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(scss().on('error', scss.logError))
    .pipe(lint({
        failAfterError: false,
        reporters: [{
            formatter: 'verbose',
            console: true
        }],
        debug: false
    }))
    .pipe(postcss(
        [
            prefix({
                browsers: ['last 2 versions'],
                cascade: false
            })
        ]
    ))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
);

gulp.task('liveserver', () =>
    browserSync.init({
        server: {
            baseDir: "app"
        },
        // tunnel: true,
        // host: 'localhost'
    })
);
gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', ['scss']);
    gulp.watch('app/scss/**/*.scss', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['liveserver', 'scss', 'watch']);