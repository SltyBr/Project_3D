const togglePopup = () =>{

  function animate({timing, draw, duration}) { // паттерн анимации
    let start = performance.now();	
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {timeFraction = 1;}
      let progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content'),
      docElem = document.documentElement;


popupBtn.forEach((item)=>{
  item.addEventListener('click', ()=>{
    if (docElem.scrollWidth < 769){
      popup.style.display = 'block';
    } else {
      popup.style.display = 'block';
      animate({
        duration: 600,
        timing(timeFraction) {
            return 1 - Math.sin(Math.acos(timeFraction));
        },
        draw(progress) {
            popupContent.style.opacity = progress;
        }
      });
      }
  });
});

  popup.addEventListener('click', (event)=>{
    let target = event.target;

    if(target.classList.contains('popup-close')){
      popup.style.display = 'none';
    } else{target = target.closest('.popup-content');
    if(!target){
      popup.style.display = 'none';
    }}
  });
};

export default togglePopup;