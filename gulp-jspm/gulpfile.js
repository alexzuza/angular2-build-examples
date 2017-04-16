'use strict';

const gulp = require('gulp');

const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const jspm = require('gulp-jspm-build');

gulp.task('vendor-bundle', function() {
	gulp.src([
			'node_modules/core-js/client/shim.min.js',
			'node_modules/zone.js/dist/zone.js',
			'node_modules/reflect-metadata/Reflect.js',
			'node_modules/systemjs/dist/system.src.js'
		])
		.pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./wwwroot'));
});



gulp.task("jspm", function () {
  return jspm({
    bundleOptions: {
      minify: true,
      mangle: false
    },
    bundleSfx: true,
    bundles: [
      { src: './wwwroot/app/main.js', dst: 'boot.bundle.min.js' }
    ]
  })
    .pipe(gulp.dest('./wwwroot/js-temp'));

});

gulp.task("default", ["jspm", "vendor-bundle"], function () {
    //this only concats boot.bundle.min.js
    //and dependencies.min.js which has already been minified such as es6-shim.js
    var files = [
        // "./wwwroot/js-temp/dependencies.min.js",
        "./wwwroot/js-temp/config.js",
        "./wwwroot/js-temp/boot.bundle.min.js"
    ];

    return gulp.src(files)
       // .pipe(concat("boot.bundle.min.js"))
        .pipe(gulp.dest("./wwwroot/"));

});

