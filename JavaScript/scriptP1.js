const linkQuizzes = "https://mock-api.driven.com.br/api/vs/buzzquizz/quizzes";
let dataQuizz;
let idsMyQuizzes = [];
/*
const exemploSerializado = JSON.stringify(exemplo); // Array convertida pra uma string

localStorage.setItem("tOtaco", exemploSerializado); // Armazenando a string na chave "lista" do Local Storage
*/
const listaSerializada = localStorage.getItem("tOtaco"); // Pegando de volta a string armazenada na chave "lista"

let myQuizzes = JSON.parse(listaSerializada); // Transformando a string de volta na array original

openLoading();

function openTela (fecha , abre){
    openLoading();
    document.querySelector(`.${fecha}`).classList.toggle('escondido');
    document.querySelector(`.${abre}`).classList.toggle('escondido');
    acertos =0;
}

function openLoading (){
    document.querySelector(`.telaLoading`).classList.remove('escondido');
    setTimeout(closeLoading, 2000);
}

function closeLoading (){
    document.querySelector(`.telaLoading`).classList.add('escondido');
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
    dataQuizzfilter = dataQuizz.filter(filtraQuizzUser);
    const divQuizzes = document.querySelector('.todosQuizzes .blocoQuizzes');
    divQuizzes.innerHTML = "";

    for(let i = 0; i < dataQuizzfilter.length; i++){
        divQuizzes.innerHTML +=`
    <div class="caixaQuizz" onclick="openQuizz('${dataQuizzfilter[i].id}');openTela('conteudoTela_1','conteudoTela_2');">
        <img src=${dataQuizzfilter[i].image}>
        <div><h3>${dataQuizzfilter[i].title}</h3></div>
        </div>`;
    }
}

function renderizaMeusQuizzes () {
    if(myQuizzes !== null){
        if( myQuizzes.length > 0) {
            document.querySelector('.caixaCriarQuizz').classList.add('escondido');
            document.querySelector('.seusQuizzes').classList.remove('escondido');
            const divQuizzes = document.querySelector('.seusQuizzes .blocoQuizzes');
            divQuizzes.innerHTML = "";
            idsMyQuizzes = [];
            for(let i = 0; i < myQuizzes.length; i++){
                divQuizzes.innerHTML +=`
                <div class="caixaQuizz" onclick="rederizaMyQuizzes(myQuizzes, '${myQuizzes[i].id}');openTela('conteudoTela_1','conteudoTela_2');">
                <img src=${myQuizzes[i].image} >
                <div><h3>${myQuizzes[i].title}</h3></div>
                </div>`;
                idsMyQuizzes.push(myQuizzes[i].id);
            }
        }
    }
    else {
        document.querySelector('.seusQuizzes').classList.add('escondido');
            
    }
}

function filtraQuizzUser (obj){
    for(let i = 0; i < idsMyQuizzes.length; i++){
        if(obj.id === idsMyQuizzes[i]){
            console.log(idsMyQuizzes[i]);
            return false;
        }
    }
    return true;
}

getQuizzes();