let titulo = "";
let url = "";
let perguntas = 0;
let niveis = 0;
let quizzcriado;
let infoperguntas = [];
let vetorlevels = [];
let ultimaperguntasalva;
let ultimonivelsalvo;
function verificarURL(string){
    try {
        let url = new URL(string);
        return true;
      } catch(err) {
          return false;
      }
}
function notcolor(color){
    if(color.length != 7){
        return true;
    }
    if(color[0]!= '#'){
        return true;
    }
    color = color.toLowerCase();
    let valid = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    for(let i = 1; i < 6; i++){
        for(let j = 0; j <= 16; j++){
            if(j === 16){
                return true;
            }else if(color[i]=== valid[j]){
                break;
            }
        }
    }
    return false;
}
function inseririnfobasicas(){
    infoperguntas = [];
    titulo = "";
    url = "";
    perguntas = 0;
    niveis = 0;
    let stringtitulo = document.querySelector(".informacoesdoquizz :nth-child(1)").value;
    let stringurl = document.querySelector(".informacoesdoquizz :nth-child(2)").value;
    let stringperguntas = document.querySelector(".informacoesdoquizz :nth-child(3)").value;
    let stringniveis = document.querySelector(".informacoesdoquizz :nth-child(4)").value;
    if(stringtitulo.length < 20 || stringtitulo.length > 65){
        alert("Seu texto deve possuir entre 20 e 65 caracteres");
    }else if(!verificarURL(stringurl)){
        alert("URL da imagem inválida");
    }else if(!Number(stringperguntas)){
        alert("Digite um número de perguntas válido");
    }else if(!Number.isInteger(Number(stringperguntas))){
        alert("Digite um número de perguntas inteiro");
    }else if(Number(stringperguntas)<3){
        alert("O quiz deve ter pelo menos tres perguntas");
    }else if(!Number(stringniveis)){
        alert("Digite um número de niveis válido");
    }else if(!Number.isInteger(Number(stringniveis))){
        alert("Digite um número de niveis inteiro");
    }else if(Number(stringniveis)<2){
        alert("O quiz deve ter pelo menos dois níveis");
    }else{
        titulo = stringtitulo;
        url = stringurl;
        perguntas = stringperguntas;
        niveis = stringniveis;
        telaperguntasquizz();
    }    
}
function telaperguntasquizz(){
    let tela3_1 = document.querySelector(".informacoesdoquizz").parentNode;
    let tela3_2 = document.querySelector(".boxcriacaoperguntas").parentNode;
    tela3_1.classList.add("escondido");
    tela3_2.classList.remove("escondido");
    let boxperguntas = document.querySelector(".boxcriacaoperguntas");
    boxperguntas.innerHTML = `<div class="boxpergunta">
    <div class="pergunta">
        <p>Pergunta 1</p>
        <div>
            <div class="textocriacao">
                <input type="text" placeholder="Texto da pergunta">
            </div>
            <div class="corpergunta">
                <input type="text" placeholder="Cor de fundo da pergunta">
            </div>
        </div>
    </div>
    <div class="respostacorreta">
        <p>Resposta correta</p>
        <div>
            <div class="textocriacao">
                <input type="text" placeholder="Resposta correta">
            </div>
            <div class="urlimagem">
                <input type="text" placeholder="URL da imagem">
            </div>
        </div>
    </div>
    <div class="respostasincorretas">
        <p>Respostas incorretas</p>
        <div>
            <div class="textocriacao">
                <input type="text" placeholder="Resposta incorreta 1">
            </div>
            <div class="urlimagem">
                <input type="text" placeholder="URL da imagem 1">
            </div>
        </div>
        <div>
            <div class="textocriacao">
                <input type="text" placeholder="Resposta incorreta 2">
            </div>
            <div class="urlimagem">
                <input type="text" placeholder="URL da imagem 2">
            </div>
        </div>
        <div>
            <div class="textocriacao">
                <input type="text" placeholder="Resposta incorreta 3">
            </div>
            <div class="urlimagem">
                <input type="text" placeholder="URL da imagem 3">
            </div>
        </div>
    </div>
</div>`;
    for(let i = 1; i<perguntas; i++){
        boxperguntas.innerHTML += `<div class="boxperguntafechado">
        <p>Pergunta ${i+1}</p>
        <ion-icon name="create-outline" onclick = alterarestadopergunta(this.parentNode)></ion-icon>
    </div>`;
    }
}
function alterarestadopergunta(element){
    salvapergunta();
    element.classList.add("boxpergunta");
    element.classList.remove("boxperguntafechado");
    setTimeout(()=> {restaurapergunta(element)}, 500);
}
function restaurapergunta(element){
    let numeropergunta = element.querySelector("p").innerHTML;
    numeropergunta = numeropergunta[numeropergunta.length - 1];
    element.innerHTML = `<div class="pergunta">
        <p>Pergunta ${numeropergunta}</p>
        <div>
            <div class="textocriacao">
                <input type="text" placeholder="Texto da pergunta">
            </div>
            <div class="corpergunta">
                <input type="text" placeholder="Cor de fundo da pergunta">
            </div>
        </div>
    </div>
    <div class="respostacorreta">
        <p>Resposta correta</p>
        <div>
            <div class="textocriacao">
                <input type="text" placeholder="Resposta correta">
            </div>
            <div class="urlimagem">
                <input type="text" placeholder="URL da imagem">
            </div>
        </div>
    </div>
    <div class="respostasincorretas">
        <p>Respostas incorretas</p>
        <div>
            <div class="textocriacao">
                <input type="text" placeholder="Resposta incorreta 1">
            </div>
            <div class="urlimagem">
                <input type="text" placeholder="URL da imagem 1">
            </div>
        </div>
        <div>
            <div class="textocriacao">
                <input type="text" placeholder="Resposta incorreta 2">
            </div>
            <div class="urlimagem">
                <input type="text" placeholder="URL da imagem 2">
            </div>
        </div>
        <div>
            <div class="textocriacao">
                <input type="text" placeholder="Resposta incorreta 3">
            </div>
            <div class="urlimagem">
                <input type="text" placeholder="URL da imagem 3">
            </div>
        </div>
    </div>`;
    //verificar se o elemento esta no array infoperguntas e se sim escrever o texto nos inputs
    for(let i = 0; i<infoperguntas.length; i++){
        if(`Pergunta ${numeropergunta}` === infoperguntas[i].id){
            let obj = infoperguntas[i];
            element.querySelector(".pergunta .textocriacao input").value = obj.title;
            element.querySelector(".pergunta .corpergunta input").value = obj.color;
            element.querySelector(".respostacorreta .textocriacao input").value = obj.answers[0].text;
            element.querySelector(".respostacorreta .urlimagem input").value = obj.answers[0].image;
            let respostaserradas = element.querySelectorAll(".respostasincorretas > div");
            respostaserradas[0].querySelector(".textocriacao input").value = obj.answers[1].text;
            respostaserradas[0].querySelector(".urlimagem input").value = obj.answers[1].image;
            respostaserradas[1].querySelector(".textocriacao input").value = obj.answers[2].text;
            respostaserradas[1].querySelector(".urlimagem input").value = obj.answers[2].image;
            respostaserradas[2].querySelector(".textocriacao input").value = obj.answers[3].text;
            respostaserradas[2].querySelector(".urlimagem input").value = obj.answers[3].image;
        }
    }
}
function salvapergunta(){
    let perguntaescrita = document.querySelector(".boxpergunta");
    let respostaserradas = perguntaescrita.querySelectorAll(".respostasincorretas > div");
    let objpergunta = {
        id : perguntaescrita.querySelector(".pergunta p").innerHTML,
        title : perguntaescrita.querySelector(".pergunta .textocriacao input").value,
        color: perguntaescrita.querySelector(".pergunta .corpergunta input").value,
        answers : [{
            text: perguntaescrita.querySelector(".respostacorreta .textocriacao input").value,
            image: perguntaescrita.querySelector(".respostacorreta .urlimagem input").value,
            isCorrectAnswer: true
            },{
            text: respostaserradas[0].querySelector(".textocriacao input").value,
            image: respostaserradas[0].querySelector(".urlimagem input").value,
            isCorrectAnswer: false
            },{
            text: respostaserradas[1].querySelector(".textocriacao input").value,
            image: respostaserradas[1].querySelector(".urlimagem input").value,
            isCorrectAnswer: false
            },{
            text: respostaserradas[2].querySelector(".textocriacao input").value,
            image: respostaserradas[2].querySelector(".urlimagem input").value,
            isCorrectAnswer: false
            }]
        };
    if(infoperguntas.length === 0){
        infoperguntas.push(objpergunta);
    }else{
        let i = 0;
        for(i = 0; i <= infoperguntas.length; i++){
            if(i === infoperguntas.length){
                infoperguntas.push(objpergunta);
                break;
            }else if(infoperguntas[i].id === objpergunta.id){ //Verifica se o elemento eh igual a algum ja salvo
                infoperguntas[i] = objpergunta;
                break;
            }
        }
    }
    perguntaescrita.innerHTML = `<p>Pergunta ${objpergunta.id[(objpergunta.id).length - 1]}</p>
    <ion-icon name="create-outline" onclick = alterarestadopergunta(this.parentNode)></ion-icon>`;
    perguntaescrita.classList.remove("boxpergunta");
    perguntaescrita.classList.add("boxperguntafechado");
    ultimaperguntasalva = perguntaescrita;
}
function criarperguntas(){
    salvapergunta();
    if(perguntas > infoperguntas.length){
        alert("Preencha todas as perguntas para prosseguir");
        ultimaperguntasalva.classList.add("boxpergunta");
        ultimaperguntasalva.classList.remove("boxperguntafechado");
        restaurapergunta(ultimaperguntasalva);
        return;
    }
    for(let i=0; i < infoperguntas.length; i++){
        let objatual = infoperguntas[i];
        if(objatual.title.length < 20){
            alert(`O título da pergunta ${i+1} deve possuir pelo menos 20 caracteres`);
            ultimaperguntasalva.classList.add("boxpergunta");
            ultimaperguntasalva.classList.remove("boxperguntafechado");
            restaurapergunta(ultimaperguntasalva);
            return;
        }else if(notcolor(objatual.color)){
            alert(`A cor da pergunta ${i + 1} é inválida`);
            ultimaperguntasalva.classList.add("boxpergunta");
            ultimaperguntasalva.classList.remove("boxperguntafechado");
            restaurapergunta(ultimaperguntasalva);
            return;
        }
        let temcerta = false;
        let temerrada = false;
        for(let j = 0; j < 4; j++){
            let resp = objatual.answers[j];
            resp.text;
            resp.image;
            resp.isCorrectAnswer;
            if(resp.text === ""){
                alert(`Preencha todas as respostas da pergunta ${i+1}`);
                ultimaperguntasalva.classList.add("boxpergunta");
                ultimaperguntasalva.classList.remove("boxperguntafechado");
                restaurapergunta(ultimaperguntasalva);
                return;
            }else if(!verificarURL(resp.image)){
                alert(`As URLs da imagens da pergunta ${i+1} devem ser válidas`);
                ultimaperguntasalva.classList.add("boxpergunta");
                ultimaperguntasalva.classList.remove("boxperguntafechado");
                restaurapergunta(ultimaperguntasalva);
                return;
            }else if(resp.isCorrectAnswer === true){
                temcerta = true;
            }else if(resp.isCorrectAnswer === false){
                temerrada = true;
            }
            
        }
        if(!(temcerta && temcerta)){
            alert(`A pergunta ${i+1} deve possuir pelo menos uma resposta certa e uma errada`);
            ultimaperguntasalva.classList.add("boxpergunta");
            ultimaperguntasalva.classList.remove("boxperguntafechado");
            restaurapergunta(ultimaperguntasalva);
            return;
        }
    }
    for(let i=0; i < infoperguntas.length; i++){
        delete infoperguntas[i].id;
    }
    telaniveis();
}
function telaniveis(){
    let tela3_2 = document.querySelector(".boxcriacaoperguntas").parentNode;
    let tela3_3 = document.querySelector(".boxcriacaoniveis").parentNode;
    tela3_2.classList.add("escondido");
    tela3_3.classList.remove("escondido");
    let element = document.querySelector(".boxcriacaoniveis");
    element.innerHTML = `<div class="boxnivel">
    <p>Nível 1</p>
    <input type="text" placeholder="Título do nível">
    <input type="text" placeholder="% de acerto mínima">
    <input type="text" placeholder="URL da imagem do nível">
    <input type="text" placeholder="Descrição do nível">
</div>`;
    for(let i = 1; i < niveis; i++){
        element.innerHTML += `<div class="boxnivelfechado">
        <p>Nível ${i+1}</p>
        <ion-icon name="create-outline" onclick="alteraestadonivel(this.parentNode)"></ion-icon>
    </div>`;
    }
}
function alteraestadonivel(element){
    salvanivel();
    element.classList.add("boxnivel");
    element.classList.remove("boxnivelfechado");
    setTimeout(()=> {restauranivel(element)}, 500);
}
function salvanivel(){
    let inputs = document.querySelectorAll(".boxnivel input");
    let objnivel = {
        id : document.querySelector(".boxnivel p").innerHTML,
        title: inputs[0].value,
        image: inputs[2].value,
        text: inputs[3].value,
        minValue: inputs[1].value
    }
    if(vetorlevels.length === 0){
        vetorlevels.push(objnivel);
    }else{
        for(let i = 0; i <= vetorlevels.length; i++){
            if(i === vetorlevels.length){
                vetorlevels.push(objnivel);
                break;
            }else if(vetorlevels[i].id === objnivel.id){ //Verifica se o elemento eh igual a algum ja salvo
                vetorlevels[i] = objnivel;
                break;
            }
        }
    }
    let nivelescrito = document.querySelector(".boxnivel");
    nivelescrito.innerHTML = `<p>Nível ${objnivel.id[(objnivel.id.length) - 1]}</p>
    <ion-icon name="create-outline" onclick="alteraestadonivel(this.parentNode)"></ion-icon>`;
    nivelescrito.classList.remove("boxnivel");
    nivelescrito.classList.add("boxnivelfechado");
    ultimonivelsalvo = nivelescrito;
}
function restauranivel(element){
    let numeronivel = element.querySelector("p").innerHTML;
    numeronivel = numeronivel[numeronivel.length - 1];
    element.innerHTML = `<p>Nível ${numeronivel}</p>
    <input type="text" placeholder="Título do nível">
    <input type="text" placeholder="% de acerto mínima">
    <input type="text" placeholder="URL da imagem do nível">
    <input type="text" placeholder="Descrição do nível">`;
    for(let i = 0; i< vetorlevels.length; i++){
        if(vetorlevels[i].id === `Nível ${numeronivel}`){
            let entradas = element.querySelectorAll("input");
            entradas[0].value = vetorlevels[i].title;
            entradas[1].value = vetorlevels[i].minValue;
            entradas[2].value = vetorlevels[i].image;
            entradas[3].value = vetorlevels[i].text;
        }
    }
}
function finalizarquizz(){
    salvanivel();
    if(vetorlevels.length < niveis){
        restauranivel(ultimonivelsalvo);
        ultimonivelsalvo.classList.add("boxnivel");
        ultimonivelsalvo.classList.remove("boxnivelfechado");
        alert("Preencha todos os níveis");
        return;
    }
    let has0 = false;
    for(let i = 0; i < vetorlevels.length; i++){
        if(vetorlevels[i].title.length < 10){
            alert(`O título do nível ${i + 1} deve possuir pelo menos 10 caracteres`);
            ultimonivelsalvo.classList.add("boxnivel");
            ultimonivelsalvo.classList.remove("boxnivelfechado");
            restauranivel(ultimonivelsalvo);
            return;
        }else if(Number(vetorlevels[i].minValue) == NaN){
            alert(`O percentual mínimo de acerto do nível ${i+1} deve ser um número`);
            ultimonivelsalvo.classList.add("boxnivel");
            ultimonivelsalvo.classList.remove("boxnivelfechado");
            restauranivel(ultimonivelsalvo);
            return;
        }
        vetorlevels[i].minValue = Number(vetorlevels[i].minValue);
        if(vetorlevels[i].minValue > 100 || vetorlevels[i].minValue < 0){
            alert(`O percentual mínimo de acerto do nível ${i+1} deve ser um número entre 0 e 100`);
            ultimonivelsalvo.classList.add("boxnivel");
            ultimonivelsalvo.classList.remove("boxnivelfechado");
            restauranivel(ultimonivelsalvo);
            return;
        }if(!verificarURL(vetorlevels[i].image)){
            alert(`A URL do nível ${i+1} é inválida`);
            ultimonivelsalvo.classList.add("boxnivel");
            ultimonivelsalvo.classList.remove("boxnivelfechado");
            restauranivel(ultimonivelsalvo);
            return;
        }if(vetorlevels[i].text < 30){
            alert(`A descrição do nível ${i+1} deve possuir pelo menos 30 caracteres`);
            restauranivel(ultimonivelsalvo);
            ultimonivelsalvo.classList.add("boxnivel");
            ultimonivelsalvo.classList.remove("boxnivelfechado");
            return;
        }if(vetorlevels[i].minValue === 0){
            has0 = true;
        }
    }
    if(!has0){
        alert("É obrigatório existir pelo menos um nível com taxa de acerto 0%");
        ultimonivelsalvo.classList.add("boxnivel");
        ultimonivelsalvo.classList.remove("boxnivelfechado");
        restauranivel(ultimonivelsalvo);
        return;
    }
    for(let i = 0; i < vetorlevels.length; i++){
        delete vetorlevels[i].id;
    }
    sucessodoquizz();
}
function sucessodoquizz(){
    let tela3_3 = document.querySelector(".boxcriacaoniveis").parentNode;
    let tela3_4 = document.querySelector(".conteudoTela_3 a").parentNode;
    tela3_3.classList.add("escondido");
    tela3_4.classList.remove("escondido");
    document.querySelector(".caixaimgcriacao img").src = url;
    document.querySelector(".caixaimgcriacao p").innerHTML = titulo;
    let objquizz = {
        title: titulo,
        image: url,
        questions : infoperguntas,
        levels : vetorlevels
    }
    let promessa = axios.post("https://mock-api.driven.com.br/api/vs/buzzquizz/quizzes",objquizz);
    promessa.then(salvaidquizzcriado);
}
function salvaidquizzcriado(promessa){
    quizzcriado = promessa.data;
    try {
        let listaSerializada = localStorage.getItem("tOtaco");
        listaSerializada = JSON.parse(listaSerializada);
        listaSerializada.push(quizzcriado);
        listaSerializada = JSON.stringify(listaSerializada);
        localStorage.setItem("tOtaco", listaSerializada);
    } catch (error) {
        let meusquizzes = [];
        meusquizzes.push(quizzcriado);
        meusquizzes = JSON.stringify(meusquizzes);
        localStorage.setItem("tOtaco",meusquizzes);
    }
}

function voltarparahome(){
    window.location.reload();    
}

function acessarquizzcriado(){
    let tela3_4 = document.querySelector(".conteudoTela_3 a").parentNode;
    let tela2 = document.querySelector(".conteudoTela_2");
    tela3_4.classList.add("escondido");
    tela2.classList.remove("escondido");
    openQuizz(quizzcriado.id);
}