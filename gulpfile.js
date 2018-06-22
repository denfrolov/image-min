var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var pngquant = require('imagemin-pngquant');
var imageResize = require('gulp-image-resize');
var del = require('del');

// Images optimization and copy in /dist
gulp.task('img', ['clean'], function () {
	return gulp.src(['src/**/*.jpg', 'src/**/*.png'])
		.pipe(imageResize({
			width: 1920,
			//height: 800,
			crop: false,
			upscale: false
		}))
		.pipe(
			imagemin([
				imagemin.gifsicle({
					interlaced: true
				}),
				imagemin.jpegtran({
					progressive: true
				}),
				imageminJpegRecompress({
					loops: 5,
					min: 75,
					max: 92,
					quality: 'medium'
				}),
				imagemin.svgo(),
				imagemin.optipng({
					optimizationLevel: 3
				}),
				pngquant({
					quality: '75-92',
					speed: 5
				})
			], {
				verbose: true
			}))
		.pipe(gulp.dest('dist'));
});

// Clearing the cache and remove dist
gulp.task('clean', function () {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});