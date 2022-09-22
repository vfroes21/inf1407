// aguarda termino da animacao de introducao
onload = function(){
    setTimeout(show_validation, 3.1*1000);
}

function show_validation()
{
    let div_text = document.getElementById('text');
    let email = document.getElementById('email');

    // mostra texto
    div_text.style.left = '50%';
    div_text.style.top = '30%';
    div_text.style.transform = 'translate(-50%,-50%)';
    div_text.style.visibility = 'visible';

    // posiciona texto E-mail
    email.style.position = 'absolute';
    email.style.left = '50%';
    email.style.top = '40%';
    email.style.transform = "translate(-50%,-50%)";
    email.style.visibility = 'visible';

    let lb = document.createElement("br");
    email.appendChild(lb);

    // cria input box
    let input = document.createElement('input');
    input.setAttribute("type","text");
    input.setAttribute("name","email_input");
    email.appendChild(input);

    // cria botao
    let bt = document.createElement("button");
    bt.setAttribute("type","button");
    bt.appendChild(document.createTextNode("Verificar"));
    bt.addEventListener("click", validate);
    email.appendChild(bt);  
}

function validate()
{
    console.log("validate");
}