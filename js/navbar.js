document.addEventListener('DOMContentLoaded', function() {
    // Gestione del menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Chiudi tutti i dropdown aperti quando si apre il menu mobile
            if (navLinks.classList.contains('active')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // Gestione dei dropdown su mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.dropbtn');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Su desktop, il menu si apre al passaggio del mouse
                if (window.innerWidth > 992) return;
                
                e.preventDefault();
                const isActive = this.parentElement.classList.contains('active');
                
                // Chiudi tutti gli altri dropdown
                dropdowns.forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
                
                // Apri/chiudi il dropdown corrente
                if (!isActive) {
                    dropdown.classList.add('active');
                } else {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
    
    // Chiudi il menu quando si clicca fuori
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
    
    // Evita la chiusura quando si clicca all'interno del menu
    if (navLinks) {
        navLinks.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Evita la chiusura quando si clicca sull'hamburger
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Evita la chiusura quando si clicca su un link del menu
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                // Su mobile, chiudi il menu dopo il click su un link
                if (navLinks) navLinks.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        });
    });
});

// Evidenzia la sezione corrente nella navbar
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
