function verificarURL(string){
    try {
        let url = new URL(string);
        return true;
      } catch(err) {
          return false;
      }
}
function inseririnfobasicas(){
    let titulo = document.querySelector(".informacoesdoquizz :nth-child(1)").value;
    let url = document.querySelector(".informacoesdoquizz :nth-child(2)").value;
    let perguntas = document.querySelector(".informacoesdoquizz :nth-child(3)").value;
    let niveis = document.querySelector(".informacoesdoquizz :nth-child(4)").value;
    if(titulo.length < 20 || titulo.length > 65){
        alert("Seu texto deve possuir entre 20 e 65 caracteres");
    }else if(!verificarURL(url)){
        alert("URL da imagem inválida");
    }else if(!Number(perguntas)){
        alert("Digite um número de perguntas válido");
    }else if(!Number.isInteger(Number(perguntas))){
        alert("Digite um número de perguntas inteiro");
    }else if(Number(perguntas)<3){
        alert("O quiz deve ter pelo menos tres perguntas");
    }else if(!Number(niveis)){
        alert("Digite um número de niveis válido");
    }else if(!Number.isInteger(Number(niveis))){
        alert("Digite um número de niveis inteiro");
    }else if(Number(niveis)<2){
        alert("O quiz deve ter pelo menos dois níveis");
    }else{
        telaperguntasquizz(titulo, url, Number(perguntas), Number(niveis));
    }    
}
function telaperguntasquizz(titulo, url, perguntas, niveis){

}