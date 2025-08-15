// Dados do fluxo
const flowSteps = {
    descoberta: {
        deliverables: [
            "Documento de visão do projeto",
            "Análise de mercado",
            "Personas iniciais"
        ],
        risks: [
            "Entendimento superficial do problema",
            "Subestimação da complexidade"
        ]
    },
    requisitos: {
        deliverables: [
            "Backlog do produto",
            "Histórias de usuário",
            "Critérios de aceitação"
        ],
        risks: [
            "Requisitos ambíguos",
            "Escopo mal definido"
        ]
    },
    prototipo: {
        deliverables: [
            "Wireframes",
            "Fluxos de usuário",
            "Protótipo interativo"
        ],
        risks: [
            "Foco excessivo em detalhes",
            "Falta de feedback dos usuários"
        ]
    },
    design: {
        deliverables: [
            "Style guide",
            "Design system",
            "Layouts responsivos"
        ],
        risks: [
            "Inconsistência visual",
            "Problemas de acessibilidade"
        ]
    },
    implementacao: {
        deliverables: [
            "Código fonte",
            "Documentação técnica",
            "Testes unitários"
        ],
        risks: [
            "Débito técnico",
            "Problemas de performance"
        ]
    },
    testes: {
        deliverables: [
            "Plano de testes",
            "Relatórios de bugs",
            "Testes de integração"
        ],
        risks: [
            "Cobertura insuficiente",
            "Testes não representativos"
        ]
    },
    deploy: {
        deliverables: [
            "Pipeline CI/CD",
            "Ambientes configurados",
            "Scripts de deploy"
        ],
        risks: [
            "Problemas de configuração",
            "Dependências faltantes"
        ]
    },
    publicacao: {
        deliverables: [
            "Checklist de lançamento",
            "Material de divulgação",
            "Documentação do usuário"
        ],
        risks: [
            "Problemas de escalabilidade",
            "Falhas de segurança"
        ]
    },
    monitoramento: {
        deliverables: [
            "Dashboards de métricas",
            "Relatórios de performance",
            "Feedback dos usuários"
        ],
        risks: [
            "Falta de manutenção",
            "Problemas não detectados"
        ]
    }
};

// Elementos DOM
const timeline = document.querySelector('.timeline');
const tooltip = document.querySelector('.tooltip');

// Estado
let activeStep = null;

// Funções
function showTooltip(step, element) {
    const data = flowSteps[step];
    const tooltipTitle = tooltip.querySelector('h4');
    const deliverablesList = tooltip.querySelector('.deliverables ul');
    const risksList = tooltip.querySelector('.risks ul');
    
    tooltipTitle.textContent = element.querySelector('h3').textContent;
    
    deliverablesList.innerHTML = data.deliverables
        .map(item => `<li>${item}</li>`)
        .join('');
        
    risksList.innerHTML = data.risks
        .map(item => `<li>${item}</li>`)
        .join('');
    
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.top = `${rect.top + window.scrollY - tooltipRect.height - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
    
    tooltip.classList.add('active');
}

function hideTooltip() {
    tooltip.classList.remove('active');
}

// Event Listeners
timeline.addEventListener('click', (e) => {
    const item = e.target.closest('.timeline-item');
    if (!item) return;
    
    const step = item.dataset.step;
    
    if (activeStep === step) {
        hideTooltip();
        activeStep = null;
        item.classList.remove('active');
    } else {
        if (activeStep) {
            document.querySelector(`[data-step="${activeStep}"]`)
                .classList.remove('active');
        }
        
        showTooltip(step, item);
        activeStep = step;
        item.classList.add('active');
    }
});

// Fecha tooltip ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.timeline-item') && !e.target.closest('.tooltip')) {
        hideTooltip();
        if (activeStep) {
            document.querySelector(`[data-step="${activeStep}"]`)
                .classList.remove('active');
            activeStep = null;
        }
    }
});
