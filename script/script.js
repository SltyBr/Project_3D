window.addEventListener('DOMContentLoaded', () => {

	function animate({timing, draw, duration}) { // паттерн анимации

			let start = performance.now();
		
			requestAnimationFrame(function animate(time) {
				// timeFraction изменяется от 0 до 1
				let timeFraction = (time - start) / duration;
				if (timeFraction > 1) {timeFraction = 1;}
		
				// вычисление текущего состояния анимации
				let progress = timing(timeFraction);
		
				draw(progress); // отрисовать её
		
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

	countTimer('11 nov 2020');

	//menu
	const toggleMenu = ()=>{
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			anchors = document.querySelectorAll('a[href^="#"]');
			
		const handlerMenu = ()=>{
				menu.classList.toggle('active-menu');
		};

		menu.addEventListener('click', (event)=>{
			let target = event.target;
			if(target){
				handlerMenu();
			}
		});
		btnMenu.addEventListener('click', handlerMenu);

		anchors.forEach((item)=>{ // плавная прокрутка по якорям
			item.addEventListener('click', (event)=>{
				event.preventDefault();
				const blockId = item.getAttribute('href');
				if(blockId !== '#close' && blockId.length > 2){
				document.querySelector(`${blockId}`).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});}
			});
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
});

