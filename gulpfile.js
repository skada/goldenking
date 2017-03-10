var gulp = require('gulp');

var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var exec = require('child_process').exec;

gulp.task('runserver', function(){
	var proc = exec('python3 manage.py runserver', function(err, stdout, stderr){
		console.log(stdout);
		console.log(stderr);
	});
});

gulp.task('cssclean', function(){
	return gulp.src('donations/static/*.css', { read: false }).pipe(clean());
});

gulp.task('csscompile', ['cssclean'], function(){
	return gulp
		.src('src/index.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(postcss([autoprefixer({
			// browsers: ['last 2 versions, >.8%, IE8']
		})]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('donations/static'))
		.pipe(browserSync.stream());
});

gulp.task('develop', ['csscompile', 'runserver'], function(){
	browserSync.init({
		proxy: {
			target: 'http://127.0.0.1:8000',
		},
		open: false,
		files: [
			'**/*.html',
			'**/*.js'
		]
	});
	gulp.watch('src/*.scss', ['csscompile']);
});

gulp.task('default', ['develop']);
