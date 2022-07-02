let controle = 0;
let contador = 0;
let acertos = 0;
let questoes = [] ;
let opcoes = [];
let levels =[];
let idReinicia;
function openQuizz (idQuizz) {
    const promise = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
    controle = idQuizz;
    promise.then(rederizaPageQuizz);
    
}


function rederizaPageQuizz (Quizz) {
    acertos = 0;
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
                document.querySelector(".titulo_quiz").style.background =`linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)) url(${element.image})  center`;
            
            questoes = element.questions;
            levels = element.levels;
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
            </div>`;
        let d = document.querySelector(".conteudoTela_2").lastElementChild;
        d.scrollIntoView({behavior: "smooth"});
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
        acertos += 1
        setTimeout(renderizarpergunta, 2000, contador) ;
        setTimeout(rederizarResposta, 2000);
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
        setTimeout(renderizarpergunta, 2000, contador);
        setTimeout(rederizarResposta, 2000);
        return;
    }
}

function rederizarResposta(){
    
    if (questoes.length === document.querySelectorAll(".selecionado").length){
        
        let media = Math.floor((acertos/questoes.length)*100);
        console.log(media);
        console.log(levels)
        let tela2 = document.querySelector(".conteudoTela_2");
        console.log(levels.length-1)
        for(i = levels.length-1; i > -1 ; i--){
            console.log(i);
            console.log(media >= levels[i].minValue);
            if(media >= levels[i].minValue){
                tela2.innerHTML +=
                `<div class="resposta">
                    <div class="tituloResultado">
                        <h1>${media}% de acerto:${levels[i].title}</h1>
                    </div>
                    <div class="Resultado">
                        <img src=${levels[i].image}>
                        <div class="textofinal">
                            <p>${levels[i].text}</p>
                        </div>
                    </div>
                 </div>
    
            <div class="reinicio" onclick="rederizaPageQuizz(idReinicia)"><h1>Reiniciar Quizz</h1></div>
            <div class="voltar" onclick="openTela('conteudoTela_2','conteudoTela_1');"> <p>Voltar pra Home</p> </div>
            </div>`;
            let d = document.querySelector(".conteudoTela_2").lastElementChild;
            d.scrollIntoView({behavior: "smooth"});
            break;
            }
        }
}
    else return;
}
