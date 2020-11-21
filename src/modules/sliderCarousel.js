class SliderCarousel {
	constructor({
		main,
		wrap,
		next,
		prev,
		infinity = false,
		position = 0,
		slidersToShow = 3,
		responsive = []
	}) {
		this.main = document.querySelector(main);
		this.wrap = document.querySelector(wrap);
		this.slides = document.querySelector(wrap).children;
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);
		this.slidersToShow = slidersToShow;
		this.options = {
			position,
			infinity,
			widthSlide: Math.floor(100 / slidersToShow)
		};
		this.responsive = responsive;
	}

init() {
	this.addGloClass();
	this.addStyle();

	if (this.prev && this.next) {
		this.controlSlider();
	} else {
		this.addArrow();
		this.controlSlider();
	}
	if (this.responsive) {
		this.responseInit();
	}
}

addGloClass() {
	this.main.classList.add('carousel-slider');
	this.wrap.classList.add('carousel-slider__wrap');
	for (const item of this.slides) {
		item.classList.add('carousel-slider__item');
	}
}

addStyle() {
	let style = document.getElementById('sliderCarousel-style');
	if (!style) {
		style = document.createElement('style');
		style.id = 'sliderCarousel-style';
	}
	style.textContent = `
		.carousel-slider {
			overflow: hidden !important;
		}
		.carousel-slider__wrap {
			display: flex !important;
			transition: transform 0.5s !important;
			will-change: transfrom !important;
		}
		.carousel-slider__item {
			display: flex !important;
			align-items: center;
			justify-content: center;
			flex: 0 0 ${this.options.widthSlide}% !important;
			margin: auto 0 !important;
		}
	`;
	document.head.append(style);
}

controlSlider() {
	this.prev.addEventListener('click', this.prevSlider.bind(this));
	this.next.addEventListener('click', this.nextSlider.bind(this));
}

prevSlider() {
	if (this.options.infinity || this.options.position > 0) {
		--this.options.position;
		if (this.options.position < 0) {
			this.options.position = this.slides.length - this.slidersToShow;
		}
		this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
	}
}

nextSlider() {
	if (this.options.infinity || this.options.position < this.slides.length - this.slidersToShow) {
		++this.options.position;
		if (this.options.position > this.slides.length - this.slidersToShow) {
			this.options.position = 0;
		}
		this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
	}
}

addArrow() {
	this.prev = document.createElement('button');
	this.next = document.createElement('button');

	this.prev.className = 'carousel-slider__prev';
	this.next.className = 'carousel-slider__next';

	this.main.append(this.prev);
	this.main.append(this.next);

	const style = document.createElement('style');
	style.textContent = `
		.carousel-slider__prev,
		.carousel-slider__next {
			margin: 0 10px;
			border: 20px solid transparent;
			background: transparent;
		}
		.carousel-slider__next {
			border-left-color: #19b5fe;
		}
		.carousel-slider__prev {
			border-right-color: #19b5fe;
		}
		.carousel-slider__prev:hover,
		.carousel-slider__next:hover,
		.carousel-slider__prev:focus,
		.carousel-slider__next:focus {
			background: transparent;
			outline: transparent;
		}
		`;
	document.head.append(style);
}

responseInit() {
	const slidersToShowDefault = this.slidersToShow;
	const allResponse = this.responsive.map(item => item.breakpoint);
	const maxResponse = Math.max(...allResponse);

	const checkResponse = () => {
		const widthWindow = document.documentElement.clientWidth;
		if (widthWindow < maxResponse) {
			for (let i = 0; i < allResponse.length; i++) {
				if (widthWindow < allResponse[i]) {
					this.slidersToShow = this.responsive[i].slidersToShow;
					this.options.widthSlide = Math.floor(100 / this.slidersToShow);
					this.addStyle();
				}
			}
		} else {
			this.slidersToShow = slidersToShowDefault;
			this.options.widthSlide = Math.floor(100 / this.slidersToShow);
			this.addStyle();
		}
	};

		checkResponse();

		window.addEventListener('resize', checkResponse);
	}
}

  const carousel = new SliderCarousel({
		main: '.companies-wrapper',
		wrap: '.companies-hor',
		slidersToShow: 4,
		infinity: true,
		responsive: [{
				breakpoint: 1024,
				slidersToShow: 3
		},
		{
			breakpoint: 768,
			slidersToShow: 2
		},
		{
			breakpoint: 576,
			slidersToShow: 1
		}
		]
  });



export default carousel;