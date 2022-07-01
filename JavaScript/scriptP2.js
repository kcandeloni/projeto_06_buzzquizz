let controle = 0;

function openQuizz (idQuizz) {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    controle = idQuizz;
    console.log(controle);
    console.log("entrei");
    promise.then(rederizaPageQuizz);
}


function rederizaPageQuizz (Quizz) {

    let materialTela2 = Quizz.data;
    let element;
    let tela2 = document.querySelector(".conteudoTela_2")
    let imgtitulo = document.querySelector(".titulo_quiz")
    for (let i = 0; i < materialTela2.length; i++) {
        element = materialTela2[i];
        if (element.id == controle){
            console.log('entrei');
            tela2.innerHTML = '';
            tela2.innerHTML +=
                `<div class="titulo_quiz"><h1>${element.title}</h1></div> `;
                document.querySelector(".titulo_quiz").style.backgroundImage="url("+element.image+")";
            i = materialTela2.length;
        }
    }
    renderizaQuestions(element.questions, element.questions);
}

function renderizaQuestions (elem, nPage) {
    if(nPage > 0){
    const questoes = document.querySelector('.conteudoTela_2');
    questoes.innerHTML += `<div class="perguntaN">
    <div class="tituloPerguntaN">
        <h1>${elem[nPage].title}<</h1>
    </div>
    <div class="opcoesN">
        <div class="branquinho">
            <img src="https://i.pinimg.com/originals/b3/e5/d9/b3e5d956184f8fa31022499a977d5b2d.jpg">
            <p>MC Sapão(saudades)</p>
        </div>
        <div class="acertou" >
            <img src="https://www.petz.com.br/blog/wp-content/uploads/2020/01/como-criar-furao-1280x720.jpg">
            <p>Furinho</p>
        </div>
        <div class="errou">
            <img src="https://saude.abril.com.br/wp-content/uploads/2021/03/bichos-foto-vauvau-Getty-Images.png">
            <p>gatin</p>
        </div>
        <div >
            <img src="https://www.landrin.com.br/upload/pragas_5_66_1538744895.jpg">
            <p>Raticate</p>
        </div>
    </div>
</div>`;
    }
    else{
        renderizaResultado();
    }

}

function renderizaResultado(){
    const resultado = document.querySelector('.conteudoTela_2');
    resultado.innerHTML = `<div class="resposta">
    <div class="tituloResultado">
        <h1>88% de acerto: Você é praticamente um aluno de Hogwarts!</h1>
    </div>
    <div class="Resultado">
        <img src="https://i.pinimg.com/originals/33/bf/6a/33bf6ab042ae7c01371ffc2270f1717f.jpg">
        <div class="textofinal">
            <p>Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão abaixo para usar o vira-tempo e reiniciar este teste.</p>
        </div>

    </div>
</div>

<div class="reinicio"><h1>Reiniciar Quizz</h1></div>
<div class="voltar" onclick="openTela('conteudoTela_2','conteudoTela_1');"> <p>Voltar pra Home</p> </div>
`

}

function alertaErro (erro) {
    console.log(erro);
}