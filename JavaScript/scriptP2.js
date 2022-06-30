function openQuizz (idQuizz) {
    const promise = axios.get(`${linkQuizzes+idQuizz}`);

    promise
            .then(rederizaPageQuizz)
            .catch(alertaErro);
}

function rederizaPageQuizz (Quizz) {
    let materialTela2 = Quizz.data;
    /* Aqui chama função par renderizar o layout da tela dois Leonardo  */
    
}

function alertaErro (erro) {
    console.log(erro);
}