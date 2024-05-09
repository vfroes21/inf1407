This repository contains sources from my two projects of Web Programming course. The first one focuses on practicing frontend programming (HTML + CSS + JavaScript), and the other is focused on backend + frontend implementation, using Django as a backend framework.
</br></br>
<h1>How to run</h1>

<h2>T1</h2>

T1 is Bubble Shooter clone game.

1. Clone the project to your PC
2. Start the application by double clicking index.html, located at T1/html

You'll see a login interface requesting a valid e-mail in Priplanus format. The format rule is as follows:

 “<em>\user[domain|domain|...|domain]</em>” (without quotes), 

where user and domain are words composed only of consonants. Every email has at least two domains, and the characters \\, [, ] and | are a mandatory part of the e-mail. Ellipsis were used to demonstrate that an e-mail may have multiple domains.

Valid e-mail example: <b>\\[c|c]</b>

For more details, you can verify the regex that was used to implement this rule, located at line 17 of index.js file.
</br></br></br>

 <h2>T2</h2>

T2 is a simple CRUD website with the purpose of cataloging FIFA World Cup sticker cards. For more details, check its readme file.

1. Install Django framework (if not installed)
2. Clone the project to your PC
3. In cmd, go to T2 directory
4. Run `python manage.py runserver`
5. Locate in cmd output `Starting development server at http://127.0.0.1:8000"` (or similar)
6. Click this URL while holding `Ctrl`, or type it in your browser, to open the website
</br></br></br>

<h1>Screenshots</h1>

<h2>T1</h2>

![image](https://github.com/vfroes21/inf1407/assets/71036803/b54762bf-3eb9-4764-8c9c-7a2a8db61184)
E-mail validation screen
</br></br></br>
![image](https://github.com/vfroes21/inf1407/assets/71036803/f8221a47-5c27-4ab3-903a-420ea5eb9e87)
GameBoy Advance inspired animation
</br></br></br>
![image](https://github.com/vfroes21/inf1407/assets/71036803/8f2bc6fd-1cfa-4606-b644-02f743d85f59)
Main menu
</br></br></br>
![image](https://github.com/vfroes21/inf1407/assets/71036803/e31fff4b-d901-4e4a-9a7b-d83acb773cfd)
Game screen
</br></br></br></br>
<h2>T2</h2>

![image](https://github.com/vfroes21/inf1407/assets/71036803/aeb780f4-25a8-4bab-a62d-a870010402a1)
Initial screen
</br></br></br>
![image](https://github.com/vfroes21/inf1407/assets/71036803/d162734d-532b-470a-be40-616bee9c34a7)
Login page
</br></br></br>
![image](https://github.com/vfroes21/inf1407/assets/71036803/57b629df-5d4e-4968-b845-2a62461a3eff)
Sign up page
</br></br></br>
![image](https://github.com/vfroes21/inf1407/assets/71036803/856cb889-0785-4990-965a-a808d93cd16c)
Home page after login
</br></br></br>
![image](https://github.com/vfroes21/inf1407/assets/71036803/a51f4626-4cd2-48f4-91f4-e9f6fefdc8f3)
Cataloging a new sticker card
</br></br></br>
![image](https://github.com/vfroes21/inf1407/assets/71036803/476dda94-4393-4128-bbc4-1a14cef01beb)
Home page after cataloging a new sticker card
</br>
