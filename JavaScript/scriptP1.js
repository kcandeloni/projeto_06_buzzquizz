const linkQuizzes = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
let dataQuizz;

/*
const exemplo = objeto gerado tela 3;

const exemploSerializado = JSON.stringify(exemplo); // Array convertida pra uma string

localStorage.setItem("lista", exemploSerializado); // Armazenando a string na chave "lista" do Local Storage
*/
const listaSerializada = localStorage.getItem("lista"); // Pegando de volta a string armazenada na chave "lista"

let myQuizzes = JSON.parse(listaSerializada); // Transformando a string de volta na array original

console.log(myQuizzes);

function openTela (fecha , abre){
    document.querySelector(`.${fecha}`).classList.toggle('escondido');
    document.querySelector(`.${abre}`).classList.toggle('escondido');
}

function comparador() { 
	return Math.random() - 0.5; 
}

function getQuizzes () {
    const promise = axios.get(`${linkQuizzes}`);

    promise
            .then(listaQuizzes)
            .catch(alertaErro);
}

function listaQuizzes (baseQuizz) {
    dataQuizz = baseQuizz.data;
    renderizaMeusQuizzes();
    renderizaQuizzes();
}

function alertaErro (erro) {
    console.log(erro);
}

function renderizaQuizzes () {
    const divQuizzes = document.querySelector('.todosQuizzes .blocoQuizzes');
    divQuizzes.innerHTML = "";

    for(let i = 0; i < dataQuizz.length; i++){
        divQuizzes.innerHTML +=`
        <div class="caixaQuizz" onclick="openQuizz('${dataQuizz[i].id}');openTela('conteudoTela_1','conteudoTela_2');">
        <img src=${dataQuizz[i].image} >
        <h3>${dataQuizz[i].title}</h3>
        </div>`;
    }
}

function renderizaMeusQuizzes () {
    if( myQuizzes.length > 0) {
        document.querySelector('.caixaCriarQuizz').classList.add('escondido');
        document.querySelector('.seusQuizzes').classList.remove('escondido');
        const divQuizzes = document.querySelector('.seusQuizzes .blocoQuizzes');
        divQuizzes.innerHTML = "";

        for(let i = 0; i < myQuizzes.length; i++){
            divQuizzes.innerHTML +=`
            <div class="caixaQuizz" onclick="openQuizz('${myQuizzes[i].id}');openTela('conteudoTela_1','conteudoTela_2');">
            <img src=${myQuizzes[i].image} >
            <h3>${myQuizzes[i].title}</h3>
            </div>`;
            }
    }
    else {
        document.querySelector('.seusQuizzes').classList.add('escondido');
            
    }
}

getQuizzes();