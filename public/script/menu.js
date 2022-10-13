onload = function(){
    bt_p = document.getElementById('play');
    bt_p.addEventListener('click', start_game);

    bt_m = document.getElementById('music');
    bt_m.addEventListener('click', play_bgm);

    bt_s = document.getElementById('exit');
    bt_s.addEventListener('click', handle_exit);

    let form = document.getElementById('bts');
    form.addEventListener('submit', nEnvia);
}

function nEnvia(ev)
{
    ev.preventDefault();
}

function start_game()
{
    location.replace('game.html');
}

function play_bgm()
{
    musica = new Audio('../audio/Final Fantasy VII OST - Cids Theme.mp3');
    musica.loop = true;
    musica.play();

    bt_m.removeEventListener('click', play_bgm);
    bt_m.innerHTML = 'Pausar Música';
    bt_m.addEventListener('click', pause_play);
}

function pause_play()
{
    if (bt_m.innerHTML == 'Pausar Música')
    {
        bt_m.innerHTML = 'Retomar Música';
        musica.pause();
    }
        
    else
    {
        bt_m.innerHTML = 'Pausar Música';
        musica.play();
    }
}

function handle_exit()
{
    if(confirm('Tem certeza que deseja sair?'))
    {
        let body = document.getElementById('b');

        body.removeChild(document.getElementById('block'));
        body.removeChild(document.getElementById('title'));

        document.getElementById('exit_text').style.visibility = 'visible';
    }
}