// Dados do quiz
const questions = [
    {
        question: "Qual elemento HTML5 é usado para definir a navegação principal do site?",
        options: [
            "header",
            "nav",
            "main",
            "menu"
        ],
        correct: 1,
        explanation: "O elemento <nav> é específico para definir a navegação principal do site, embora possa haver múltiplos elementos nav em uma página."
    },
    {
        question: "Qual propriedade CSS é usada para criar um grid container?",
        options: [
            "display: grid-container",
            "display: grid",
            "grid: true",
            "grid-display: on"
        ],
        correct: 1,
        explanation: "display: grid estabelece um novo contexto de grid, permitindo o uso de propriedades específicas de grid nos elementos filhos."
    },
    {
        question: "Como selecionar um elemento pelo ID em JavaScript?",
        options: [
            "document.querySelector('#id')",
            "document.getElementByName('id')",
            "document.select('#id')",
            "document.find('id')"
        ],
        correct: 0,
        explanation: "document.querySelector('#id') é um método moderno que usa seletores CSS para encontrar elementos. Para IDs, também podemos usar document.getElementById('id')."
    },
    {
        question: "Qual método é usado para adicionar um evento em JavaScript moderno?",
        options: [
            "element.onEvent()",
            "element.addEvent()",
            "element.addEventListener()",
            "element.attachEvent()"
        ],
        correct: 2,
        explanation: "addEventListener() é o método padrão para manipulação de eventos em JavaScript moderno, oferecendo mais flexibilidade e possibilidade de múltiplos listeners."
    },
    {
        question: "O que significa CSS em Cascading Style Sheets?",
        options: [
            "Creative Style System",
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2,
        explanation: "CSS significa Cascading Style Sheets (Folhas de Estilo em Cascata), referindo-se à forma como os estilos são aplicados em cascata com base em especificidade e ordem."
    },
    {
        question: "Qual é a maneira correta de declarar uma variável em JavaScript moderno?",
        options: [
            "var x = 5",
            "let x = 5",
            "const x = 5",
            "both let and const"
        ],
        correct: 3,
        explanation: "Em JavaScript moderno, usamos let para variáveis que podem mudar e const para valores constantes. var é considerado legado e deve ser evitado."
    },
    {
        question: "Qual propriedade CSS é usada para tornar um elemento flexível?",
        options: [
            "flexible: true",
            "display: flex",
            "display: flexible",
            "flex: true"
        ],
        correct: 1,
        explanation: "display: flex cria um flex container, permitindo o uso de propriedades flexbox nos elementos filhos para layouts flexíveis."
    },
    {
        question: "O que significa API?",
        options: [
            "Application Programming Interface",
            "Advanced Programming Interface",
            "Automated Programming Intelligence",
            "Application Process Integration"
        ],
        correct: 0,
        explanation: "API significa Application Programming Interface (Interface de Programação de Aplicações), um conjunto de definições e protocolos para integração entre sistemas."
    }
];

// Estado
let currentQuestion = 0;
let score = 0;
let highScore = parseInt(localStorage.getItem('quizHighScore')) || 0;
let selectedAnswer = null;

// Elementos DOM
const introSection = document.querySelector('.quiz-intro');
const questionsSection = document.querySelector('.quiz-questions');
const resultsSection = document.querySelector('.quiz-results');
const questionElement = document.querySelector('.question');
const nextButton = document.querySelector('.next-question');
const currentQuestionSpan = document.querySelector('.current');
const totalQuestionsSpan = document.querySelector('.total');
const highScoreSpan = document.querySelector('.high-score span');

// Funções
function showSection(section) {
    [introSection, questionsSection, resultsSection].forEach(s => {
        s.setAttribute('aria-hidden', s !== section);
        s.style.display = s === section ? 'block' : 'none';
    });
}

function displayQuestion() {
    const question = questions[currentQuestion];
    
    questionElement.innerHTML = `
        <h3>${question.question}</h3>
        <div class="options">
            ${question.options.map((option, index) => `
                <button class="option" data-index="${index}">
                    ${option}
                </button>
            `).join('')}
        </div>
    `;
    
    currentQuestionSpan.textContent = currentQuestion + 1;
    totalQuestionsSpan.textContent = questions.length;
    nextButton.disabled = true;
    selectedAnswer = null;
    
    // Adiciona eventos aos botões de opção
    document.querySelectorAll('.option').forEach(button => {
        button.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedIndex = parseInt(selectedButton.dataset.index);
    
    // Remove seleção anterior
    document.querySelectorAll('.option').forEach(button => {
        button.classList.remove('selected', 'correct', 'incorrect');
    });
    
    selectedButton.classList.add('selected');
    selectedAnswer = selectedIndex;
    
    // Mostra feedback imediato
    const correct = questions[currentQuestion].correct === selectedIndex;
    selectedButton.classList.add(correct ? 'correct' : 'incorrect');
    
    if (correct) {
        score++;
    }
    
    nextButton.disabled = false;
}

function showResults() {
    const resultsScore = document.querySelector('.quiz-results .score span');
    const explanations = document.querySelector('.explanations');
    
    resultsScore.textContent = score;
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('quizHighScore', highScore);
        highScoreSpan.textContent = highScore;
    }
    
    explanations.innerHTML = questions.map((q, i) => `
        <div class="explanation">
            <h4>Questão ${i + 1}</h4>
            <p>${q.explanation}</p>
        </div>
    `).join('');
    
    showSection(resultsSection);
}

// Event Listeners
document.querySelector('.start-quiz').addEventListener('click', () => {
    showSection(questionsSection);
    displayQuestion();
});

nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
});

document.querySelector('.restart-quiz').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    showSection(questionsSection);
    displayQuestion();
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    highScoreSpan.textContent = highScore;
    showSection(introSection);
});
