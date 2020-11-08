window.addEventListener('DOMContentLoaded', () => {


    //таймер
    function countTimer(deadline) {
        const hours = document.querySelector('#timer-hours'),
            minutes = document.querySelector('#timer-minutes'),
            seconds = document.querySelector('#timer-seconds'),
            dateStop = new Date(deadline).getTime,
            dateNow = new Date().getTime;
    }

    countTimer('01 july 2019');
});
