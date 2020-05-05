import gsap from 'gsap';

export default class ActivityChart {
	constructor(container, list, config = {}) {
		if (!container || !list) throw 'AcitityChar - data empty';

		this.loadConfig(config);

		this.container = container;
		this.list = JSON.parse(list).slice(0, this.config.limit);

		this.markup = {};

		this.validateData();
		this.getMarkup();
		this.createChart();
	}

	loadConfig(config) {
		this.config = {
			limit: config.limit || 10
		};
	}

	validateData() {
		if (!'value' in this.list || !'label' in this.list)
			throw 'AcitityChar - invalid data format';
	}

	getMarkup() {
		this.markup = this.container.querySelector('.bar');
		this.markup.remove();
		this.markup.classList.remove('hidden');
	}

	getTranscription(value) {
		const declOfNum = (number, titles) => {
			const cases = [2, 0, 1, 1, 1, 2];
			return titles[
				number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
			];
		};
		const trans = ['Час', 'Часа', 'Часов'];
		return declOfNum(value, trans);
	}

	isLeftContainer(element) {
		return this.container.getBoundingClientRect().y > element.getBoundingClientRect().y;
	}

	createChart() {
		const maximum = [...this.list].sort((x, y) => y.value - x.value)[0].value;

		const tl = gsap.timeline({
			delay: 1.1
		});
		tl.resume();

		this.list.forEach(item => {
			const markup = this.markup.cloneNode(true);

			const inner = markup.querySelector('.inner');
			const label = markup.querySelector('.label');
			inner.style.height = parseInt((item.value / maximum) * 100) + '%';
			label.innerHTML = item.label;
			markup.querySelector('.info p').innerHTML = item.value;
			markup.querySelector('.info span').innerHTML = this.getTranscription(item.value);

			this.container.appendChild(markup);

			const tooltip = markup.querySelector('.info');
			if (this.isLeftContainer(tooltip)) tooltip.classList.add('bottom');

			gsap.set(inner, { scale: 0 });
			gsap.set(label, { scale: 0 });
			tl.add(
				gsap.to(inner, {
					duration: 0.3,
					scale: 1
				}),
				'-=0.1'
			);
			tl.add(
				gsap.to(label, {
					duration: 0.3,
					scale: 1
				}),
				'-=0.3'
			);
		});

		tl.play();
	}
}
