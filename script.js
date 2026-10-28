import { nomes, sortearItem } from "./utils.js";

const caixaInicial = document.querySelector(".caixa-inicial");
const caixaJogo = document.querySelector(".caixa-jogo");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const progresso = document.querySelector(".progresso");
const botaoIniciar = document.querySelector(".botao-iniciar");
const botaoJogarNovamente = document.querySelector(".botao-jogar-novamente");

const perguntas = [
    {
        enunciado: "Assim que saiu da escola, você se depara com uma tecnologia capaz de responder dúvidas e gerar imagens e áudios hiper-realistas. Qual é seu primeiro pensamento?",
        alternativas: [
            {
                texto: "Isso é assustador!",
                afirmacao: [
                    "No início ficou com medo do que essa tecnologia poderia fazer.",
                    "Achou assustador pensar na velocidade com que a tecnologia estava avançando.",
                    "Ficou preocupado com os riscos que a inteligência artificial poderia trazer."
                ]
            },
            {
                texto: "Isso é maravilhoso!",
                afirmacao: [
                    "Quis saber como usar a IA no dia a dia.",
                    "Pensou que a IA poderia ajudar em várias tarefas da vida.",
                    "Ficou curioso para descobrir as possibilidades criativas dessa tecnologia."
                ]
            }
        ]
    },
    {
        enunciado: "Uma professora pede um trabalho sobre o uso da tecnologia em sala de aula. Qual atitude você toma?",
        alternativas: [
            {
                texto: "Usar uma ferramenta de IA para pesquisar e entender melhor o assunto.",
                afirmacao: [
                    "utilizou a inteligência artificial como apoio para pesquisar e compreender o tema.",
                    "aprendeu que a IA pode ajudar a organizar ideias, desde que as informações sejam conferidas.",
                    "combinou as sugestões da IA com suas próprias pesquisas para aprender mais."
                ]
            },
            {
                texto: "Pesquisar por conta própria e escrever com seus conhecimentos.",
                afirmacao: [
                    "valorizou a pesquisa independente e construiu uma opinião com base em diferentes fontes.",
                    "preferiu desenvolver o trabalho com suas próprias palavras e conhecimentos.",
                    "percebeu a importância de comparar fontes e pensar criticamente sobre o que leu."
                ]
            }
        ]
    },
    {
        enunciado: "A turma debate como a IA pode impactar os empregos do futuro. Como você se posiciona?",
        alternativas: [
            {
                texto: "É importante proteger os trabalhadores que podem perder seus empregos.",
                afirmacao: [
                    "defendeu a proteção dos trabalhadores e a preparação da sociedade para as mudanças tecnológicas.",
                    "lembrou que novas tecnologias também exigem oportunidades de formação e requalificação.",
                    "se preocupou com a desigualdade que pode surgir quando a tecnologia substitui algumas funções."
                ]
            },
            {
                texto: "A IA pode criar oportunidades e melhorar as habilidades humanas.",
                afirmacao: [
                    "acreditou que a IA pode abrir novas oportunidades profissionais.",
                    "imaginou profissões novas surgindo junto com os avanços tecnológicos.",
                    "defendeu que as pessoas podem usar a IA para ampliar suas habilidades e criatividade."
                ]
            }
        ]
    },
    {
        enunciado: "Você precisa criar uma imagem no computador para representar sua opinião sobre a IA. O que faz?",
        alternativas: [
            {
                texto: "Criar a imagem usando uma ferramenta tradicional de design.",
                afirmacao: [
                    "escolheu desenvolver sua criatividade utilizando ferramentas tradicionais de design.",
                    "preferiu criar a imagem manualmente para controlar cada detalhe do resultado.",
                    "explorou técnicas de desenho e composição para transmitir sua ideia."
                ]
            },
            {
                texto: "Criar a imagem usando um gerador de imagens de IA.",
                afirmacao: [
                    "experimentou a criação de imagens com inteligência artificial para explorar novas possibilidades.",
                    "descobriu que uma boa descrição pode ajudar a transformar uma ideia em imagem.",
                    "usou a IA como ponto de partida e refletiu sobre a autoria e o uso responsável das imagens."
                ]
            }
        ]
    },
    {
        enunciado: "Seu grupo usa IA para fazer um trabalho, mas o texto foi copiado sem revisão. O que você faz?",
        alternativas: [
            {
                texto: "Revisar o trabalho, verificar as informações e acrescentar ideias próprias.",
                afirmacao: [
                    "defendeu que os conteúdos gerados pela IA devem ser revisados e complementados com ideias próprias.",
                    "conferiu as informações em fontes confiáveis antes de entregar o trabalho.",
                    "mostrou que usar IA com responsabilidade significa participar ativamente do aprendizado."
                ]
            },
            {
                texto: "Entregar o texto inteiro porque a IA já fez o trabalho.",
                afirmacao: [
                    "precisou refletir sobre os limites do uso da IA e a importância de verificar as informações.",
                    "percebeu que confiar totalmente em uma ferramenta pode levar a erros e prejudicar o aprendizado.",
                    "entendeu que a tecnologia pode ajudar, mas não substitui a responsabilidade de quem entrega o trabalho."
                ]
            }
        ]
    }
];

let atual = 0;
let historiaFinal = [];
let nomeAleatorio = "";

function iniciarJogo() {
    atual = 0;
    historiaFinal = [];
    nomeAleatorio = sortearItem(nomes);

    caixaInicial.hidden = true;
    caixaResultado.hidden = true;
    caixaJogo.hidden = false;
    mostraPergunta();
}

// Usa for...of e break para parar a busca quando encontra a pergunta atual.
function jogoTerminou() {
    let perguntaAtualExiste = false;

    for (const pergunta of perguntas) {
        if (pergunta === perguntas[atual]) {
            perguntaAtualExiste = true;
            break;
        }
    }

    return !perguntaAtualExiste;
}

function mostraPergunta() {
    if (jogoTerminou()) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];
    progresso.textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
    caixaPerguntas.textContent = perguntaAtual.enunciado.replace(/\bvocê\b/gi, nomeAleatorio);
    caixaAlternativas.replaceChildren();

    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "alternativa";
        botao.textContent = alternativa.texto;
        botao.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botao);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacao = sortearItem(opcaoSelecionada.afirmacao);
    historiaFinal.push(afirmacao);
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaJogo.hidden = true;
    caixaResultado.hidden = false;

    const introducoes = [
        "Em 2049, NOME ajudou a construir um futuro em que a inteligência artificial era utilizada com responsabilidade.",
        "Em 2049, NOME percebeu que o futuro da inteligência artificial dependia das escolhas de toda a sociedade.",
        "Em 2049, NOME participou de um mundo cada vez mais tecnológico e aprendeu que inovação também exige cuidado."
    ];

    let resultado = sortearItem(introducoes).replace("NOME", nomeAleatorio);
    resultado += `\n\nDurante a missão, ${nomeAleatorio} ${historiaFinal.join(" ")}`;
    textoResultado.textContent = resultado;
}

function jogarNovamente() {
    iniciarJogo();
}

botaoIniciar.addEventListener("click", iniciarJogo);
botaoJogarNovamente.addEventListener("click", jogarNovamente);
