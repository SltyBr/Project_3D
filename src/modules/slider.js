const slider = ()=>{
  const slide = document.querySelectorAll('.portfolio-item'),
    slider = document.querySelector('.portfolio-content'),
    portfolioDots = document.querySelector('.portfolio-dots');
  let dot = document.querySelectorAll('.dot'),
    currentSlide = 0,
    interval;

  const createList = ()=>{ // функция создания списка, в зависимости от количества слайдов
    for (let i = 0; i < slide.length; i++){
      let dots = document.createElement('li');
      dots.classList.add('dot');
      portfolioDots.insertAdjacentElement('beforeend', dots);
      if (i === currentSlide){
        dots.classList.add('dot-active');
      }
    }
    return (dot = document.querySelectorAll('.dot'));
  };
  createList();

  const prevSlide = (elem, index, strClass)=>{
    elem[index].classList.remove(strClass);
  };	

  const nextSlide = (elem, index, strClass)=>{
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = ()=>{
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000)=>{
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = ()=>{
    clearInterval(interval);
  };

   slider.addEventListener('click', (event)=>{
    event.preventDefault();
    let target = event.target;
    if (!target.matches('.portfolio-btn, .dot')){
      return;
    }
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');

    if(target.matches('#arrow-right')){
      currentSlide++;
    } else if(target.matches('#arrow-left')){
      currentSlide--;
    } else if(target.matches('.dot')){
      dot.forEach((element, index)=>{
        if (element === target){
          currentSlide = index;
        }
      });
    }
    if(currentSlide >= slide.length){
      currentSlide = 0;
    }else if (currentSlide < 0){
      currentSlide = slide.length - 1;
    }

    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  });

  slider.addEventListener('mouseover', (event)=>{
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
      stopSlide();
    }
  });
  slider.addEventListener('mouseout', (event)=>{
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
      startSlide();
    }
  });

  startSlide();
  
};

export default slider;