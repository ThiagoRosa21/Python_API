// Função para abrir a aba selecionada
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

// Função para voltar para a tela anterior
function voltartela() {
    window.location.href = "/Tela inicial/index.html";
}

// Função para cadastrar um projeto
document.getElementById('projeto-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('tituloProjeto').value;
    const descricao = document.getElementById('descricaoProjeto').value;
    const data = document.getElementById('dataEntrega').value;
    const imagemInput = document.getElementById('imagemProjeto');
    let imagem = '';

    if (imagemInput.files && imagemInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagem = e.target.result; // Base64 da imagem
            salvarProjeto({ titulo, descricao, data, imagem });
        };
        reader.readAsDataURL(imagemInput.files[0]); // Converte a imagem para Base64
    } else {
        salvarProjeto({ titulo, descricao, data, imagem });
    }
});

// Função para salvar o projeto
function salvarProjeto(projeto) {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    projetos.push(projeto);
    localStorage.setItem('projetos', JSON.stringify(projetos));

    // Limpa o formulário
    document.getElementById('projeto-form').reset();

    // Atualiza a aba Principal com o novo projeto
    mostrarProjetos();
}

// Função para apagar um projeto
function apagarProjeto(index) {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    projetos.splice(index, 1); // Remove o projeto no índice especificado
    localStorage.setItem('projetos', JSON.stringify(projetos));
    mostrarProjetos(); // Atualiza a lista de projetos na tela
}

// Função para exibir os projetos na aba Principal
function mostrarProjetos() {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    const principalDiv = document.getElementById('principal');

    let projetosHTML = '<h2>Projetos Cadastrados</h2>';
    projetosHTML += '<div class="service1-wrapper">'; // Adiciona a classe de wrapper para os cards

    if (projetos.length > 0) {
        projetos.forEach((projeto, index) => {
            projetosHTML += `
                <div class="service1-item">
                    <h3>${projeto.titulo}</h3>
                    <p style="font-weight:bold;">Descrição:</p>
                    <p>${projeto.descricao}</p>
                    <p>Data de Entrega: ${projeto.data}</p>`;

            // Exibe a imagem se houver
            if (projeto.imagem) {
                projetosHTML += `<img src="${projeto.imagem}" alt="Imagem do Projeto" style="max-width: 100%; height: auto;">`;
            }

            projetosHTML += `<br><br><button onclick="apagarProjeto(${index})">Apagar</button>
                </div>`;
        });
    } else {
        projetosHTML += '<p>Nenhum projeto cadastrado.</p>';
    }

    projetosHTML += '</div>'; // Fecha a div do wrapper
    principalDiv.innerHTML = projetosHTML;
}

// Chama a função para exibir os projetos ao carregar a página
document.addEventListener('DOMContentLoaded', mostrarProjetos);
