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


export default toggleMenu;