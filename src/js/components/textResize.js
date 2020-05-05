export default (function () {
	function fontSizeResize() {
		const container = this.parentElement;
		const containerWidth =
			Math.ceil(
				container.getBoundingClientRect().width -
					parseFloat(getComputedStyle(container).padding) || 0
			) * 0.95;
		let elementWidth = this.getBoundingClientRect().width;

		while (elementWidth >= containerWidth) {
			const fontSize = parseFloat(getComputedStyle(this).fontSize);
			if (fontSize <= 0) break;
			this.style.fontSize = fontSize - 1 + 'px';
			elementWidth = this.getBoundingClientRect().width;
		}
	}

	const fontSizeResizeAll = () =>
		document.querySelectorAll('.text-resize').forEach((el) => fontSizeResize.call(el));

	fontSizeResizeAll();
	window.addEventListener('textResize', fontSizeResizeAll);
	window.onload = fontSizeResizeAll;
	window.onresize = fontSizeResizeAll;
})();
