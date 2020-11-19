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
      item.value = item.value.replace(/[^0-9+]/, '');
    }
    if (item.classList.contains('form-name') || item.matches('#form2-name')){
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

export default sendForm;