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

export default changePhoto;