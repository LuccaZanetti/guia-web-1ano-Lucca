// Dados das tecnologias
const technologies = [
    {
        name: "React",
        category: "frontend",
        description: "Biblioteca JavaScript para construção de interfaces de usuário",
        pros: ["Componentização", "Grande ecossistema"],
        cons: ["Curva de aprendizado", "Bundle size"],
        whenToAvoid: "Projetos pequenos e simples onde vanilla JS seria suficiente",
        officialLink: "https://reactjs.org",
        level: "intermediário"
    },
    {
        name: "Node.js",
        category: "backend",
        description: "Ambiente de execução JavaScript server-side",
        pros: ["Performance assíncrona", "NPM (gerenciador de pacotes)"],
        cons: ["CPU-intensive tasks", "Callback hell (se mal estruturado)"],
        whenToAvoid: "Aplicações com processamento pesado de CPU",
        officialLink: "https://nodejs.org",
        level: "intermediário"
    },
    {
        name: "PostgreSQL",
        category: "database",
        description: "Sistema de gerenciamento de banco de dados relacional",
        pros: ["Robusto e confiável", "Extensível"],
        cons: ["Configuração inicial", "Consumo de recursos"],
        whenToAvoid: "Aplicações que precisam apenas de armazenamento chave-valor simples",
        officialLink: "https://www.postgresql.org",
        level: "avançado"
    },
    {
        name: "Docker",
        category: "devops",
        description: "Plataforma de containerização de aplicações",
        pros: ["Isolamento de ambiente", "Facilidade de deploy"],
        cons: ["Overhead de recursos", "Complexidade inicial"],
        whenToAvoid: "Aplicações muito pequenas ou monolíticas simples",
        officialLink: "https://www.docker.com",
        level: "intermediário"
    },
    {
        name: "Jest",
        category: "testing",
        description: "Framework de testes em JavaScript",
        pros: ["Fácil de configurar", "Snapshots testing"],
        cons: ["Performance em grandes suites", "Mocks complexos"],
        whenToAvoid: "Quando precisa de testes E2E complexos",
        officialLink: "https://jestjs.io",
        level: "básico"
    }
    // Adicione mais tecnologias conforme necessário
];

// Estado da aplicação
let currentFilter = localStorage.getItem('techFilter') || 'all';
let searchTerm = '';

// Elementos DOM
const techGrid = document.querySelector('.tech-grid .container');
const searchInput = document.getElementById('tech-search');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('tech-modal');

// Funções
function createTechCard(tech) {
    const card = document.createElement('div');
    card.className = 'tech-card';
    card.setAttribute('data-category', tech.category);
    
    const levelClass = `level-${tech.level.toLowerCase()}`;
    
    card.innerHTML = `
        <h3>${tech.name}</h3>
        <span class="badge ${levelClass}">${tech.level}</span>
        <p class="category">${tech.category}</p>
        <p>${tech.description}</p>
        <div class="pros-cons">
            <div class="pros">
                <h4>Prós:</h4>
                <ul>
                    ${tech.pros.map(pro => `<li>${pro}</li>`).join('')}
                </ul>
            </div>
            <div class="cons">
                <h4>Contras:</h4>
                <ul>
                    ${tech.cons.map(con => `<li>${con}</li>`).join('')}
                </ul>
            </div>
        </div>
        <a href="${tech.officialLink}" target="_blank" rel="noopener noreferrer">Documentação oficial</a>
        <button class="btn-more" aria-label="Mais informações sobre ${tech.name}">
            Quando usar?
        </button>
    `;
    
    // Adiciona evento para abrir modal
    card.querySelector('.btn-more').addEventListener('click', () => showModal(tech));
    
    return card;
}

function showModal(tech) {
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <h2>Quando escolher ${tech.name}?</h2>
        <p><strong>Casos ideais:</strong></p>
        <ul>
            ${tech.pros.map(pro => `<li>Quando precisar de ${pro}</li>`).join('')}
        </ul>
        <p><strong>Quando evitar:</strong></p>
        <p>${tech.whenToAvoid}</p>
    `;
    
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('active');
}

function filterTechnologies() {
    const filtered = technologies.filter(tech => {
        const matchesCategory = currentFilter === 'all' || tech.category === currentFilter;
        const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tech.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    techGrid.innerHTML = '';
    filtered.forEach(tech => {
        techGrid.appendChild(createTechCard(tech));
    });
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    filterTechnologies();
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        localStorage.setItem('techFilter', currentFilter);
        filterTechnologies();
    });
});

modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('active');
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Aplica filtro salvo
    const savedFilter = localStorage.getItem('techFilter');
    if (savedFilter) {
        const btn = document.querySelector(`[data-category="${savedFilter}"]`);
        if (btn) {
            btn.click();
        }
    }
    
    // Renderiza cards iniciais
    filterTechnologies();
});
