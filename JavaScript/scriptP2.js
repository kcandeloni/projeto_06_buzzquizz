let controle = 0;
let h=0;
let contador = 0;
let acertos = 0;
let questoes = [] ;
let opcoes = [];
let levels =[];
let idReinicia;
let materialTela2;
let k;
/*function openmeuQuizz(idQuizz){
    const listaSerializada = localStorage.getItem("tOtaco");
    listaSerializada = JSON.parse(listaSerializada);
    for(let i = 0; i < listaSerializada.length; i++){
        if(listaSerializada[i].id === idQuizz){
            let tela2 = document.querySelector(".conteudoTela_2");
            let imgtitulo = document.querySelector(".titulo_quiz");
            tela2.innerHTML = ''; 
            tela2.innerHTML +=
            `<div class="titulo_quiz"><h1>${element.title}</h1></div> `;
            //document.querySelector(".titulo_quiz").style.backgroundImage=`url(${element.image})`;
            document.querySelector(".titulo_quiz").style.backgroundImage= `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
            url(${element.image})`;
            questoes = element.questions;
            levels = element.levels;
            questoes.sort(comparador);
            renderizarpergunta(contador);
        }
    }
}*/
function openQuizz (idQuizz) {
    const promise = axios.get("https://mock-api.driven.com.br/api/vs/buzzquizz/quizzes");
    controle = idQuizz;
    promise.then(rederizaPageQuizz);
    
}

function rederizaMyQuizzes (Quizz, idQuizz) {
    let objeto = {
        data: Quizz,
    }
    controle = idQuizz;
    rederizaPageQuizz(objeto);
}

function rederizaPageQuizz (Quizz) {
    h=0;
    acertos = 0;
    contador = 0;
    questoes = [] ;
    opcoes = [];
    idReinicia = Quizz;
    materialTela2 = Quizz.data;
    let tela2 = document.querySelector(".conteudoTela_2")
    let imgtitulo = document.querySelector(".titulo_quiz")
    for (let i = 0; i < materialTela2.length; i++) {
        let element = materialTela2[i];
        if (element.id == controle){
            k = element.id
            tela2.innerHTML = ''; 
            tela2.innerHTML +=
                `<div class="titulo_quiz"><h1>${element.title}</h1></div> `;
                //document.querySelector(".titulo_quiz").style.backgroundImage=`url(${element.image})`;
                document.querySelector(".titulo_quiz").style.backgroundImage= `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                url(${element.image})`;
            
            questoes = element.questions;
            levels = element.levels;
            questoes.sort(comparador);
            renderizarpergunta(contador);
        }
    }
    
}

function Permissaodepergunta(indice){
    let k = document.querySelectorAll(".selecionado").length
    if(indice < questoes.length && k < indice ){
        setTimeout(renderizarpergunta(indice +1), 2000);
    }
    return;
}
function renderizarOpcoes(array){
    let tela2 = document.querySelector(`.target${h}`);
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        tela2.innerHTML +=
        `
        <div class="${array[i].isCorrectAnswer}" onclick="verificar(this)">
        <img src="${array[i].image}">
        <p>${array[i].text}</p>
        </div>    
        `

    }
    h = h +1;
}
function renderizarpergunta(indice){
    let a = questoes[indice]
    opcoes = a.answers
    opcoes.sort(comparador);
    console.log(opcoes)
    console.log(a);
    let tela2 = document.querySelector(".conteudoTela_2");
    tela2.innerHTML +=
        `<div class="perguntaN">
        <div class="tituloPerguntaN" style = "background-color: ${a.color};">
                <h1>${a.title}</h1>
            </div>
            <div class="opcoesN target${h}">
            </div>
            </div>`;
        renderizarOpcoes(opcoes);

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
        /* ordena level*/
        let desordenado = true;
        let aux = levels[0];
        while(desordenado && levels.length > 1){
            for(let i = 1; i < levels.length; i++){
                if(aux.minValue > levels[i].minValue){
                    levels[i-1] = levels[i];
                    levels[i] = aux;
                }
                aux = levels[i];
                desordenado = false;
                console.log("testeRapido");
                for(let y = 1; y < levels.length; y++){
                    if(levels[i-1].minValue >= levels[i].minValue ){
                        desordenado = true;
                    }
                }
            }
        }
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
                <div class="voltar" onclick="location.reload(true)"> <p>Voltar pra Home</p> </div>
                `;
            let d = document.querySelector(".conteudoTela_2").lastElementChild;
            d.scrollIntoView({behavior: "smooth"});
            break;
            }
        }
}
    else return;
}
