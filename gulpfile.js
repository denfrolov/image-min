var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); 
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var pngquant = require('imagemin-pngquant');
var imageResize = require('gulp-image-resize');
var cache = require('gulp-cache');
var del          = require('del');

// Images resize
gulp.task('resize', function () {
	gulp.src('src/**/*')
	.pipe(imageResize({
		width : 1920,
		height : 1080,
      //crop : true,
      //upscale : false
  }))
	.pipe(gulp.dest('dist'));
});


// Images optimization and copy in /dist
gulp.task('img', function() {
	return gulp.src('src/**/*')
	.pipe(cache(imageResize({
		width : 1920,
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
		})))
	.pipe(gulp.dest('dist'));
});

// Clearing the cache
gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});
gulp.task('clear', ['clean'], function (done) {
	return cache.clearAll(done);
});