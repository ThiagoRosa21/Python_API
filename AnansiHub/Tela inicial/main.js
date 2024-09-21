document.addEventListener("DOMContentLoaded", function() {

    // Função de login
    function login() {
        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha").value;
        var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
        // Método para encontrar o usuário
        var usuarioEncontrado = usuarios.find(function(usuario) {
            return usuario.email === email && usuario.senha === senha;
        });
    
        if (usuarioEncontrado) {
            // Salvar o e-mail do usuário logado no localStorage para usar depois
            localStorage.setItem("usuarioLogado", email);
            alert("Login bem-sucedido!");
            window.location.href = "/Tela Principal/index.html";  // Redireciona para a Tela Principal
        } else {
            alert("E-mail ou senha incorretos.");
        }
    }
    
    // Adiciona o evento de clique para o botão de login
    document.getElementById("login-btn").addEventListener("click", login);

    function verificarEmail() {
        var email = document.getElementById("cadastro-email").value;
    
        // Verificar se o e-mail é válido com uma expressão regular
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return false;
        }
    
        return true;
    }
    

    function cadastro() {
        var email = document.getElementById("cadastro-email").value;
        var senha = document.getElementById("cadastro-senha").value;
        var nome = document.getElementById("cadastro-nome").value;
    
        // Verificar se os campos estão preenchidos
        if (!email || !senha || !nome) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Verificação se a senha tem pelo menos 8 caracteres
        if (senha.length < 8) {
            alert("A senha precisa ter no mínimo 8 dígitos.");
            return;
        }

        // Verificar e-mail
        if (!verificarEmail()) {
            return;
        }

        // Se todos os campos forem válidos, prossegue com o cadastro
        var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        
        // Verifica se o e-mail já está cadastrado
        var emailExistente = usuarios.find(function(usuario) {
            return usuario.email === email;
        });

        if (emailExistente) {
            alert("E-mail já cadastrado. Por favor, faça login.");
            return;
        }

        // Adicionar o novo usuário ao localStorage
        usuarios.push({ email: email, senha: senha, nome: nome });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Salvar o e-mail do usuário logado no localStorage
        localStorage.setItem("usuarioLogado", email);

        alert("Cadastro realizado com sucesso!");
        window.location.href = "/Tela Principal/index.html";  // Redireciona para a Tela Principal
    }

    // Adiciona o evento de clique para o botão de cadastro
    document.getElementById("signup-btn").addEventListener("click", cadastro);
});
function showCard(cardId) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(cardId).style.display = "flex";
}