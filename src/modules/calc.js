const calc = (price = 100)=>{

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

  const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

  const calcDigitsOnly = ()=>{ // функция, которая пропускает только цифры
    const calc = document.querySelector('.calc'),
          calcInputs = calc.querySelectorAll('input');

    calcInputs.forEach((item)=>{
      item.addEventListener('input', ()=>{
        item.value = item.value.replace(/\D/g, '');
      });
    });
  };
  calcDigitsOnly();

  const countSum = ()=>{
    let total = 0,
        countValue = 1,
        dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value,
          squareValue = +calcSquare.value;

      if(calcCount.value > 1){
        countValue += (calcCount.value - 1) / 10;
      }

      if(calcDay.value < 5 && calcDay.value){
        dayValue *= 2;
      } else if(calcDay.value < 10 && calcDay.value){
        dayValue *= 1.5;
      }

      if(typeValue && squareValue){
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      animate({
        duration: 300,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          totalValue.textContent = Math.ceil(progress*total);
        }
      });				
  };

  calcBlock.addEventListener('change', (event)=>{
    const target = event.target;
    if((target === calcType || target === calcSquare || target === calcCount || target === calcDay)){
      countSum();
    }
  });
};

export default calc;