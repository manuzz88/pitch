document.addEventListener('DOMContentLoaded', function() {
    // Gestione del login
    const loginOverlay = document.getElementById('login-overlay');
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    
    // Password corretta per accedere alla presentazione
    const correctPassword = 'ShoppingTogether2025';
    
    loginBtn.addEventListener('click', function() {
        checkPassword();
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    function checkPassword() {
        const password = passwordInput.value;
        
        if (password === correctPassword) {
            // Password corretta, nascondi l'overlay
            loginOverlay.classList.remove('active');
            // Salva in sessionStorage che l'utente è autenticato
            sessionStorage.setItem('pitchAuthenticated', 'true');
        } else {
            // Password errata, mostra errore
            loginError.textContent = 'Password non corretta. Riprova.';
            loginError.style.display = 'block';
            passwordInput.value = '';
        }
    }
    
    // Controlla se l'utente è già autenticato
    if (sessionStorage.getItem('pitchAuthenticated') === 'true') {
        loginOverlay.classList.remove('active');
    }
    
    // Smooth scroll per i link di navigazione
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animazione per le sezioni al caricamento
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
