const linkQuizzes = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
let dataQuizz;
let myQuizzes = [];


function openTela (fecha , abre){
    document.querySelector(`.${fecha}`).classList.toggle('escondido');
    document.querySelector(`.${abre}`).classList.toggle('escondido');
}

function getQuizzes () {
    const promise = axios.get(`${linkQuizzes}`);

    promise
            .then(listaQuizzes)
            .catch(alertaErro);
}

function listaQuizzes (baseQuizz) {
    dataQuizz = baseQuizz.data;
    renderizaQuizzes();
    renderizaMeusQuizzes();
}

function alertaErro (erro) {
    console.log(erro);
}

function renderizaQuizzes () {
    const divQuizzes = document.querySelector('.todosQuizzes .blocoQuizzes');
    divQuizzes.innerHTML = "";

    for(let i = 0; i < dataQuizz.length; i++){
        console.log(dataQuizz[1]);
        divQuizzes.innerHTML +=`
        <div class="caixaQuizz" onclick="openQuizz('${dataQuizz[i].id}');openTela('conteudoTela_1','conteudoTela_2');">
        <img src=${dataQuizz[i].image} >
        <h3>${dataQuizz [i].title}</h3>
        </div>`;
    }
}

function renderizaMeusQuizzes () {
    /* myQuizzes.push(dataQuizz.filter(function(elem){if(elem.id.includes(localStorage.getItem(elem.id))){return true}}else false))*/
    if( myQuizzes.length > 0) {
        document.querySelector('.caixaCriarQuizz').classList.add('escondido');
        document.querySelector('.seusQuizzes').classList.remove('escondido');
    }
    else {
        document.querySelector('.seusQuizzes').classList.add('escondido');
        //renderizaQuizzes(myQuizzes); dataQuizzes = dataquizzes.filter()
    }
}

getQuizzes();