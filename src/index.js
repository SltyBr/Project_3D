'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import "element-closest-polyfill";
import "smoothscroll-polyfill";
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePhoto from './modules/changePhoto';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import sliderCarousel from './modules/sliderCarousel';

  //timer
	countTimer();

	//menu
	toggleMenu();

	// popup
	togglePopup();

	// tabs
	tabs();

	//slider
	slider();

	// смена фото
	changePhoto();

	// калькулятор
	calc();

  //send-ajax=form
  sendForm('form1');
  sendForm('form2');
	sendForm('form3');
	
	sliderCarousel();