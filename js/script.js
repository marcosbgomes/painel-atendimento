const telaAvalicao = document.getElementById("avaliar-atendimento");
const btnAvaliar = document.getElementById("bt-avaliar-atendimento");
const btnCancelarAvaliacao = document.getElementById("btn-cancelar");

// Evento para mostrar a tela de avaliação
btnAvaliar.addEventListener("click", () => {
    telaAvalicao.classList.add("ativa");
});

// Evento para cancelar e fechar avaliação
btnCancelarAvaliacao.addEventListener("click", () => {
    fecharAvaliacao();
});


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


// Sistema de avaliação de atendimento
let avaliacoes = {
    "muito-ruim": 0,
    "ruim": 0,
    "regular": 0,
    "bom": 0,
    "excelente": 0
};
const opcoesAvaliacao = document.querySelectorAll(".btn-avaliacao");
opcoesAvaliacao.forEach((opcao) => {
    opcao.addEventListener("click", () => {
        opcoesAvaliacao.forEach((op) => {
            op.classList.remove("selecionada");
        });

        opcao.classList.add("selecionada");
    });
});

const btnConfirmarAv = document.getElementById("btn-confirmar");
const mensagemAv = document.getElementById("mensagem-avaliacao");
btnConfirmarAv.addEventListener("click", () => {
    const opcaoSelecionada = document.querySelector(".btn-avaliacao.selecionada");

    if (!opcaoSelecionada) {
        return;
    }

    const nota = opcaoSelecionada.dataset.nota;
    avaliacoes[nota]++;
    // Editar essa mensagem depois
    mensagemAv.textContent = "Obrigado por sua avaliação! " + nota + ": "+ avaliacoes[nota];

    // Mostra uma tela superior com uma mensagem
    document.getElementById("tela-mensagem-avaliacao").classList.add("ativa");

    // Desativa a janela de avaliação após 1 segundo
    setTimeout(() => {
        fecharAvaliacao();
    }, 1000);

    // Fecha a janela de avaliação após 3 segundos
    setTimeout(() => {
        document.getElementById("tela-mensagem-avaliacao").classList.remove("ativa");
    }, 3000);
});


// Função para fechar a tela de avaliação
function fecharAvaliacao() {
    opcoesAvaliacao.forEach((op) => {
        op.classList.remove("selecionada");
    });
    telaAvalicao.classList.remove("ativa");
}
