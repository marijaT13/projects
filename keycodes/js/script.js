window.onload=function(){
    const title = document.querySelector('.title');
    const code = document.querySelector('.code');
    const key = document.querySelector('.key');

    key.style.display = 'none';

    window.addEventListener('keydown', function(e){
        key.style.display='block';
        code.innerHTML="";
        key.innerHTML="";


        console.log(e.keyCode);
        console.log(e.key);
        console.log(e);

        if(e.key === 'Tab' || e.key === ' ' || e.key === 'Enter' || e.key === 'Shift' || e.key === 'Meta' || e.key === 'Backspace' || e.key === 'Control' || e.key === 'CapsLock' || e.key ==='Delete'){
            key.classList.add('adjust-text');
        } else if(e.key === 'Escape' || e.key === 'AltLeft' ||e.key === 'Meta'){
            key.classList.add('adjust-text');
        } else {
            key.classList.remove('adjust-text');
        }
            var keyCode= this.document.createTextNode(e.keyCode);
            var keyPressed = this.document.createTextNode(e.key);
            if(e.keyCode===32){
                keyPressed= this.document.createTextNode("Space");
            }else if (e.keyCode===91){
                keyPressed = this.document.createTextNode("Command");
            }
            code.appendChild(keyCode);
            key.appendChild(keyPressed);

            title.style.display='none';
    })
};