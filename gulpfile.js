const gulp = require('gulp');
const minifyCss = require('gulp-clean-css');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require("vinyl-source-stream");
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const paths = {
	jsx: 'src/jsx/*.jsx',
	component: 'src/jsx/react-screen.jsx',
	test: 'src/jsx/test.jsx',
	sass: 'src/sass/*.scss',
};

const debug = false;

gulp.task('clean', function() {
	return gulp.src('dist/', { read: false })
		.pipe(clean());
});

gulp.task('sass', ['clean'], function() {
	return gulp.src(paths.sass)
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 10 versions'],
		cascade: false
	}))
	.pipe(minifyCss())
	.pipe(gulp.dest('dist/'))
});

gulp.task('generation', ['sass'], function() {
	let babelConfig = { presets: ['es2015', 'react'], plugins: ['transform-class-properties'] };

	if(!debug) {
		return gulp.src(paths.component)
			.pipe(babel(babelConfig))
			.pipe(uglify())
			.pipe(gulp.dest('dist/'));
	}

	gulp.src(paths.component)
		.pipe(gulp.dest('dist/'));
	
	let b = browserify({
		entries: paths.test,
		debug: debug,
	});

	return b
		.transform('babelify', babelConfig)
		.bundle()
		.pipe(source('react-screen.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist/'));
});

// Whole build
gulp.task('build', ['clean', 'sass', 'generation']);

gulp.task('watch', function() {
	gulp.watch([paths.sass, paths.jsx], ['build']);
});

gulp.task('default', ['build', 'watch']);