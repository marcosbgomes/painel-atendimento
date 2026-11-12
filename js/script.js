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

        // Atualiza o campo de próxima senha
        atualizarProximaSenha();
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


// Tabela
const txtProximaSenha = document.getElementById("txt-proxima-senha-triagem");
const corpoTabelaTriagem = document.querySelector("#triagem-tabela tbody");

// A função verifica se tem alguma linha selecionada para ser chamada como próxima senha.
// Se não houver, a primeira linha da tabela será a próxima senha.
// Se a tabela estiver vazia, o campo de próxima senha mostra apenas "---".
function atualizarProximaSenha() {
    const linhaSelecionada = corpoTabelaTriagem.querySelector(".proxima-senha-selecionada");

    if (linhaSelecionada) {
        txtProximaSenha.textContent = linhaSelecionada.cells[0].textContent;
    } else {
        const primeiraLinha = corpoTabelaTriagem.querySelector("tr");

        if (primeiraLinha) {
            txtProximaSenha.textContent = primeiraLinha.cells[0].textContent;
        } else {
            txtProximaSenha.textContent = "---";
        }
    }
}

// Evento para clique nas linhas da tabela de triagem
corpoTabelaTriagem.addEventListener("click", (event) => {
    // Linha clicada
    const linhaSelecionada = event.target.closest("tr");

    if (!linhaSelecionada) return;

    if (linhaSelecionada.classList.contains("proxima-senha-selecionada")) {
        linhaSelecionada.classList.remove("proxima-senha-selecionada");
    } else {
        // Remove seleção da anteior primeiro
        const linhaAnterior = corpoTabelaTriagem.querySelector(".proxima-senha-selecionada");
        if (linhaAnterior) {
            linhaAnterior.classList.remove("proxima-senha-selecionada");
        }

        // Marca a nova linha
        linhaSelecionada.classList.add("proxima-senha-selecionada");
    }

    // Atualiza o campo de próxima senha
    atualizarProximaSenha();
});

atualizarProximaSenha();


// Realização da triagem
const telaTriagemChamada = document.getElementById("triagem-chamada");
const telaTriagemRealiza = document.getElementById("triagem-realiza");
const btnIniciarTriagem = document.getElementById("btn-iniciar-triagem");
const btnsGravidade = document.querySelectorAll(".btn-gravidade");
const btnCancelarTriagem = document.getElementById("cancelar-triagem");

// Seleção de gravidade
btnsGravidade.forEach(botao => {
    botao.addEventListener("click", () => {
        btnsGravidade.forEach(btn => btn.classList.remove("selecionado"));
        botao.classList.add("selecionado");
    });
});

// Realização da triagem
btnIniciarTriagem.addEventListener("click", () => {
    if (txtProximaSenha.textContent === "---") return;

    // Limpa o campo de nome do paciente
    const inputNomePaciente = document.getElementById("nome-paciente");
    inputNomePaciente.value = "";

    // Desmarca qualquer botão de gravidade selecionado
    btnsGravidade.forEach(btn => btn.classList.remove("selecionado"));

    document.getElementById("senha-em-triagem").textContent = txtProximaSenha.textContent;

    telaTriagemChamada.classList.remove("triagem-ativa");
    telaTriagemRealiza.classList.add("triagem-ativa");
});

// Cancela a triagem e fecha a janela
btnCancelarTriagem.addEventListener("click", () => {
    telaTriagemRealiza.classList.remove("triagem-ativa");
    telaTriagemChamada.classList.add("triagem-ativa");
});


// Consultório
const btnConcluitTriagem = document.getElementById("concluir-triagem");
const corpoTabelaConsultorio = document.querySelector("#consultorio-tabela tbody");
const txtProximoPaciente = document.getElementById("txt-proximo-paciente");

btnConcluitTriagem.addEventListener("click", () => {
    const senha = document.getElementById("senha-em-triagem").textContent;
    const nomePaciente = document.getElementById("nome-paciente").value.trim();
    const btnGravidadeSelecionado = document.querySelector(".btn-gravidade.selecionado");

    if (nomePaciente === "" || !btnGravidadeSelecionado) return;

    // Pega o atributo data-risco
    const gravidade = btnGravidadeSelecionado.dataset.risco;

    const novaLinhaConsultorio = document.createElement("tr");
    novaLinhaConsultorio.innerHTML = `
        <td>${senha}</td>
        <td>${gravidade}</td>
        <td>${nomePaciente}</td>
    `
    corpoTabelaConsultorio.appendChild(novaLinhaConsultorio);

    // Remove a senha da tabela de triagem
    const linhasTriagem = corpoTabelaTriagem.querySelectorAll("tr");
    linhasTriagem.forEach((linha) => {
        if (linha.cells[0].textContent === senha) {
            linha.remove();
        }
    });

    // Volta para a tela de chamada de triagem
    telaTriagemRealiza.classList.remove("triagem-ativa");
    telaTriagemChamada.classList.add("triagem-ativa");

    atualizarProximaSenha();
    atualizarProximoPaciente();
});


function atualizarProximoPaciente() {
    const linhaSelecionada = corpoTabelaConsultorio.querySelector(".proxima-senha-selecionada");

    if (linhaSelecionada) {
        txtProximoPaciente.textContent = linhaSelecionada.cells[0].textContent;
    } else {
        const primeiraLinha = corpoTabelaConsultorio.querySelector("tr");

        if (primeiraLinha) {
            txtProximoPaciente.textContent = primeiraLinha.cells[0].textContent;
        } else {
            txtProximoPaciente.textContent = "---";
        }
    }
}


// Evento para selecionar linhas na tabela do consultório
corpoTabelaConsultorio.addEventListener("click", (event) => {
    const linhaSelecionada = event.target.closest("tr");

    if (!linhaSelecionada) return;

    if (linhaSelecionada.classList.contains("proxima-senha-selecionada")) {
        linhaSelecionada.classList.remove("proxima-senha-selecionada");
    } else {
        const linhaAnterior = corpoTabelaConsultorio.querySelector(".proxima-senha-selecionada");
        if (linhaAnterior) {
            linhaAnterior.classList.remove("proxima-senha-selecionada");
        }
        linhaSelecionada.classList.add("proxima-senha-selecionada");
    }

    atualizarProximoPaciente();
});


// Finaliza atendimento de um paciente
// Remove da tabela
const finalizarAtendimento = document.getElementById("btn-finalizar-atendimento");
finalizarAtendimento.addEventListener("click", () => {
    const senha = document.getElementById("txt-proximo-paciente").textContent;
    const linhasConsultorio = corpoTabelaConsultorio.querySelectorAll("tr");
    
    linhasConsultorio.forEach((linha) => {
        if (linha.cells[0].textContent === senha) {
            linha.remove();
        }
    });

    atualizarProximoPaciente();
});


atualizarProximoPaciente();