images = [
    '../img/bubble-b.png',
    '../img/bubble-g.png',
    '../img/bubble-r.png',
    '../img/bubble-y.png'
]

rows = [34, 65, 94, 124, 154, 184, 214, 244, 274, 304, 331, 357, 383, 409, 435, 460, 487, 513, 539];     // posicoes y de cada linha de bubbles
cols = [2, 25, 50, 75, 100, 124, 149, 177, 202, 225];   // posicoes x das bubbles
bubble_ammo = 30;

onload = function(){
    document.addEventListener('keyup', key_pressed);
    content = document.getElementById('content');
    
    current_bbs_row = 1;    // variavel de controle, numero de fileiras de bubbles

    // cria 100 bubbles de cores aleatorias
    for(let i = 0; i < 100; i++)
    {
        let img = document.createElement('img');
        idx = Math.floor(Math.random()*4);

        img.src = images[idx];
        img.style.width = '25px';
    
        //se linha contem 10 bubbles, insere quebra de linha e atualiza variavel
        if (i % 10 == 0 && i != 0)
        {
            let lb = document.createElement('br');
            content.appendChild(lb);
            current_bbs_row += 1;
        }

        img.id = 'bb_'+ current_bbs_row + ((i+1)%10);
        
        content.appendChild(img);
    }

    main_b = document.getElementById('main');
    main_b.src = images[Math.floor(Math.random()*4)];
    current_mb_row = 6;
    rows_idx = current_bbs_row -1;      // indice para array rows apontando pro ultimo elem
}

function key_pressed(e)
{
    if (e.code === "Space")
    {
        let pos = find_place();
        my_time = setInterval(function() { shoot_mbubble(pos) }, 5);
    }

    else if(e.code === "ArrowLeft")
        move_mb('l');
    
    else if(e.code === "ArrowRight")
        move_mb('r');
}

function find_place()
{
    let d = document.getElementById('bb_' + current_bbs_row + current_mb_row%10);
    let res = current_bbs_row, aux = current_bbs_row, c = 1;
   
    while (!d)
    {
        res--;
        d = document.getElementById('bb_' + (aux-c++) + current_mb_row%10);
        console.log('while');
    }
    
    return res-1;
}

function shoot_mbubble(pos)    // a cada 5ms, bubble principal sobe 2px
{
    let speed = 2, y = main_b.offsetTop;
    
    if (y>rows[pos])
    {
        y-=speed;
        main_b.style.top = y + 'px';
    }

    else
    {
        clearInterval(my_time);
        pop_bubbles(pos);
    }     
}

function pop_bubbles(pos)
{
    var nxt_bb = document.getElementById('bb_'+ pos + current_mb_row%10);

    var bb_color = get_color(nxt_bb);
    var mb_color = get_color(main_b);
    
    // se cores iguais
    if (bb_color === mb_color)
    {
        

    }

    else
    {
        current_bbs_row++; rows_idx++;

        // cria nova bubble de mesma cor da principal
        let img = document.createElement('img');

        img.src = '../img/bubble-' + mb_color + '.png';
        img.style.width = '25px';
        img.style.position = 'absolute';
        img.id = 'bb_' + current_bbs_row + current_mb_row;
        
        content.appendChild(img);
        
        // posiciona bubble nova
        let r = main_b.getBoundingClientRect();

        img.style.top = (r.top + window.scrollY - 7) + 'px';
        img.style.left = cols[current_mb_row-1] + 'px';
        
        // reposiciona bubble principal e gera nova cor
        main_b.style.top = '85%';
        main_b.style.left = '50%';
        main_b.src = images[Math.floor(Math.random()*4)];
        current_mb_row = 6;

        bubble_ammo--;
    }
}

function move_mb(dir)   // posiciona bubble principal mirando na bubble da coluna anterior ou proxima
{
    var x = main_b.offsetLeft;

    if (dir === 'l')
    {
        if (current_mb_row > 1)
        {
            x-=24;
            main_b.style.left = x + 'px';
            current_mb_row -= 1;
        }
    }

    else if (dir === 'r')
    {
        if (current_mb_row < 10)
        {
            x+=24;
            main_b.style.left = x + 'px';
            current_mb_row += 1;
        }
    }
}

function get_color(bb)
{
    // encontrando cor da bubble a partir do nome do arquivo
    var aux_str = bb.src;
    var idx = aux_str.indexOf("bubble");

    aux_str = aux_str.substr(idx);
    idx = aux_str.indexOf('-');

    var cor = aux_str.charAt(idx+1);

    return cor;
}

function search_bb_h(color)
{

}

function search_bb_v(color)
{

}