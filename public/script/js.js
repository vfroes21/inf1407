// aguarda termino da animacao de introducao
onload = function(){
    //setTimeout(show_validation, 3.1*1000);
    let email = document.getElementById('email');

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
    // if email valido
    //document.getElementById();

    document.getElementById('screen-gameboy-text').classList.add('animate_gb');
    document.getElementById('author').classList.add('animate_a');
}