onload = function() {
    this.document.getElementById('id_username').addEventListener('keyup', function(e) {
        var campoUsername = document.getElementById('id_username');
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET", "verify-user?username=" + encodeURIComponent(campoUsername.value), true)
        xmlhttp.onreadystatechange = function (){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var resposta = JSON.parse(xmlhttp.responseText);

                if (resposta.existe) {
                    campoUsername.style = "border: 3px solid #FF0000";
                }
                
                else 
                {
                    campoUsername.style = "border: 3px solid #00FF00";
                }
            }
        }

        xmlhttp.send(null);
    })
}