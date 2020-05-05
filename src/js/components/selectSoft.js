import { gsap } from 'gsap';

export default (function(elements, container) {
	if (!elements) throw '[selectSoft] elements not found.';
	if (typeof elements !== 'object') throw '[selectSoft] elements is not object.';

	if (!container) throw '[selectSoft] elements not found.';
	if (typeof container !== 'object') throw '[selectSoft] elements is not object.';

	const handleClick = function() {
		const data = this.querySelector('.data') || null;
		const isActive = this.classList.contains('active');
		elements.forEach(element => element.classList.remove('active'));
		isActive ? this.classList.remove('active') : this.classList.add('active');
		container.innerHTML = !isActive ? data.innerHTML : '';
	};

	elements.forEach(element => {
		element.addEventListener('click', handleClick);
	});
});
