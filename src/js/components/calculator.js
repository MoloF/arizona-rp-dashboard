import gsap from 'gsap';

export default (function () {
	const buttons = document.querySelectorAll('.calculator-header .block');
	const forms = document.querySelectorAll('.calculator-body .block');

	const buttonHandle = function () {
		const id = this.dataset.target;
		buttons.forEach((button) =>
			button.classList.contains('active') ? button.classList.remove('active') : null
		);
		if (this.classList.contains('active')) return;
		this.classList.add('active');
		forms.forEach((form) => {
			const contains = form.classList.contains('active');

			if (contains && form.id === id) return;

			if (contains && form.id !== id) {
				form.classList.remove('active');
				gsap.set(form, {
					display: 'none',
				});
			}

			if (form.id === id) {
				form.classList.add('active');
				gsap.set(form, {
					display: 'flex',
				});
			}
		});
	};

	buttons.forEach((button) => button.addEventListener('click', buttonHandle));
})();
