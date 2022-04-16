import { G_Bus } from './libs/G_Control.js';
import G_G from './libs/G_G.js';

export default class Front extends G_G {
	constructor() {
		super();
		const _ = this;
		G_Bus.on('createOrderSuccess', _.createOrderSuccess.bind(_))
			.on('showMenu', _.showMenu.bind(_))
			.on('hideOverlay', _.hideOverlay.bind(_))
			.on('hideMenuOnClose', _.hideMenuOnClose.bind(_))
			.on('smoothScrool', _.smoothScrool.bind(_));
	}
	createOrderSuccess(orderData) {}
	showMenu(clickData) {
		const menu = document.querySelector('.menu');
		const overlay = document.querySelector('.overlay');
		menu.classList.add('is-active');
		overlay.classList.add('is-active');
		this.disableScroll();
	}
	disableScroll() {
		const body = document.body;
		body.classList.add('no-scroll');
	}
	enableScroll() {
		const body = document.body;
		body.classList.remove('no-scroll');
	}
	hideMenu() {
		const menu = document.querySelector('.menu');
		menu.classList.remove('is-active');
		this.enableScroll();
	}
	hideMenuOnClose() {
		this.overlayClose();
		this.hideMenu();
		this.enableScroll();
	}
	hideOverlay() {
		this.overlayClose();
		this.hideMenu();
		this.enableScroll();
	}
	overlayClose(clickData) {
		const overlay = document.querySelector('.overlay');
		overlay.classList.remove('is-active');
	}
	smoothScrool(clickData) {
		const item = clickData.item;
		const event = clickData.event;
		event.preventDefault();

		const anchorLink = item.getAttribute('href');
		const anchor = document.querySelector(anchorLink);
		anchor.scrollIntoView({
			behavior: 'smooth',
		});
		this.overlayClose();
		this.hideMenu();
		this.enableScroll();
	}
	showTopBtnByScroll() {
		const topBtn = document.querySelector('.top-btn');

		window.addEventListener('scroll', () => {
			if (window.pageYOffset > 1200) {
				topBtn.classList.add('is-active');
			} else {
				topBtn.classList.remove('is-active');
			}
		});
	}
	define() {}
	init() {
		const _ = this;
		window.addEventListener('scroll', () => {
			_.showTopBtnByScroll();
		});
	}
}
new Front();
