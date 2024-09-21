function voltar() {
    window.history.back(); // Volta para a página anterior
}

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const projetoIndex = params.get('index'); // Obtém o índice do projeto da URL

    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    const projeto = projetos[projetoIndex];

    if (projeto) {
        document.getElementById('project-title').innerText = projeto.titulo;
        document.getElementById('project-description').innerText = projeto.descricao;
        document.getElementById('project-deadline').innerText = `Prazo de Entrega: ${projeto.data}`;
        document.getElementById('project-value').innerText = `Valor: R$ ${projeto.valor || 'N/A'}`; 
        document.getElementById('project-image').src = projeto.imagem || ''; 
    } else {
        alert('Projeto não encontrado.');
        window.location.href = '.Tela Principal/index.html';
    }
});
