import gsap from 'gsap';

export default (function () {
	const duration = 1;
	const toggle = document.querySelector('.toggle-aside-block');
	const block = document.querySelector('.operations-log');
	const overlay = block.querySelector('.overlay');
	let blockBound = block.getBoundingClientRect();
	const container = document.querySelector('main.content');
	let isLocal = !!localStorage.getItem('logs-is-open');

	isLocal ? toggle.classList.add('active') : toggle.classList.remove('active');

	const event = new Event('textResize');

	const toggleBlock = (state, instantly = false) => {
		if (instantly) {
			gsap.set(block, { translateX: state ? '100%' : 0 });
		} else {
			gsap.to(block, duration, { translateX: state ? '100%' : 0 });
		}

		const method = state ? 'remove' : 'add';

		block.classList[method]('active');

		window.dispatchEvent(event);
	};
	const toggleContainer = (state, instantly = false) => {
		if (instantly) {
			gsap.set(container, { marginRight: state ? 0 : blockBound.width });
		} else {
			gsap.to(container, duration, {
				marginRight: state ? 0 : blockBound.width,
				onComplete: () => window.dispatchEvent(event),
			});
		}

		window.dispatchEvent(event);
	};

	toggleBlock(isLocal, true);
	toggleContainer(isLocal, true);

	window.onresize = () => {
		blockBound = block.getBoundingClientRect();
		toggleBlock(isLocal, true);
		toggleContainer(isLocal, true);
	};

	toggle.addEventListener('click', function () {
		this.classList.toggle('active');
		const isActive = this.classList.contains('active');
		isActive
			? localStorage.setItem('logs-is-open', true)
			: localStorage.removeItem('logs-is-open');

		toggleBlock(isActive);
		toggleContainer(isActive);
	});

	overlay.addEventListener('click', function () {
		toggle.classList.add('active');
		localStorage.setItem('logs-is-open', true);
		isLocal = !!localStorage.getItem('logs-is-open');
		toggleBlock(true);
		toggleContainer(true);
	});
});
