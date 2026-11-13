const painelTxtSenha = document.getElementById("painel-txt-senha");
const painelTxtLocal = document.getElementById("painel-txt-local");
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

    // --- INTEGRAÇÃO COM O PAINEL DE CHAMADA DA DIREITA ---
    const painelTxtSenha = document.getElementById("painel-txt-senha"); // ID do visor grande de senha
    const painelTxtLocal = document.getElementById("painel-txt-local"); // ID do visor grande de local
    const selectConsultorio = document.getElementById("consultorios-select"); // Ajuste se o ID do select do consultório for diferente

    // 1. Salva a senha anterior no histórico antes de substituir (se houver histórico)
    if (painelTxtSenha && painelTxtSenha.textContent !== "---" && typeof historicoSenhas !== 'undefined') {
        const senhaAntiga = painelTxtSenha.textContent;
        const localAntigo = painelTxtLocal ? painelTxtLocal.textContent : "Consultório";
       
        historicoSenhas.unshift(`${senhaAntiga} (${localAntigo})`);
        if (historicoSenhas.length > 4) {
            historicoSenhas.pop();
        }
        if (typeof atualizarHistoricoVisual === 'function') {
            atualizarHistoricoVisual();
        }
    }

    // 2. Atualiza o painel grande da direita com a senha do paciente e o consultório escolhido
    if (painelTxtSenha) painelTxtSenha.textContent = senha;
    if (painelTxtLocal) {
        const nomeConsultorio = selectConsultorio ? selectConsultorio.value : "Consultório 01";
        painelTxtLocal.textContent = "Consultório " + nomeConsultorio;
    }
    // ----------------------------------------------------

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

// Evento para o botão "Chamar Senha" da Triagem atualizar o painel da direita e o histórico
const btnChamarSenha = document.getElementById("btn-chamar-senha");
const listaHistorico = document.getElementById("lista-historico");
let historicoSenhas = [];

if (btnChamarSenha) {
    btnChamarSenha.addEventListener("click", () => {
        if (txtProximaSenha.textContent === "---") return;

        const senhaAtualTexto = painelTxtSenha.textContent;
        const localAtualTexto = painelTxtLocal.textContent;

        if (senhaAtualTexto !== "---") {
            historicoSenhas.unshift(`${senhaAtualTexto} (${localAtualTexto})`);
            if (historicoSenhas.length > 4) {
                historicoSenhas.pop();
            }
        }

        const senhaChamada = txtProximaSenha.textContent;
        const guichEscolhido = "Guichê " + document.getElementById("selecao-guiche").value;

        painelTxtSenha.textContent = senhaChamada;
        painelTxtLocal.textContent = guichEscolhido;

        atualizarHistoricoVisual();

        // Aciona a voz natural do Google na triagem
        falarChamadaNatural(`Senha ${senhaChamada}, ${guichEscolhido}.`);
    });
}

function atualizarHistoricoVisual() {
    listaHistorico.innerHTML = "";

    if (historicoSenhas.length === 0) {
        listaHistorico.innerHTML = '<span class="historico-vazio">Nenhuma senha anterior</span>';
        return;
    }

    historicoSenhas.forEach((item) => {
        const span = document.createElement("span");
        span.classList.add("item-historico");
        span.textContent = item;
        listaHistorico.appendChild(span);
    });
}

// --- Playlist Contínua de Vídeos ---
const videosPlaylist = [
    "assets/videos/0_Doctor_Father_1280x720.mp4",
    "assets/videos/49808-458438856_medium.mp4",
    "assets/videos/144001-784164306_medium.mp4",
    "assets/videos/6254818_Person_People_1280x720.mp4",
    "assets/videos/49816-458438881_medium.mp4"
];

let indiceVideoAtual = 0;
const elementoVideo = document.getElementById("video-painel");

function iniciarPlaylist() {
    if (!elementoVideo || videosPlaylist.length === 0) return;

    // Define o arquivo
    elementoVideo.src = videosPlaylist[indiceVideoAtual];
    elementoVideo.load();
   
    // Força a reprodução e trata caso o navegador bloqueie
    const playPromise = elementoVideo.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay impedido, aguardando clique na página.");
        });
    }

    // Avança para o próximo quando o vídeo acabar
    elementoVideo.onended = () => {
        indiceVideoAtual++;
        if (indiceVideoAtual >= videosPlaylist.length) {
            indiceVideoAtual = 0;
        }
        elementoVideo.src = videosPlaylist[indiceVideoAtual];
        elementoVideo.load();
        elementoVideo.play();
    };
}

// Inicia assim que a página carregar
window.addEventListener("DOMContentLoaded", () => {
    iniciarPlaylist();
});

// --- Lógica do Botão de Chamar Paciente no Consultório ---
const btnChamarPacienteConsultorio = document.getElementById("btn-chamar-paciente-consultorio");
const selecaoConsultorio = document.getElementById("selecao-consultorio");

if (btnChamarPacienteConsultorio) {
    btnChamarPacienteConsultorio.addEventListener("click", () => {
        // Pega a tabela de consultórios para ver quem é o próximo paciente
        const corpoTabelaConsultorio = document.querySelector("#consultorio-tabela tbody");
        const primeiraLinha = corpoTabelaConsultorio.querySelector("tr");

        if (!primeiraLinha) return; // Se não tiver ninguém na tabela, não faz nada

        // Extrai os dados da primeira linha da tabela do consultório
        const senhaParaChamar = primeiraLinha.cells[0].textContent; // Coluna da Senha
        const nomePaciente = primeiraLinha.cells[2].textContent;    // Coluna do Nome

        const numeroConsultorio = selecaoConsultorio ? selecaoConsultorio.value : "1";
        const localFormatado = `Consultório ${numeroConsultorio}`;

        const painelTxtSenha = document.getElementById("painel-txt-senha");
        const painelTxtLocal = document.getElementById("painel-txt-local");

        // 1. Move a chamada anterior para o histórico antes de substituir
        if (painelTxtSenha && painelTxtSenha.textContent !== "---" && typeof historicoSenhas !== 'undefined') {
            const senhaAntiga = painelTxtSenha.textContent;
            const localAntigo = painelTxtLocal ? painelTxtLocal.textContent : "Local";
           
            historicoSenhas.unshift(`${senhaAntiga} (${localAntigo})`);
            if (historicoSenhas.length > 4) {
                historicoSenhas.pop();
            }
            if (typeof atualizarHistoricoVisual === 'function') {
                atualizarHistoricoVisual();
            }
        }

        // 2. Atualiza o painel principal mostrando a Senha e o Nome do Paciente junto
        if (painelTxtSenha) {
            painelTxtSenha.textContent = `${senhaParaChamar}\n${nomePaciente}`;
        }
        if (painelTxtLocal) {
            painelTxtLocal.textContent = localFormatado;
        }

        // Aciona a voz natural do Google no consultório anunciando de forma fluida
        falarChamadaNatural(`Senha ${senhaParaChamar}, paciente ${nomePaciente}, para o ${localFormatado}.`);
    });
}

// --- Função de Voz com Áudio Natural do Google ---
function falarChamadaNatural(textoParaFalar) {
    const textoCodificado = encodeURIComponent(textoParaFalar);
    const urlAudio = `https://translate.google.com/translate_tts?ie=UTF-8&q=${textoCodificado}&tl=pt-BR&client=tw-ob`;

    const audio = new Audio(urlAudio);
    audio.volume = 1.0;
    audio.play().catch(error => {
        console.log("Erro ao reproduzir áudio do Google:", error);
    });
}