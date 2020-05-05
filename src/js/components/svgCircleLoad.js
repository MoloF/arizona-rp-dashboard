import gsap from 'gsap';

export default (function() {
	const elements = [...document.querySelectorAll('.loadCircle')];

	if (elements.length === 0) return;

	const getOffset = (total, percent) => {
		if (percent <= 0) return 0;
		const result = (total * percent) / 100;
		return total - result;
	};

	elements.forEach(element => {
		const circle = element.querySelector('.fill');
		const total = circle.getTotalLength();
		const percent = circle.dataset.percent || 0;
		circle.setAttribute('stroke-dasharray', total);
		gsap.set(circle, {
			strokeDashoffset: total
		});
		gsap.to(circle, {
			strokeDashoffset: getOffset(total, percent),
			duration: 2,
			delay: 1
		});
	});
})();
