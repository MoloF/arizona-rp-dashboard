const settings = {
	clean: true,
	scripts: true,
	polyfills: true,
	styles: true,
	svgs: true,
	copy: true,
	reload: true
};

const paths = {
	input: 'src/',
	output: 'dist/',
	scripts: {
		input: 'src/js/app.js',
		output: 'dist/js/'
	},
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: 'dist/css/'
	},
	svgs: {
		input: 'src/svg/*.svg',
		output: 'dist/svg/'
	},
	html: {
		input: 'src/views/*.html',
		output: 'dist/',
		context: {
			active: '',
			children: '',
			aside: false
		}
	},
	copy: {
		input: 'src/copy/**/*',
		output: 'dist/'
	},
	reload: './dist/'
};

const banner = {
	main:
		'/*!' +
		' <%= package.name %> v<%= package.version %>' +
		' | (c) ' +
		new Date().getFullYear() +
		' <%= package.author.name %>' +
		' | <%= package.license %> License' +
		' | <%= package.repository.url %>' +
		' */\n'
};

module.exports = {
	settings,
	paths,
	banner
};
