titulo = "";
url = "";
perguntas = 0;
niveis = 0;

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
}