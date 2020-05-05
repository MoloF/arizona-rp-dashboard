export default class SwipeEventDispatcher {
	constructor(element, options = {}) {
		this.evtMap = {
			swipedLeft: [],
			swipedUp: [],
			swipedDown: [],
			swipedRight: [],
		};

		this.xDown = null;
		this.yDown = null;
		this.element = element;
		this.isMouseDown = false;
		this.listenForMouseEvents = true;
		this.options = Object.assign({ triggerPercent: 0.3 }, options);

		element.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
		element.addEventListener('touchend', (e) => this.handleTouchEnd(e), false);
		element.addEventListener('mousedown', (e) => this.handleMouseDown(e), false);
		element.addEventListener('mouseup', (e) => this.handleMouseUp(e), false);
	}

	on(e, cb) {
		this.evtMap[e].push(cb);
	}

	off(e, lcb) {
		this.evtMap[e] = this.evtMap[e].filter((cb) => cb !== lcb);
	}

	trigger(e, data) {
		this.evtMap[e].map((handler) => handler(data));
	}

	handleTouchStart(e) {
		this.xDown = e.touches[0].clientX;
		this.yDown = e.touches[0].clientY;
	}

	handleMouseDown(e) {
		if (this.listenForMouseEvents == false) return;
		this.xDown = e.clientX;
		this.yDown = e.clientY;
		this.isMouseDown = true;
	}

	handleMouseUp(e) {
		if (this.isMouseDown == false) return;
		const deltaX = e.clientX - this.xDown;
		const deltaY = e.clientY - this.yDown;
		const distMoved = Math.abs(Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY);
		const activePct = distMoved / this.element.offsetWidth;

		if (activePct > this.options.triggerPercent)
			Math.abs(deltaX) > Math.abs(deltaY)
				? deltaX < 0
					? this.trigger('swipedLeft')
					: this.trigger('swipedRight')
				: deltaY > 0
				? this.trigger('swipedUp')
				: this.trigger('swipedDown');
	}

	handleTouchEnd(e) {
		const deltaX = e.changedTouches[0].clientX - this.xDown;
		const deltaY = e.changedTouches[0].clientY - this.yDown;
		const distMoved = Math.abs(Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY);
		const activePct = distMoved / this.element.offsetWidth;

		if (activePct > this.options.triggerPercent)
			Math.abs(deltaX) > Math.abs(deltaY)
				? deltaX < 0
					? this.trigger('swipedLeft')
					: this.trigger('swipedRight')
				: deltaY > 0
				? this.trigger('swipedUp')
				: this.trigger('swipedDown');
	}
}
