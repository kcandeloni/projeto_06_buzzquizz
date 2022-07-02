const linkQuizzes = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let dataQuizz;
/*
const exemplo = [{
id: 3263,
title: "Quanto otaku você é?",
image: "http://3.bp.blogspot.com/-P_gTm8O4e34/UG79eZn6EBI/AAAAAAAAAW8/2-VKPd2oHzg/s1600/otaku.jpg",
questions: [
{
title: "Qual o melhor anime de todos os tempos???",
color: "#FA4D7E",
answers: [
{
text: "anime da menina que vira doguin... Muito trissste",
image: "https://c.tenor.com/ra1G9oMn69EAAAAC/fullmetal-alchemist.gif",
isCorrectAnswer: true
},
{
text: "anime dos cara que fica platinado do nada...",
image: "https://i.pinimg.com/originals/ef/84/ac/ef84acb8d7cc38bf91542e19de46c938.jpg",
isCorrectAnswer: false
},
{
text: "anime que só tem reprise",
image: "https://upload.wikimedia.org/wikipedia/pt/b/be/Personagens_de_Naruto.jpg",
isCorrectAnswer: false
},
{
text: "anime de rinha de animais (isso é ilegal)",
image: "http://www.techtudo.com.br/platb/files/2177/2011/03/Pok%C3%A9mon.jpg",
isCorrectAnswer: false
}
]
},
{
title: "Qual desses eventos você já participou???",
color: "#FA4D7E",
answers: [
{
text: "Corrida de naruto",
image: "https://cdn6.campograndenews.com.br/uploads/noticias/2020/03/10/zcbmriy0hpem.jpg",
isCorrectAnswer: true
},
{
text: "Fez cosplay de Slipknot e acho que era anime",
image: "https://i.ytimg.com/vi/0DlwBb4ULBU/hqdefault.jpg",
isCorrectAnswer: false
},
{
text: "Participou do Globo Esporte",
image: "https://pbs.twimg.com/media/E7CpPlDWEAUbYrL.jpg",
isCorrectAnswer: false
},
{
text: "Foi em eventos Otaku",
image: "https://pm1.narvii.com/6497/ccd1aa9f3bfbc4584524181b70f8d22eabfd56ee_hq.jpg",
isCorrectAnswer: false
}
]
},
{
title: "Já fez cosplay de??????",
color: "#FA4D7E",
answers: [
{
text: "Cosplay do anime do piratinha que estica",
image: "https://rollingstone.uol.com.br/media/uploads/one-piece-live-action-series-seemingly-coming-to-netflix_1fcz.h720.jpg",
isCorrectAnswer: true
},
{
text: "Cosplay de adulto",
image: "http://s2.glbimg.com/p1orv6O7HXBVprJXZpHPWrpxuMc=/620x350/e.glbimg.com/og/ed/f/original/2015/08/27/inadimplencia-shutterstock.jpg",
isCorrectAnswer: false
},
{
text: "Cosplay da semana de projetão num bootcamp",
image: "https://st.depositphotos.com/1007963/4390/i/600/depositphotos_43902395-stock-photo-stressed-overworked-man-studying.jpg",
isCorrectAnswer: false
},
{
text: "Cosplay de Vovo Juju largada no sofá",
image: "https://i.ytimg.com/vi/ImQHAYgeL5E/maxresdefault.jpg",
isCorrectAnswer: false
}
]
}
],
levels: [
{
title: "Otaku Master..................................................",
minValue: 66,
image: "https://ptanime.com/wp-content/uploads/2015/10/Umarunnnn-1024x576.jpg",
text: "Você é realmente um(a) Otaku legítimo(a). Já pode comprar seu headset com orelhinha de gatin e itens de cosplay na shoppee"
},
{
title: "Farsa total..............................",
minValue: 0,
image: "https://i.ibb.co/bNc2mV9/PHOTO-2022-04-18-22-10-10.jpg",
text: "Você não é otaku, é só modinha... Igual o fesso............................."
}
]
}];

const exemploSerializado = JSON.stringify(exemplo); // Array convertida pra uma string

localStorage.setItem("tOtaco", exemploSerializado); // Armazenando a string na chave "lista" do Local Storage
*/
const listaSerializada = localStorage.getItem("tOtaco"); // Pegando de volta a string armazenada na chave "lista"

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
    if(myQuizzes !== null){
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
    }
    else {
        document.querySelector('.seusQuizzes').classList.add('escondido');
            
    }
}

getQuizzes();