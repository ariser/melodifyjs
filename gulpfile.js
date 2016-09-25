var gulp          = require('gulp'),
    runSequence   = require('run-sequence'),

    webpack       = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    del           = require('del');

var config = {
	paths: {
		src:   {
			root:    'src',
			views:   'src/views',
			assets:  'src/assets',
			scripts: 'src/assets/scripts',
			styles:  'src/assets/styles',
			images:  'src/assets/images',
			fonts:   'src/assets/fonts'
		},
		build: {
			root:   'public',
			views:  'public',
			assets: 'public/assets',
			js:     'public/assets/js',
			css:    'public/assets/css',
			images: 'public/assets/img',
			fonts:  'public/assets/fonts'
		}
	}
};

gulp.task('views:clean', function () {
	return del([config.paths.build.views + '/**']);
});
gulp.task('views', function () {
	return gulp.src(config.paths.src.views + '/**')
		.pipe(gulp.dest(config.paths.build.views));
});

gulp.task('styles:clean', function () {
	return del([config.paths.build.styles + '/**']);
});
gulp.task('styles', function () {
	return gulp.src(config.paths.src.styles + '/**')
		.pipe(gulp.dest(config.paths.build.css));
});

gulp.task('scripts:clean', function () {
	return del([config.paths.build.scripts + '/**']);
});
gulp.task('scripts:vendor', function () {
	return gulp.src(config.paths.src.scripts + '/vendor/**')
		.pipe(gulp.dest(config.paths.build.js + '/vendor'));
});
gulp.task('webpack', function () {
	return gulp.src(config.paths.src.scripts + '/index.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest(config.paths.build.js));
});
gulp.task('scripts', ['scripts:vendor', 'webpack']);

gulp.task('clean', ['views:clean', 'styles:clean', 'scripts:clean']);

gulp.task('build', function (next) {
	runSequence(
		'clean',
		['views', 'styles', 'scripts'],
		next
	);
});

gulp.task('watch', function () {
	gulp.watch(config.paths.src.styles + '/**/*', ['styles']);
	gulp.watch(config.paths.src.scripts + '/**/*', ['scripts']);
	gulp.watch(config.paths.src.views + '/**/*', ['views']);
});

gulp.task('default', ['build', 'watch']);