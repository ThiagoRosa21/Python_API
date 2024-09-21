function openTab(evt, tabName) {
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    var tabLinks = document.getElementsByClassName("tab-link");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}


function voltartela() {
    window.history.back();
}


document.getElementById('projeto-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('tituloProjeto').value;
    const descricao = document.getElementById('descricaoProjeto').value;
    const data = document.getElementById('dataEntrega').value;
    const valor = document.getElementById('valor').value; // POR ALGUM MOTIVO O VALOR DO PROJETO NÃO PRINTA NA TELA QUANDO COLOCO IMAGEM
    const imagemInput = document.getElementById('imagemProjeto'); // ALÉM DISSO, O METODO DE PESQUISA TÁ DANDO RUIM 
    let imagem = '';                                              // TIPO, QUANDO PESQUISO O NOME DO PROJETOE CLICO EM SAIBA MAIS, ELE VAI
                                                                  // PARA PÁGINA DE UM PROJETO DIFERENTE 
    const data_verify = new Date(); // CONSTANTE DE VERIFICAR DE DATA


    // VERIFICADORES DOS INPUTS

if(titulo.length <= 8){
    alert("Adicione pelo menos 8 caracteres no título")
}

if(descricao.length >= isNaN){
    alert("Coloque no mínimo 1 caracteres na descrição do projeto")
}

if (valor <= 0) {
    alert("Por favor, insira um valor de pagamento válido.");
    return;
}

// ADICIONAR CONDIÇÃO DA DATA
// ADICIONAR OPÇÃO PARA O USUÁRIO COLOCAR IMAGEM
// ADICIONAR FUNÇÃO ARA NÃO CADASTRAR PROJETO CASO UMA DAS CONDIÇÕES NÃO SEJA ADERIDA


    if (imagemInput.files && imagemInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagem = e.target.result; 
            salvarProjeto({ titulo, descricao, data,imagem });
        };
        reader.readAsDataURL(imagemInput.files[0]);
    } else {
        salvarProjeto({ titulo, descricao, data,valor, imagem });
    }
});


function salvarProjeto(projeto) {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    const emailUsuarioLogado = localStorage.getItem("usuarioLogado");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioAtual = usuarios.find(usuario => usuario.email === emailUsuarioLogado);


    projeto.nomeUsuario = usuarioAtual ? usuarioAtual.nome : "Usuário Desconhecido";

    projetos.push(projeto);
    localStorage.setItem('projetos', JSON.stringify(projetos));

    document.getElementById('projeto-form').reset();
    mostrarProjetos();
}


function apagarProjeto(index) {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    projetos.splice(index, 1); 
    localStorage.setItem('projetos', JSON.stringify(projetos));
    mostrarProjetos(); 
}


function mostrarProjetos() {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    const principalDiv = document.getElementById('principal');

    let projetosHTML = '<h2>Projetos Cadastrados</h2>';
    projetosHTML += '<div class="service1-wrapper">';

    if (projetos.length > 0) {
        projetos.forEach((projeto, index) => {
            projetosHTML += `
                <div class="service1-item">
                    <h3>${projeto.titulo}</h3>
                    <p><strong>Prazo de Entrega:</strong> ${projeto.data}</p>
                    <p><strong>Pagamento:</strong> R$ ${projeto.valor}</p>
                    <p><strong>Criado por:</strong> ${projeto.nomeUsuario}</p>
            `;

            if (projeto.imagem) {
                projetosHTML += `<img src="${projeto.imagem}" alt="Imagem do Projeto" style="max-width: 100%; height: auto;">`;
            }

            projetosHTML += `<a href="/tela de descrição/index.html?index=${index}" style="display: inline-block; padding: 10px 15px; background-color: #162635; color: white; border-radius: 5px; text-decoration: none; font-weight: bold;">Saiba mais</a>
            `;
            projetosHTML += `<br><br><button onclick="apagarProjeto(${index})"style="display: inline-block; padding: 10px 15px; background-color: #162635; color: white; border-radius: 5px; text-decoration: none; font-weight: bold; " >Apagar</button>
            </div>`;
        });
    } else {
        projetosHTML += '<p>Nenhum projeto cadastrado.</p>';
    }

    projetosHTML += '</div>';
    principalDiv.innerHTML = projetosHTML;
}

document.addEventListener('DOMContentLoaded', mostrarProjetos);


function pesquisa() {
    
    const termoPesquisa = document.getElementById('searchInput').value.toLowerCase();
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    const principalDiv = document.getElementById('principal');

    let projetosHTML = '<h2>Projetos Cadastrados</h2>';
    projetosHTML += '<div class="service1-wrapper">';


    
    const projetosFiltrados = projetos.filter(projeto =>
        projeto.titulo.toLowerCase().includes(termoPesquisa) ||
        projeto.descricao.toLowerCase().includes(termoPesquisa) ||
        projeto.data.toLowerCase().includes(termoPesquisa)
    );

    if (projetosFiltrados.length > 0) {
        projetosFiltrados.forEach((projeto, index) => {
            projetosHTML += `
                <div class="service1-item">
                    <h3>${projeto.titulo}</h3>
                    <p style="font-weight:bold;">Descrição:</p>
                    <p>${projeto.descricao}</p>
                <a href="/tela de descrição/index.html?index=${index}" style="display: inline-block; padding: 10px 15px; background-color: #162635; color: white; border-radius: 5px; text-decoration: none; font-weight: bold;">Saiba mais</a>
            
                    <p> Prazo de Entrega ${projeto.data}</p> </div>`;

            if (projeto.imagem) {
                projetosHTML += `<img src="${projeto.imagem}" alt="Imagem do Projeto" style="max-width: 100%; height: auto;">`;
            }
        });
    } else {
        projetosHTML += '<p>Nenhum projeto encontrado.</p>';
    }

    projetosHTML += '</div>';
    principalDiv.innerHTML = projetosHTML;
}



function carregarPerfil() {
    var emailUsuarioLogado = localStorage.getItem("usuarioLogado");

    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    var usuarioAtual = usuarios.find(function(usuario) {
        return usuario.email === emailUsuarioLogado;
    });

    if (usuarioAtual) {
        document.getElementById("nome").value = usuarioAtual.nome;
    } else {
        alert("Usuário não encontrado.");
    }
}


function editarPerfil() {
    var emailUsuarioLogado = localStorage.getItem("usuarioLogado");

    var emailAtual = document.getElementById("emailAtual").value;
    var senhaAtual = document.getElementById("senhaAtual").value;
    var novoNome = document.getElementById("nome").value;
    var novaSenha = document.getElementById("senhaNova").value;
    var confirmarSenhaNova = document.getElementById("confirmarSenhaNova").value;


    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    var usuarioIndex = usuarios.findIndex(function(usuario) {
        return usuario.email === emailUsuarioLogado;
    });

    if (usuarioIndex !== -1) {
        var usuarioAtual = usuarios[usuarioIndex];

        // Verifica se o e-mail e a senha atuais estão corretos
        if (usuarioAtual.email !== emailAtual || usuarioAtual.senha !== senhaAtual) {
            alert("E-mail ou senha atual incorretos. Por favor, tente novamente.");
            return;
        }

        // Verifica se os campos estão preenchidos
        if (!novoNome || !novaSenha || !confirmarSenhaNova) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Verifica se a nova senha tem pelo menos 8 caracteres
        if (novaSenha.length < 8) {
            alert("A nova senha precisa ter no mínimo 8 dígitos.");
            return;
        }

        // confimação de senha
        if (novaSenha !== confirmarSenhaNova) {
            alert("As senhas novas não coincidem.");
            return;
        }

        // Atualização de dados
        usuarios[usuarioIndex].nome = novoNome;
        usuarios[usuarioIndex].senha = novaSenha;

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Perfil atualizado com sucesso!");
    } else {
        alert("Erro ao atualizar o perfil.");
    }
}

// carregar a página de edição
document.addEventListener("DOMContentLoaded", function () {
    carregarPerfil();
});
