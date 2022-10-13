images = [
    '../img/bubble-b.png',
    '../img/bubble-g.png',
    '../img/bubble-r.png',
    '../img/bubble-y.png'
]

onload = function(){
    bubbles=[];

    document.addEventListener('keyup', spc_press);
    content = document.getElementById('content');

    for(let i = 0; i < 4; i++)
    {
        let img = document.createElement('img');
        idx = Math.floor(Math.random()*4);

        img.src = images[idx];
        img.style.width = '25px';

        content.appendChild(img);
    }
    
    main_b = document.getElementById('main');
    main_b.src = images[Math.floor(Math.random()*4)];
}

function spc_press(e)
{
    if(e.code === "Space")
    {
        my_time = setInterval(move_mbubble, 10);
        //set_timer();
    }
}

function set_timer()
{
    
}

function move_mbubble()
{
    let speed = 3, y = main_b.offsetTop;
    console.log(y);
    if (y>300)
    {
        y-=speed;
        main_b.style.top = y + 'px';
    }

    else
    {
        clearInterval(my_time);
        console.log('stopped timer');
    }
}