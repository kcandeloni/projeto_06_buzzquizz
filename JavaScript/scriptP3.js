let titulo = "";
let url = "";
let perguntas = 0;
let niveis = 0;
let infoperguntas = [];

function verificarURL(string){
    try {
        let url = new URL(string);
        return true;
      } catch(err) {
          return false;
      }
}
function inseririnfobasicas(){
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
    element.querySelector(".pergunta .textocriacao input").value = "xx";
    console.log(infoperguntas)
}
function salvapergunta(){
    let perguntaescrita = document.querySelector(".boxpergunta");
    let respostaserradas = perguntaescrita.querySelectorAll(".respostasincorretas > div");
    let objpergunta = {
        id : perguntaescrita.querySelector(".pergunta p").innerHTML,
        texto : perguntaescrita.querySelector(".pergunta .textocriacao input").value,
        cor: perguntaescrita.querySelector(".pergunta .corpergunta input").value,
        respostacorreta : {
            resposta: perguntaescrita.querySelector(".respostacorreta .textocriacao input").value,
            url: perguntaescrita.querySelector(".respostacorreta .urlimagem input").value
        },
        respostaincorreta1 : {
            resposta: respostaserradas[0].querySelector(".textocriacao input").value,
            url: respostaserradas[0].querySelector(".urlimagem input").value
        },
        respostaincorreta2 : {
            resposta: respostaserradas[1].querySelector(".textocriacao input").value,
            url: respostaserradas[1].querySelector(".urlimagem input").value
        },
        respostaincorreta3 : {
            resposta: respostaserradas[2].querySelector(".textocriacao input").value,
            url: respostaserradas[2].querySelector(".urlimagem input").value
        }
    };
    if(infoperguntas.length === 0){
        infoperguntas.push(objpergunta);
    }else{
        let i = 0;
        for(i = 0; i <= infoperguntas.length; i++){
            if(i === infoperguntas.length){
                infoperguntas.push(objpergunta);
                break;
            }else if(infoperguntas[i].id === objpergunta.id){
                infoperguntas[i] = objpergunta;
            }
        }
    }
    perguntaescrita.innerHTML = `<p>Pergunta ${objpergunta.id[(objpergunta.id).length - 1]}</p>
    <ion-icon name="create-outline" onclick = alterarestadopergunta(this.parentNode)></ion-icon>`;
    perguntaescrita.classList.remove("boxpergunta");
    perguntaescrita.classList.add("boxperguntafechado");
}