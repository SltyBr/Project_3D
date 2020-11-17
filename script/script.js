window.addEventListener('DOMContentLoaded', () => {

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

	//timer
	function countTimer(deadline) {
			const timerHours = document.querySelector('#timer-hours'),
					timerMinutes = document.querySelector('#timer-minutes'),
					timerSeconds = document.querySelector('#timer-seconds');


			function getTimeRemaining(){
					let dateStop = new Date(deadline).getTime(),
							dateNow = new Date().getTime(),
							timeRemaining = (dateStop - dateNow) / 1000,
							seconds = Math.floor(timeRemaining % 60),
							minutes = Math.floor((timeRemaining / 60) % 60),
							hours = Math.floor((timeRemaining / 3600));
					return {timeRemaining, hours, minutes, seconds};
			}
			
			const addZero = ((a)=>{
					if (a < 10 && a >= 0){
							a = '0' + a;
					}
					return a;
			});
			
			function updateClock(){
					let timer = getTimeRemaining();
	
					if ( timer.timeRemaining > 0 ){
							timerHours.textContent = addZero(timer.hours);
							timerMinutes.textContent = addZero(timer.minutes);
							timerSeconds.textContent = addZero(timer.seconds);
					}
					else{
							timerHours.textContent = '00'; 
							timerMinutes.textContent = '00'; 
							timerSeconds.textContent = '00';   
					}
			}
			updateClock();
			setInterval(updateClock, 1000);

					

	}

	countTimer('16 nov 2020');

//menu
const toggleMenu = ()=>{
	const menu = document.querySelector('menu'),
				menuBtn = document.querySelector('.menu'),
				closeBtn = document.querySelector('.close-btn'),
				serviceBtn = document.querySelector('main>a');
		
	const handlerMenu = ()=>{
		menu.classList.toggle('active-menu');
	};

	document.addEventListener('click', (event)=>{
		let target = event.target;
		if(target.closest('.menu') === menuBtn || target === closeBtn){
			handlerMenu();
		}else if(target.matches('a[href^="#"]')){
			event.preventDefault();
			const blockId = target.getAttribute('href');
			if(blockId !== '#close' && blockId.length > 2){
			document.querySelector(`${blockId}`).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
			handlerMenu();
		}
		}else if (target.closest('main>a') === serviceBtn){
			event.preventDefault();
			const blockId = target.closest('main>a').getAttribute('href');
 			if(blockId !== '#close'){
			document.querySelector(`${blockId}`).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});}
		}
	});
};
toggleMenu();

	// popup
	const togglePopup = () =>{
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
	togglePopup();

	// tabs

	const tabs = ()=>{
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

	const toggleTabContent = (index) =>{
		for (let i = 0; i < tabContent.length; i++){
			if (index === i){
				tab[i].classList.add('active');
				tabContent[i].classList.remove('d-none');
			} else{
				tab[i].classList.remove('active');
				tabContent[i].classList.add('d-none');
			}
		}
	};

	tabHeader.addEventListener('click', (event)=>{
			let target = event.target;
					target = target.closest('.service-header-tab');				
			if (target){
					tab.forEach((item, i)=>{
							if(item === target){
									toggleTabContent(i);
							}
					});
			}				
		});
	};
	tabs();

	//slider

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
	slider();

	// смена фото
	const changePhoto = ()=>{
		const command = document.getElementById('command');

		const mouseOver = event => {
			const target = event.target;
			if (target.matches('.command__photo')) {
				target.dataset.image = target.src;
				target.src = target.dataset.img;
			}
		};
		const mouseOut = event => {
			const target = event.target;
			if (target.matches('.command__photo')) {
				target.src = target.dataset.image;
			}
		};

		command.addEventListener('mouseover', mouseOver);
		command.addEventListener('mouseout', mouseOut);
	};
	changePhoto();

	// калькулятор
	const calc = (price = 100)=>{

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
	calc();

		//send-ajax=form

		const sendForm = (formId)=>{
			const successMessage = 'Мы скоро с Вами свяжемся!',
						loadMessage = 'Загрузка...';
	
			const form = document.getElementById(`${formId}`),
						formInputs = form.querySelectorAll('input');
	
	
			formInputs.forEach((item)=>{ // определяем валидацию символов ввода
				if (item.classList.contains('form-email')){
					item.required = true;
				}
				item.addEventListener('input', ()=>{
				if (item.classList.contains('form-phone')){
					item.value = item.value.replace (/[^0-9+]/, '');
				}
				if (item.classList.contains('form-name')){
					item.value = item.value.replace(/[^а-я ]/gi, '');
				}
				if (item.classList.contains('mess')){
					item.value = item.value.replace(/[^а-я \W\d_]/gi, '');
				}
				});
			});
	
			form.addEventListener('submit', (event)=>{
				event.preventDefault();
				let body = {};
				const messageContent = (content)=>{  // функция создания сообщения о статусе заявки
					let successMessage = document.createElement('div');
						successMessage.style.cssText = 'font-size: 2rem; color: #19b5fe';
						successMessage.textContent = content;
					return successMessage;
				}
				const successMessageContent = messageContent(successMessage);
				const loadMessageContent = messageContent(loadMessage);
				form.append(loadMessageContent);
	
				const formData = new FormData(form);
	
				formData.forEach((val, key)=>{
					body[key] = val;
				});
				postData(body)
					.then((response)=>{
						if (response.status !== 200) {
							throw new Error('status network not 200.');
						}
						form.removeChild(loadMessageContent);
						form.append(successMessageContent);
					})
					.catch((error)=>{
						console.error(error);
					});
	
				const clearFormInputs = ()=>{ 
					formInputs.forEach((item)=>{
						item.value = '';
					})
				}
				setTimeout(clearFormInputs, 3000);
	
				const clearStatusMessage = ()=>{
					setTimeout(function(){
						form.removeChild(successMessageContent);
					}, 5000);
				};
				clearStatusMessage();
			});
	
			const postData = body => fetch('./server.php', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});
	
		};
		sendForm('form1');
		sendForm('form2');
		sendForm('form3');
});
