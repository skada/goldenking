var gulp = require('gulp');

var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var exec = require('child_process').exec;

// Jednotlivé úlohy
// Volají se v příkazové řádce zapsáním `$ gulp nazevulohy`
// Samotné `$ gulp` spustí výchozí úlohu s názvem default (viz níže)

// spustí server
gulp.task('runserver', function(){
	var proc = exec('python3 manage.py runserver', function(err, stdout, stderr){
		console.log(stdout);
		console.log(stderr);
	});
});

// vymaže předchozí verzi CSS (úklid)
gulp.task('cssclean', function(){
	return gulp.src('donations/static/*.css', { read: false }).pipe(clean());
});

// zkompilujeme čerstvé CSS + vymaže předchozí verzi CSS (pomocí výše nastavené úlohy cssclean)
gulp.task('csscompile', ['cssclean'], function(){
	return gulp
		.src('src/index.scss') // zdroj stylopisů
		.pipe(sass().on('error', sass.logError)) // výpíše chybu, pokud kompilace selže
		.pipe(sourcemaps.init()) // vytvoří sourcemap => užitečné při ladění v devTools
		.pipe(postcss([autoprefixer({ // doplní prefixy pro prohlížeče, které to potřebují
			// browsers: ['last 2 versions, >.8%, IE8']
		})]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('donations/static')) // sem zapíše výsledné CSS
		.pipe(browserSync.stream()); // promítne změny CSS do stránky ‒ bez reloadu
});

// zavolá výše popsané úlohy:
// 1. zkompiluje CSS
// 2. spustí server na (v prohlížeči na adrese http://localhost:3000)
// 3. zapne hlídače, který hlídá změny v souborech a při změně vykoná, co má
gulp.task('develop', ['csscompile', 'runserver'], function(){
	browserSync.init({
		proxy: {
			target: 'http://127.0.0.1:8000', // adresa spuštěné aplikace v Djangu
		},
		open: false,
		files: [
			'**/*.html',
			'**/*.js'
		]
	});
	gulp.watch('src/*.scss', ['csscompile']); // hlídač
});

gulp.task('default', ['develop']); // nastaví jako výchozí úlohu 'develop', tj. stačí zapsat gulp a spustí se
