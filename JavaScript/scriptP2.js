let controle = 0;
let contador = 0;
let questoes = [] ;
let opcoes = [];
let idReinicia;
function openQuizz (idQuizz) {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    controle = idQuizz;
    promise.then(rederizaPageQuizz);
    
}


function rederizaPageQuizz (Quizz) {
    contador = 0;
    questoes = [] ;
    opcoes = [];
    idReinicia = Quizz;
    let materialTela2 = Quizz.data;
    let tela2 = document.querySelector(".conteudoTela_2")
    let imgtitulo = document.querySelector(".titulo_quiz")
    for (let i = 0; i < materialTela2.length; i++) {
        let element = materialTela2[i];
        if (element.id == controle){
            tela2.innerHTML = ''; 
            tela2.innerHTML +=
                `<div class="titulo_quiz"><h1>${element.title}</h1></div> `;
                document.querySelector(".titulo_quiz").style.backgroundImage=`url(${element.image})`;
            
            questoes = element.questions;
            questoes.sort(comparador);
            renderizarpergunta(contador);
        }
    }
    
}

function Permissaodepergunta(indice){
    let k = document.querySelectorAll(".selecionado").length
    console.log(k)
    if(indice < questoes.length && k < indice ){
        setTimeout(renderizarpergunta(indice +1), 2000);
    }
    return;
}

function renderizarpergunta(indice){
    let a = questoes[indice]
    opcoes = a.answers
    opcoes.sort(comparador);
    let tela2 = document.querySelector(".conteudoTela_2")
    tela2.innerHTML +=
        `<div class="perguntaN">
        <div class="tituloPerguntaN" id="${indice}">
                <h1>${a.title}</h1>
            </div>
            <div class="opcoesN">
                <div class="${opcoes[0].isCorrectAnswer}" onclick="verificar(this)">
                    <img src="${opcoes[0].image}">
                    <p>${opcoes[0].text}</p>
                </div>
                <div class="${opcoes[1].isCorrectAnswer}" onclick="verificar(this)" >
                    <img src=${opcoes[1].image}>
                    <p>${opcoes[1].text}</p>
                </div>
                <div class="${opcoes[2].isCorrectAnswer}" onclick="verificar(this)">
                    <img src=${opcoes[2].image}>
                    <p>${opcoes[2].text}</p>
                </div>
                <div class="${opcoes[3].isCorrectAnswer}" onclick="verificar(this)">
                    <img src=${opcoes[3].image}>
                    <p>${opcoes[3].text}</p>
                </div>
            </div>
            </div>
            <div class="reinicio" onclick="rederizaPageQuizz(idReinicia);"><h1>Reiniciar Quizz</h1></div>
        `;//coloqui o botão de reiniciar nessa tela só pra testar, deve ficar na tela de finalziação do quizz
    Permissaodepergunta(indice);
}

function verificar(elemento){
    if (elemento.classList.contains("acertou") || elemento.classList.contains("errou") || elemento.classList.contains("branquinho")){
        return;
    }
    else if(elemento.classList.contains("true")){
        elemento.classList.add("acertou");
        elemento.parentNode.classList.add("selecionado");
        let a = document.querySelectorAll(".selecionado > div");
            for (let i = 0; i < a.length; i++) {
                const element = a[i];    
                if(!a[i].classList.contains("acertou")){
                    a[i].classList.add("branquinho")
                }
            }
       
        contador += 1
        renderizarpergunta(contador) ;
        return;
    }
    else if(elemento.classList.contains("false")){
        elemento.classList.add("errou")
        elemento.parentNode.classList.add("selecionado");
        let a = document.querySelectorAll(".selecionado > div");
            for (let i = 0; i < a.length; i++) {
                const element = a[i];    
                if(!a[i].classList.contains("errou")){
                    a[i].classList.add("branquinho")
                }
            }
        contador += 1
        renderizarpergunta(contador);
        return;
    }
}
