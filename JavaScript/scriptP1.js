const linkQuizzes = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

function openTela (fecha , abre){
    document.querySelector(`.${fecha}`).classList.toggle('escondido');
    document.querySelector(`.${abre}`).classList.toggle('escondido');
}