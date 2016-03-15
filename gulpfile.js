/* --------- plugins --------- */

var
	gulp        = require('gulp'),
	sass				= require('gulp-sass'),
	jade        = require('gulp-jade'),
	browserSync = require('browser-sync').create(),
	plumber     = require('gulp-plumber'),
	uncss 			= require('gulp-uncss'),
	nano				= require('gulp-cssnano'),
	sourcemaps  = require('gulp-sourcemaps'),
	uglify 			= require('gulp-uglifyjs'),
	imagemin 		= require('gulp-imagemin'),
	pngquant 		= require('imagemin-pngquant'),
	spritesmith = require('gulp.spritesmith');

/* --------- paths --------- */

var
	paths = {
		jade : {
			location    : 'dev/jade/**/*.jade',
			compiled    : 'dev/jade/_pages/*.jade',
			destination : 'dist'
		},

		scss : {
			location    : 'dev/styles/**/*.scss',
			entryPoint  : 'dist/css'
		},

		uncss : {
			html	:['dist/index.html','dist/about.html']
		},

		js : {
			location	: 'dev/scripts/**/*.js',
			dest		: 'dist/js'
		},

		fonts : {
			location	: 'dev/font/**/*.*',
			destonation : 'dist/font'
		},

		sprt : {
			location 	: './dev/images/icons/*.png',
			destCSS	 	: './dev/styles/_misc/',
			destSprite  : './dist/img/icons/',
			nameCSS		: '_sprite.scss',
			nameSprite	: 'sprite.png',
			destPath	: '../img/icons/'

		},

		img : {
			location : 'dev/images/*.{png,jpg}',
			dest	 : 'dist/img'
		},

		browserSync : {
			baseDir : './dist/',
			watchPaths : ['./dist/*.html', './dist/css/*.css', './dist/js/*.js', './dist/images/**/*.{png,jpg}']
		}
	};

/* --------- jade --------- */

gulp.task('jade', function() {
	gulp.src(paths.jade.compiled )
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))
		.pipe(gulp.dest(paths.jade.destination));
});

/* --------- sass --------- */

gulp.task('sass', function () {
	gulp.src(paths.scss.location)
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(uncss(paths.uncss))
		.pipe(nano())
		.pipe(sourcemaps.write(paths.scss.entryPoint))
		.pipe(gulp.dest(paths.scss.entryPoint));
});

/* --------- javascript --------- */

gulp.task('js', function () {
	gulp.src(paths.js.location)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(uglify())
		.pipe(sourcemaps.write(paths.js.dest))
		.pipe(gulp.dest(paths.js.dest));
});

/* --------- fonts --------- */

gulp.task('fonts', function () {
	gulp.src(paths.fonts.location)
		.pipe(gulp.dest(paths.fonts.destonation));
});

/* --------- sprites --------- */

gulp.task('sprite', function () {
  var spriteData = gulp.src(paths.sprt.location).pipe(spritesmith({
    imgName: paths.sprt.nameSprite,
    cssName: paths.sprt.nameCSS,
	imgPath: paths.sprt.destPath+paths.sprt.nameSprite,
	padding: 60,
	algorithm: 'left-right'
  }));
  spriteData.img.pipe(gulp.dest(paths.sprt.destSprite));
  spriteData.css.pipe(gulp.dest(paths.sprt.destCSS));
});

/* --------- images --------- */

gulp.task('images', function () {
	return gulp.src(paths.img.location)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use: [
				pngquant({
					quality: '75-80',
					speed: 2
				})
			]
		}))
		.pipe(gulp.dest(paths.img.dest));
});

/* --------- browser sync --------- */

gulp.task('sync', function() {
	browserSync.init({
		server: {
			baseDir: paths.browserSync.baseDir
		}
	});
});

/* --------- watch --------- */

gulp.task('watch', function(){
	gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['sass']);
	gulp.watch(paths.js.location, ['js']);
	gulp.watch(paths.fonts.location, ['fonts']);
	gulp.watch(paths.sprt.location, ['sprite']);
	gulp.watch(paths.img.location, ['images']);
	gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});

/* --------- default --------- */

gulp.task('default', ['sprite', 'images', 'jade', 'sass', 'js', 'fonts', 'sync', 'watch']);
