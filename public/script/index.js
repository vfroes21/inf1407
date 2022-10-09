onload = function(){ 
    let bt = document.getElementById('email_bt');
    bt.addEventListener('click', validate);

    let form = document.getElementById('e');
    form.addEventListener('submit', nEnvia);
}

function nEnvia(ev)
{
    ev.preventDefault();
}

function validate()
{
    // if email valido
    let priplanus = /^\\[^aeiou\W]+\[([^aeiou○\W]+│)+[^aeiou\W]*\]/i;
    
    if (priplanus.test(document.email.email_field.value))
    {
        let tela = document.getElementById('validate_screen');
        let fundo = document.getElementById('bg');

        tela.removeChild(document.getElementById('block'));
        fundo.style.backgroundColor = 'rgb(255,255,255)';

        let intro_audio = new Audio('../audio/gameboycolor_intro.mp3');
        intro_audio.play();
        setTimeout(intro_animation, 1.3*1000);
    }
    
    else
    {
        let error = document.getElementById('error');
        error.style.visibility = 'visible';
    }
}

function intro_animation()
{
    document.getElementById('screen-gameboy-text').classList.add('animate_gb');
    document.getElementById('author').classList.add('animate_a');
    setTimeout(goto_menu, 3.3*1000);
}

function goto_menu()
{
    location.replace('menu.html');
}