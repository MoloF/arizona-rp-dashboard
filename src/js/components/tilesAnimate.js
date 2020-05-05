import { gsap } from 'gsap';

export default (function(elements, options = {}) {
	if (!elements) throw '[tilesAnimate] elements not found.';
	if (typeof elements !== 'object') throw '[tilesAnimate] elements is not object.';

	const translateX = options.translateX || 0;
	const translateY = options.translateY || 0;
	const duration = options.duration || 0.25;
	const delay = options.delay || 0.6;
	const preventDelay = options.preventDelay || 0.1;

	const tl = new gsap.timeline({ delay });
	tl.resume();

	elements.forEach(element => {
		gsap.set(element, {
			translateY,
			translateX,
			opacity: 0,
			pointerEvents: 'none'
		});
		tl.add(
			gsap.to(element, {
				translateX: 0,
				translateY: 0,
				opacity: 1,
				duration,
				onComplete: function() {
					gsap.set(element, {
						pointerEvents: ''
					});
				}
			}),
			`-=${preventDelay}`
		);
	});

	tl.play();
});
