const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () =>{
    document.querySelector('body').classList.toggle('darkmode');
})