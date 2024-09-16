function showCard(cardId) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(cardId).style.display = "flex";
}


document.addEventListener("DOMContentLoaded", function() {
    function login() {
        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha").value;

        if (email === "1234" && senha === "1234") {
            window.location.href = "/Tela Principal/index.html";
        } else {
            alert("E-mail ou senha incorretos.");
        }
    }


    document.querySelector(".btn-login").addEventListener("click", login);
});

function cadastro(params) {
    window.location.href = "/Tela Principal/index.html";
}