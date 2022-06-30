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
    console.log(materialTela2);
    let tela2 = document.querySelector(".conteudoTela_2")
    let imgtitulo = document.querySelector(".titulo_quiz")
    for (let i = 0; i < materialTela2.length; i++) {
        let element = materialTela2[i];
        console.log(`${element.id}`)
        if (element.id == controle){
            console.log('entrei');
            tela2.innerHTML = '';
            tela2.innerHTML +=
                `<div class="titulo_quiz"><h1>${element.title}</h1></div> `;
            imgtitulo.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${element.image})`;
            console.log(element);   
        }
    }
    /* Aqui chama função par renderizar o layout da tela dois Leonardo  */
    
}




function alertaErro (erro) {
    console.log(erro);
}