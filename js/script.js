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
    // Busca o notão correspondente pelo id
    const botao = document.getElementById(opcoesSenha[letra]);

    // Adiciona o evento de clique para o botão correspondente
    botao.addEventListener("click", () => {
        // Incrementa o contador do tipo selecionado
        contadorSenhas[letra]++;
        // Formata o número da senha
        const numero = String(contadorSenhas[letra]).padStart(3, "0");
        const senhaGerada = `${letra}-${numero}`;
        // Atualiza a senha exibida no papel
        senhaImpressa.textContent = senhaGerada;
        // Reiniciar a animação de impressão
        papelSenha.classList.remove("imprimindo");
        void papelSenha.offsetWidth;
        papelSenha.classList.add("imprimindo");

        // Salva na tabela de chamada
        const tabelaTriagem = document.querySelector("#triagem-tabela tbody")
        // Hora atual
        const dataAtual = new Date();
        const hora = String(dataAtual.getHours()).padStart(2, "0");
        const minutos = String(dataAtual.getMinutes()).padStart(2, "0");
        const horaAtual = `${hora}:${minutos}`;
        const tipoAtendimento = botao.textContent;

        // Cria uma nova linha para adicionar na tabela com a senha
        const novaLinha = document.createElement("tr")
        novaLinha.innerHTML = `
            <td>${senhaGerada}</td>
            <td>${horaAtual}</td>
            <td>${tipoAtendimento}</td>
        `;
        // Adiciona a nova linha na tabela
        tabelaTriagem.appendChild(novaLinha);
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
    mensagemAv.textContent = "Obrigado por sua avaliação!";

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


// -----------------------------------------------------------------
// Tela de atendimento
// Botões
const btn_triagem = document.getElementById("btn-triagem");
const btn_consultorios = document.getElementById("btn-consultorios");

// Telas
const tela_triagem = document.getElementById("triagem");
const tela_consultorios = document.getElementById("consultorios");

// Eventos
btn_triagem.addEventListener("click", () => {
    btn_triagem.classList.add("btn-atendimento-ativo");
    btn_consultorios.classList.remove("btn-atendimento-ativo");

    tela_triagem.classList.add("atendimento-ativo")
    tela_consultorios.classList.remove("atendimento-ativo")
});

btn_consultorios.addEventListener("click", () => {
    btn_consultorios.classList.add("btn-atendimento-ativo");
    btn_triagem.classList.remove("btn-atendimento-ativo");

    tela_consultorios.classList.add("atendimento-ativo")
    tela_triagem.classList.remove("atendimento-ativo")
});
