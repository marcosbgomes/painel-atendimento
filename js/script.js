const telaAvalicao = document.getElementById("avaliar-atendimento");
const btnAvaliar = document.getElementById("bt-avaliar-atendimento");
const btnCancelarAvaliacao = document.getElementById("btn-cancelar");

// Variáveis para gerenciar retirada de senha
const letrasSenha = ["G", "C", "P", "E"];
const opcoesSenha = {
    "G": "btn-atendimento-geral",
    "C": "btn-consultas-agendadas",
    "P": "btn-atendimento-preferencial",
    "E" :"btn-exames-laboratoriais"
};
let contadorSenhas = {
    "G": 0,
    "C": 0,
    "P": 0,
    "E": 0
};

const senhaImpressa = document.getElementById("senha-impressa");
const papelSenha = document.getElementById("papel-senha");


// Evento para mostrar a tela de avaliação
btnAvaliar.addEventListener("click", () => {
    telaAvalicao.classList.add("ativa");
});

// Evento para cancelar e fechar avaliação
btnCancelarAvaliacao.addEventListener("click", () => {
    fecharAvaliacao();
});


// Cria evento para todos os botões de retirada de senha
letrasSenha.forEach((letra) => {
    const botao = document.getElementById(opcoesSenha[letra]);
    botao.addEventListener("click", () => {
        // Incrementa o contador do tipo selecionado
        contadorSenhas[letra]++;
        // Formata o número da senha
        const numero = String(contadorSenhas[letra]).padStart(3, "0");
        // Atualiza a senha exibida no papel
        senhaImpressa.textContent = `${letra}-${numero}`;
        // Reiniciar a animação de impressão
        papelSenha.classList.remove("imprimindo");
        void papelSenha.offsetWidth;
        papelSenha.classList.add("imprimindo");
    });
});

// Função para fechar a tela de avaliação
function fecharAvaliacao() {
    telaAvalicao.classList.remove("ativa");
}
