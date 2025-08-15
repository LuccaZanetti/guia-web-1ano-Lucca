// Tema Claro/Escuro
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Verifica preferência do sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Recupera tema salvo ou usa preferência do sistema
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Aplica tema inicial
    document.body.setAttribute('data-theme', currentTheme);
    
    // Toggle do tema
    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.getAttribute('data-theme') === 'light' 
                        ? 'dark' 
                        : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    // Atalho "/" para focar na busca (se existir)
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const searchInput = document.querySelector('[type="search"]');
        if (searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
    
    // Atalho "Alt+M" para focar no menu
    if (e.key === 'm' && e.altKey) {
        e.preventDefault();
        const firstMenuItem = document.querySelector('header nav a');
        if (firstMenuItem) {
            firstMenuItem.focus();
        }
    }
    
    // Atalho "Home" para rolar para o topo
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Animações suaves
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observa elementos com fade-in
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// Respeita preferência de redução de movimento
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.card').forEach(card => {
        card.style.transition = 'none';
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
}
