// Elementos DOM
const accordion = document.querySelector('.accordion');
const progressBar = document.querySelector('.progress');
const checkboxes = document.querySelectorAll('.practice-check');

// Estado
let progress = JSON.parse(localStorage.getItem('practicesProgress')) || {};

// Funções
function updateProgress() {
    const total = checkboxes.length;
    const checked = Object.values(progress).filter(Boolean).length;
    const percentage = (checked / total) * 100;
    
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', percentage);
}

function saveProgress() {
    localStorage.setItem('practicesProgress', JSON.stringify(progress));
    updateProgress();
}

// Event Listeners
accordion.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;
    
    const content = header.nextElementSibling;
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    
    // Toggle atual
    header.setAttribute('aria-expanded', !isExpanded);
    
    if (isExpanded) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
    }
});

checkboxes.forEach((checkbox, index) => {
    // Restaura estado salvo
    if (progress[index]) {
        checkbox.checked = true;
    }
    
    checkbox.addEventListener('change', () => {
        progress[index] = checkbox.checked;
        saveProgress();
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza barra de progresso
    updateProgress();
    
    // Configura transições suaves
    const items = document.querySelectorAll('.accordion-content');
    items.forEach(item => {
        item.style.maxHeight = null;
    });
});
