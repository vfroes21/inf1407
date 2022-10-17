images = [
    '../img/bubble-b.png',
    '../img/bubble-g.png',
    '../img/bubble-r.png',
    '../img/bubble-y.png'
]

rows = [34, 65, 94, 124, 154, 184, 214, 244, 275, 304, 331, 357, 383, 409, 435, 460, 487, 513, 539];     // posicoes y de cada linha de bubbles
cols = [2, 25, 50, 75, 100, 124, 149, 177, 202, 225];   // posicoes x das bubbles
bubble_ammo = 40;

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
    passed_pop = false;     // passou por bubbles estouradas?

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
    if (d.style.visibility == 'hidden')
    {
        passed_pop = true;

        while (d.style.visibility == 'hidden')
        {
            res--;
            str = 'bb_' + (aux-c++) + current_mb_row%10;
            last_popped = str;
            
            console.log('then on sec loop ' + str);
            console.log(last_popped);
            d = document.getElementById(str);
        }
    }

    if (passed_pop)
    {
        last_popped = 'bb_' + (res+1) + current_mb_row%10;
        console.log('last popped: ' + last_popped);
    }
    console.log('vai ser inserida em ' + res);
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
        console.log('shoot at ' + rows[pos]);

        clearInterval(my_time);
        let c = bubble_case(pos+1);
        pop_bubbles(c, pos+1);
        
        bubble_ammo--;
    }     
}

function bubble_case(pos)
{
    console.log('checking bubble case');

    if (current_mb_row == 1)
    {
        console.log('on left corner, searching on right: ' +  (pos+1) + '' + current_mb_row%10);
        
        let bb_right = document.getElementById('bb_' + (pos+1) + current_mb_row%10);
        
        if (bb_right)
        {
            let color = get_color(bb_right);
            console.log('found neighbor of color ' + color + ', returning c2');

            return 'c2';
        }
        
        else
        {
            console.log('no neighbor, returning c1');
            
            return 'c1';
        }
    }

    else if (current_mb_row == 10)
    {
        console.log('on right corner, searching on left ' + (pos+1) + '' + 9);
        
        let bb_left = document.getElementById('bb_' + (pos+1) + 9);
        
        if (bb_left)
        {
            let color = get_color(bb_left);
            console.log('found neighbor of color ' + color + ', returning c4');
            
            return 'c4';
        }

        else
        {
            console.log('no neighbor, returning c3');

            return 'c3';
        }
    }
    
    else
    {
        console.log('no corner, looking for ' + (pos+1) + (current_mb_row-1)%10 + ' and ' + (pos+1) + (current_mb_row+1)%10);
        
        let bb_left = document.getElementById('bb_' + (pos+1) + (current_mb_row-1)%10);
        let bb_right = document.getElementById('bb_' + (pos+1) + (current_mb_row+1)%10);

        // 3 casos: bb_left e right nao nulos, bb_left right nulos, somente um dos dois nulos
        if (!bb_left && !bb_right)
        {
            console.log('no neighbors, returning n1');

            return 'n1';
        }

        else if (bb_left && bb_right)
        {
            console.log('both are neighbors, returning n2');
            
            return 'n2';
        }
        
        else if (!bb_left || !bb_right)
        {
            console.log('left or right null');
            
            if (bb_left)
            {
                console.log('only left neighbor, returning n3');

                return 'n3';
            }

            if (bb_right)
            {
                console.log('only right neighbor, returning n4');

                return 'n4';
            }   
        }  
    }
}   

function pop_bubbles(c, pos)
{
    var nxt_bb = document.getElementById('bb_'+ pos + current_mb_row%10);

    var bb_color = get_color(nxt_bb);
    var mb_color = get_color(main_b);
    
    console.log('bola acima da principal: ' + pos + current_mb_row%10, bb_color, mb_color);

    
    if (bb_color === mb_color)
    {
        switch(c)
        {
            case 'n1':
            {   console.log('vertical search in n1');
                
                search_bb_v(mb_color, pos, current_mb_row%10);
       
                break;        
            }
            
            case 'c1':
            {
                console.log('vertical search in c1');

                search_bb_v(mb_color, pos, current_mb_row%10);

                break;
            }

            case 'c3':
            {
                console.log('vertical search in c3');

                search_bb_v(mb_color, pos, current_mb_row%10);

                break;
            }

            case 'n2':
            case 'n3':
            case 'n4':
            case 'c2':
            case 'c4':
            {
                console.log(c + ' horizontal on neighbor and vertical above');
                
                search_bb_h(mb_color, (pos+1), current_mb_row%10);
                search_bb_v(mb_color, pos, current_mb_row%10);
                
                break;
            }
        }
    }

    else
    {
        console.log('on pop bubbles above dont match');

        if ((current_mb_row)%10 == 0)
        {
            console.log('on right corner');

            var l_bubble = document.getElementById('bb_' + pos + current_mb_row-1);

            if (l_bubble && l_bubble.style.visibility != 'hidden')
            {
                let cor = get_color(l_bubble);

                if (mb_color === cor)
                {
                    console.log('left color match');
                    search_bb_h(mb_color, (pos+1), current_mb_row%10);   
                }
                else position_bubble(mb_color, pos);
            }

            else position_bubble(mb_color, pos);
        }

        else if (current_mb_row == 1)
        {
            console.log('on left corner');

            var r_bubble = document.getElementById('bb_' + pos + (current_mb_row+1));
        
            if (r_bubble && r_bubble.style.visibility != 'hidden')
            {
                let cor = get_color(r_bubble);

                if (mb_color === cor)
                {
                    console.log('right color match');
                    search_bb_h(mb_color, (pos+1), current_mb_row%10);
                }
                else position_bubble(mb_color, pos);
            }

            else position_bubble(mb_color, pos);
        }

        else
        {
            var l_bubble = document.getElementById('bb_' + pos + (current_mb_row-1));
            var r_bubble = document.getElementById('bb_' + pos + (current_mb_row+1));

            if (l_bubble && r_bubble && (l_bubble.style.visibility != 'hidden' && r_bubble.style.visibility != 'hidden'))
            {
                console.log('between two bubbles');

                let l_cor = get_color(l_bubble);
                let r_cor = get_color(r_bubble);

                if (mb_color != l_cor && mb_color != r_cor)
                    position_bubble(mb_color, pos);
                
                else
                    search_bb_h(mb_color, (pos+1), current_mb_row%10);
            }

            else if (!l_bubble || !r_bubble)
            {
                if (l_bubble && l_bubble.style.visibility != 'hidden')
                {
                    let cor = get_color(l_bubble);

                    if (mb_color === cor)
                    {
                        console.log('left color match');
                        search_bb_h(mb_color, (pos+1), current_mb_row%10);   
                    }
                    else position_bubble(mb_color, pos);   
                }

                if (r_bubble && r_bubble.style.visibility != 'hidden')
                {
                    let cor = get_color(r_bubble);

                    if (mb_color === cor)
                    {
                        console.log('right color match');
                        search_bb_h(mb_color, (pos+1), current_mb_row%10);
                    }
                    else position_bubble(mb_color, pos);
                }
            }
            else position_bubble(mb_color, pos);
        }
    }

    mb_back_to_orig();
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
    console.log('received color: ' + color + ', and ' +y+ ' and ' +x);

    if (x == 1)
    {
        search_right(color, y, x);
    }
    
    else if (x == 0)
    {
        search_left(color, y, x);
    }
    
    else
    {
        console.log('search color of ' + y + (x-1)%10 + ' and ' + y + (x+1)%10);
            
        let bb_left = document.getElementById('bb_' + y + (x-1)%10);
        let bb_right = document.getElementById('bb_' + y + (x+1)%10);   

        if (bb_left)
        {
            search_left(color, y, x);
        }

        if (bb_right)
        {
            search_right(color, y, x);
        }
    }   
}   

function search_bb_v(color, pos, x)
{
    console.log('search color of ' + pos + x);

    var next_bb = document.getElementById('bb_' + pos + x);
    
    if (next_bb)
    {
        var cor = get_color(next_bb);
 
        if (next_bb.style.visibility != 'hidden')
        {
            if (cor === color)
            {
                console.log('vertical color match');

                next_bb.style.visibility = 'hidden';
                
                search_bb_h(color, pos, x);
                search_bb_v(color, pos-1, x);       
            }
            else console.log('vertical color doesnt match');
        }
        else console.log('vertical already hidden');
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

function search_left(color, y, x)
{
    if (x == 0) x = 10;
    
    console.log('search color of left ' + y + '' + (x-1)%10);     
    
    let bb_left = document.getElementById('bb_' + y + (--x)%10);
    
    while (bb_left && bb_left.style.visibility != 'hidden')
    {
        let cor = get_color(bb_left);
        if (cor === color)
        {
            bb_left.style.visibility = 'hidden';

            console.log('left popped, will search vertically and for ' + y + (x-1));
            search_bb_v(color, y-1, x);
            search_down(color, y+1, x);

            x--;

            bb_left = document.getElementById('bb_' + y + x);
            if (x == 0) break;
        }
        else 
        {
            console.log('left color doesnt match');
            break;
        }
    }
}

function search_right(color, y, x)
{
    console.log('search color of right ' +  y + '' + (x+1)%10);
        
    let bb_right = document.getElementById('bb_' + y + (++x)%10);
        
    while (bb_right && bb_right.style.visibility != 'hidden')
    {
        let cor = get_color(bb_right);
        if (cor === color)
        {
            bb_right.style.visibility = 'hidden';
           
            console.log('right popped, will search vertically and for ' + y + (x+1)%10);

            search_bb_v(color, y-1, x);
            search_down(color, y+1, x);

            x++;
            
            if (x == 10) x = 0;
            if (x == 1) break;
            
            bb_right = document.getElementById('bb_' + y + x);
        }
        else
        {
            console.log('right color doesnt match');
            break;
        }    
    }
}

function search_down(color, pos, x)
{
    console.log('(down) search color of ' + pos + x);

    var next_bb = document.getElementById('bb_' + pos + x);
    
    if (next_bb)
    {
        var cor = get_color(next_bb);
 
        if (next_bb.style.visibility != 'hidden')
        {
            if (cor === color)
            {
                console.log('vertical color match on below');

                next_bb.style.visibility = 'hidden';
                
                search_bb_h(color, pos, x);
                search_bb_v(color, pos+1, x);       
            }
            else console.log('vertical color below doesnt match');
        }
        else console.log('vertical below already hidden');
    }
}

function position_bubble(color, pos)
{
    if (!passed_pop)
    {
        if (pos == current_bbs_row)
            current_bbs_row++; 
        
        console.log('pos: ' + pos + ' curr: ' + current_bbs_row);

        // cria nova bubble de mesma cor da principal
        let img = document.createElement('img');

        img.src = '../img/bubble-' + color + '.png';
        img.style.width = '25px';
        img.style.position = 'absolute';
        img.id = 'bb_' + (pos+1) + current_mb_row%10;
                    
        console.log('id da nova bubble ' + (pos+1) + current_mb_row%10);
                    
        content.appendChild(img);

        // posiciona bubble nova
        let r = main_b.getBoundingClientRect();

        img.style.top = (r.top + window.scrollY - 7) + 'px';
        img.style.left = cols[current_mb_row-1] + 'px';
        console.log('left: ' + cols[current_mb_row-1]);
    }

    else
    {
        let bb = document.getElementById(last_popped);
        console.log(last_popped + ' invisivel');

        bb.src = '../img/bubble-' + color + '.png';
        bb.style.visibility = 'visible';

        console.log('ficou visivel e assumiu cor ' + color);
    }
}