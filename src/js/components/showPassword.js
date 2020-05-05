export default class ShowPassword {
	constructor(button, input) {
		if (!button || !input) throw 'Элементы не найдены';
		this.button = button;
		this.input = input;
		button.addEventListener('click', () => this.toggleAttribute());
	}
	toggleAttribute() {
		const status = this.input.getAttribute('type') === 'text';
		this.input.setAttribute('type', status ? 'password' : 'text');
		status ? this.button.classList.remove('active') : this.button.classList.add('active');
	}
}

export class foo {
	constructor() {
		console.log('foo');
	}
}
export class bar {
	constructor() {
		console.log('bar');
	}
}
