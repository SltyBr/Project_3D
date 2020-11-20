const carouselSlider = ()=>{

  class SliderCarousel{
    constructor({
      main, 
      wrap,
      next,
      prev,
      position = 0,
    }){
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelector(wrap).children;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.options = {
        position
      };
    }
    init(){
      this.addGloClass();
      this.addStyle();
      
      if(this.prev && this.next){
        this.constrolSlider();
      } else{
        this.addArrow();
        this.constrolSlider();
      }
    }

    addGloClass() {
      this.main.classList.add('glo-slider');
      this.main.classList.add('glo-slider__wrap');
      for (const item of this.slides){
        item.classList.add('glo-slider__item');
      }
    }

    addStyle(){
      const style = document.createElement('style');
      style.id = 'sliderCarousel-style';
      style.textContent = `
        .glo-slider{
          overflow: hidden !important;
        }
        .glo-slider__wrap{
          display: flex !important;
          transition: transform 0.5s !important;
          will-change: transform !important;
        }

        .glo-slider__item{
          flex: 0 0 25% !important;
          margin: auto 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    constrolSlider(){
      this.prev.addEventListener('click', )
      this.next.addEventListener('click', )
    }

    addArrow(){

    }
  }

  const options = {
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    prev: '#test-left',
    next: '#test-right'
  };

  const slider = new SliderCarousel(options);

  slider.init();
};

export default carouselSlider;