window.addEventListener('DOMContentLoaded', () => {


    //таймер
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
            let timer = getTimeRemaining(),
                idInterval;
    
            if ( timer.timeRemaining > 0 ){
                timerHours.textContent = addZero(timer.hours);
                timerMinutes.textContent = addZero(timer.minutes);
                timerSeconds.textContent = addZero(timer.seconds);
                idInterval = setInterval(updateClock, 1000);}
            else{
                timerHours.textContent = '00'; 
                timerMinutes.textContent = '00'; 
                timerSeconds.textContent = '00';   
            }
        }

        updateClock();
            

    }

    countTimer('10 nov 2020');
});

