var gulp                   = require('gulp');
var imagemin               = require('gulp-imagemin'); 
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var pngquant               = require('imagemin-pngquant');
var imageResize            = require('gulp-image-resize');
var cache                  = require('gulp-cache');
var del                    = require('del');


// Images optimization and copy in /dist
gulp.task('img',['clean'], function() {
	return gulp.src('src/**/*')
	.pipe(
		imageResize({
			width : 800,
			height : 800,
			//crop : true,
      		//upscale : false
      	}),
		imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imageminJpegRecompress({
				loops: 5,
				min: 65,
				max: 70,
				quality:'medium'
			}),
			imagemin.svgo(),
			imagemin.optipng({optimizationLevel: 3}),
			pngquant({quality: '65-70', speed: 5})
			],{
				verbose: true
			}))
	.pipe(gulp.dest('dist'));
});

// Clearing the cache and remove dist
gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});
gulp.task('clear', function (done) {
	return cache.clearAll(done);
});