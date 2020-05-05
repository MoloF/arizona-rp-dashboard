import gsap from 'gsap';
import SwipeEventDispatcher from '../plugins/swiped-events';

export default (function () {
	const duration = 1;
	const navigation = document.querySelector('aside.navigation');
	let navigationBound = navigation.getBoundingClientRect();
	const container = document.querySelector('main.content');
	const isLocal = !!localStorage.getItem('nav-is-open');

	const dispatcher = new SwipeEventDispatcher(document.body);

	const toggleNavigation = (state, instantly = false) => {
		if (instantly) gsap.set(navigation, { translateX: state ? '-100%' : 0 });
		else gsap.to(navigation, duration, { translateX: state ? '-100%' : 0 });
	};
	const toggleContainer = (state, instantly = false) => {
		if (instantly) gsap.set(container, { marginLeft: state ? 0 : navigationBound.width });
		else gsap.to(container, duration, { marginLeft: state ? 0 : navigationBound.width });
	};

	toggleNavigation(isLocal, true);
	toggleContainer(isLocal, true);

	window.onresize = () => {
		navigationBound = navigation.getBoundingClientRect();
		toggleNavigation(isLocal, true);
		toggleContainer(isLocal, true);
	};

	dispatcher.on('swipedRight', () => {
		localStorage.removeItem('nav-is-open');
		toggleNavigation(false);
		toggleContainer(false);
	});
	dispatcher.on('swipedLeft', () => {
		localStorage.setItem('nav-is-open', true);
		toggleNavigation(true);
		toggleContainer(true);
	});
})();
