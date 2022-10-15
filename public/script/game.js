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
    let res = aux = current_bbs_row, c = 1;
    var str = 'bb_' + current_bbs_row + current_mb_row%10;
    console.log('first found ' + str);

    // pula espacos em branco
    while (!d)
    {
        res--;
        str = 'bb_' + (aux-c++) + current_mb_row%10;
        console.log('then on loop ' + str);
        d = document.getElementById(str);
    }

    // pula bubbles estouradas
    while (d.style.visibility == 'hidden')
    {
        res--;
        str = 'bb_' + (aux-c++) + current_mb_row%10;
        console.log('then on sec loop ' + str);
        d = document.getElementById(str);
    }

    console.log('vai ser inserida em (-1)' + res);
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
        console.log(rows[pos]);
        clearInterval(my_time);
        pop_bubbles(pos+1);
    }     
}

function pop_bubbles(pos)
{
    var nxt_bb = document.getElementById('bb_'+ pos + current_mb_row%10);

    var bb_color = get_color(nxt_bb);
    var mb_color = get_color(main_b);
    console.log('bola acima da principal: ' + pos + current_mb_row%10, bb_color, mb_color);
    // se cores iguais
    if (bb_color === mb_color)
    {
        if (nxt_bb.style.visibility != 'hidden')
        {
            nxt_bb.style.visibility = 'hidden';
        
            search_bb_v(bb_color, pos);
            console.log('calling vertical with ' + current_mb_row%10);
            search_bb_h(bb_color, pos, current_mb_row%10);
        
            mb_back_to_orig();
        }

        else
            console.log('ainda em pop bubbles already hidden');
    }

    else
    {
        if (pos == current_bbs_row)
            current_bbs_row++; 
        
        rows_idx++;
        console.log('pos: ' + pos + ' curr: ' + current_bbs_row);

        // cria nova bubble de mesma cor da principal
        let img = document.createElement('img');

        img.src = '../img/bubble-' + mb_color + '.png';
        img.style.width = '25px';
        img.style.position = 'absolute';
        img.id = 'bb_' + (pos+1) + current_mb_row;
        console.log('id da nova bubble ' + (pos+1) + current_mb_row);
        content.appendChild(img);
        
        // posiciona bubble nova
        let r = main_b.getBoundingClientRect();

        img.style.top = (r.top + window.scrollY - 7) + 'px';
        img.style.left = cols[current_mb_row-1] + 'px';
        console.log('left: ' + cols[current_mb_row-1]);
        
        mb_back_to_orig();

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

function search_bb_h(color, y, x)
{
    console.log('current_mb_row: ' + current_mb_row);
    console.log('received ' + color + ' and ' +y+ ' and ' +x);

    if (current_mb_row == 1)
    {
        console.log('search color of right ' +  y + '' + (x+1));
        
        let bb_right = document.getElementById('bb_' + y + (x+1));
        
        if (bb_right)
        {
            let cor = get_color(bb_right);

            if (cor === color)
            {
                if (bb_right.style.visibility != 'hidden')
                {
                    bb_right.style.visibility = 'hidden';
                    console.log('right popped, will search for' + y + (x+1));
                    search_bb_h(color, y, x+1);
                }

                else
                    console.log('bb_' + y + (x+1)%10 + ' already hidden');
            }
        }
        else
            console.log('searching for right not found');
    }

    else if (current_mb_row == 10)
    {
        console.log('search color of left ' + y + '' + 9);
        
        let bb_left = document.getElementById('bb_' + y + 9);
        
        if (bb_left)
        {
            let cor = get_color(bb_left);

            if (cor === color)
            {
                if (bb_left.style.visibility != 'hidden')
                {
                    bb_left.style.visibility = 'hidden';
                    console.log('left popped, will search for' + y + 8);
                    search_bb_h(color, y, 8);
                }

                else
                    console.log('bb_' + y + 9 + ' already hidden');
            }
        }
        else
            console.log('searching for left not found');
    }

    else
    {
        let doc = document.getElementById('bb_' + y + x);
        let my_color = get_color(doc); 
        
        if (my_color != color)
            console.log('my color dont match');

        else
        {
            console.log('search color of ' + y + (x-1)%10 + ' and ' + y + (x+1)%10);
            
            let bb_left = document.getElementById('bb_' + y + (x-1)%10);
            let bb_right = document.getElementById('bb_' + y + (x+1)%10);


            // 3 casos: bb_left e right nao nulos, bb_left right nulos, somente um dos dois nulos
            if (bb_left && bb_right)
            {
                console.log('both not null');
                let cor_l = get_color(bb_left);
                let cor_r = get_color(bb_right);
            
                if (cor_l === color && cor_r === color)
                {
                    console.log('both color match');
                    if (bb_left.style.visibility != 'hidden')
                    {
                        bb_left.style.visibility = 'hidden';
                        console.log('popped right (both color case)');
                        search_bb_h(color, y, x+1);
                        search_bb_h(color, y, x-1);
                    }

                    if (bb_right.style.visibility != 'hidden')
                    {
                        bb_right.style.visibility = 'hidden';
                        console.log('popped left (both color case)');
                        search_bb_h(color, y, x+1);
                        search_bb_h(color, y, x-1);
                    }
                }

                else
                {
                    if (cor_l === color)
                    {
                        console.log('left color match');
                        if (bb_left.style.visibility != 'hidden')
                        {
                            bb_left.style.visibility = 'hidden';

                            search_bb_h(color, y, x+1);
                            search_bb_h(color, y, x-1);
                        }
                        else
                            console.log('but left already hidden');
                    }

                    else if (cor_r === color)
                    {
                        console.log('right color match');
                        if (bb_right.style.visibility != 'hidden')
                        {
                            bb_right.style.visibility = 'hidden';

                            search_bb_h(color, y, x+1);
                            search_bb_h(color, y, x-1);
                        }
                        else
                            console.log('but right already hidden');

                    }
                }
            }

            else if (!bb_left && !bb_right)
            {
                console.log('left and right null');
            }

            else if (!bb_left || !bb_right)
            {
                if (bb_left)
                {
                    let cor_l = get_color(bb_left);

                    if (cor_l === color)
                    {
                        if (bb_left.style.visibility != 'hidden')
                        {
                             bb_left.style.visibility = 'hidden';
                             search_bb_h(color, y, x+1);
                        }

                        else
                            console.log('bb_' + y + (x-1)%10 + ' already hidden');
                    }
                }

                if (bb_right)
                {
                    let cor_r = get_color(bb_right);

                    if (cor_r === color)
                    {
                        if (bb_right.style.visibility != 'hidden')
                        {
                            bb_right.style.visibility = 'hidden';
                            search_bb_h(color, y, x-1);
                        }

                        else
                            console.log('bb_' + y + (x+1)%10 + ' already hidden');
                    }
                }   
            }    
        }
    }   
}   

function search_bb_v(color, pos)
{
    
    console.log('search color of ' + (pos-1) + current_mb_row%10);
    var next_bb = document.getElementById('bb_' + (pos-1) + current_mb_row%10);
    
    if (next_bb)
    {
        var cor = get_color(next_bb);
 
        if (cor === color)
        {
            console.log('horizontal color match');

            if (next_bb.style.visibility != 'hidden')
            {
                next_bb.style.visibility = 'hidden';
                search_bb_v(color, pos-1);
                search_bb_h(color, pos-1, current_mb_row%10);
            }

            else
                console.log('but horizontal already hidden');
        }
        else
            console.log('horizontal color dont match');
    }
}

// reposiciona bubble principal e gera nova cor
function mb_back_to_orig()
{   
    main_b.style.top = '85%';
    main_b.style.left = '50%';
    main_b.src = images[Math.floor(Math.random()*4)];
    current_mb_row = 6;
}