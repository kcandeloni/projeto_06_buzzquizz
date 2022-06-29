function openTela (fecha , abre){
    document.querySelector(`.${fecha}`).classList.toggle('escondido');
    document.querySelector(`.${abre}`).classList.toggle('escondido');
}