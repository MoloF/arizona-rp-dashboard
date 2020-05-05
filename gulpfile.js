const { gulp, src, dest, watch, series, parallel } = require('gulp');
const { settings, paths, banner } = require('./config/config');

const del = require('del');
const flatmap = require('gulp-flatmap');
const lazypipe = require('lazypipe');
const rename = require('gulp-rename');
const header = require('gulp-header');
const package = require('./package.json');

const htmlbeautify = require('gulp-html-beautify');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');

const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const concat = require('gulp-concat');
const uglify = require('gulp-terser');
const optimizejs = require('gulp-optimize-js');

const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const sass = require('gulp-sass');
sass.compiler = require('dart-sass');
const postcss = require('gulp-postcss');
const prefix = require('autoprefixer');
const minify = require('cssnano');

const svgmin = require('gulp-svgmin');

const browserSync = require('browser-sync');

const cleanDist = function (done) {
	if (!settings.clean) return done();
	del.sync([paths.output]);
	return done();
};

const jsTasks = lazypipe()
	.pipe(header, banner.main, { package: package })
	.pipe(optimizejs)
	.pipe(dest, paths.scripts.output)
	.pipe(rename, { suffix: '.min' })
	.pipe(uglify)
	.pipe(optimizejs)
	.pipe(header, banner.main, { package: package })
	.pipe(dest, paths.scripts.output);

const buildScripts = function (done) {
	if (!settings.scripts) return done();
	return src(paths.scripts.input).pipe(
		flatmap(function (stream, file) {
			src(file.path)
				.pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
				.pipe(jsTasks());
			return stream;
		})
	);
};

const lintScripts = function (done) {
	if (!settings.scripts) return done();
	return src(paths.scripts.input).pipe(jshint()).pipe(jshint.reporter('jshint-stylish'));
};

const buildStyles = function (done) {
	if (!settings.styles) return done();
	return src(paths.styles.input)
		.pipe(
			sass({
				outputStyle: 'expanded',
				sourceComments: false,
			})
		)
		.pipe(
			postcss([
				prefix({
					cascade: true,
					remove: true,
				}),
			])
		)
		.pipe(header(banner.main, { package: package }))
		.pipe(dest(paths.styles.output))
		.pipe(rename({ suffix: '.min' }))
		.pipe(
			postcss([
				minify({
					discardComments: {
						removeAll: true,
					},
				}),
			])
		)
		.pipe(dest(paths.styles.output));
};

const buildSVGs = function (done) {
	if (!settings.svgs) return done();

	return src(paths.svgs.input).pipe(svgmin()).pipe(dest(paths.svgs.output));
};

const buildHtmls = function () {
	return (
		src(paths.html.input)
			.pipe(
				fileinclude({
					prefix: '@@',
					basepath: '@file',
					context: paths.html.context,
				})
			)
			.pipe(
				htmlbeautify({
					indentSize: 4,
					indent_with_tabs: true,
					end_with_newline: false,
				})
			)
			// .pipe(htmlmin({ collapseWhitespace: true }))
			.pipe(dest(paths.html.output))
	);
};

const copyFiles = function (done) {
	if (!settings.copy) return done();
	return src(paths.copy.input).pipe(dest(paths.copy.output));
};

const startServer = function (done) {
	if (!settings.reload) return done();
	browserSync.init({
		server: {
			baseDir: paths.reload,
		},
		open: false,
	});
	done();
};

const reloadBrowser = function (done) {
	if (!settings.reload) return done();
	browserSync.reload();
	done();
};

const watchSource = function (done) {
	watch(paths.input, series(exports.default, reloadBrowser));
	done();
};
exports.default = series(
	cleanDist,
	parallel(buildScripts, lintScripts, buildStyles, buildSVGs, buildHtmls, copyFiles)
);

exports.watch = series(exports.default, startServer, watchSource);
