import gsap from 'gsap';

export default (function() {
	const numbers = document.querySelectorAll('.num-animate') || [];

	numbers.forEach(number => {
		const counter = { val: 0 };
		const value = number.innerHTML || 0;
		number.innerHTML = '0';
		gsap.to(counter, 2, {
			val: value,
			delay: 1,
			roundProps: 'val',
			onUpdate: () => (number.innerHTML = counter.val)
		});
	});
});
