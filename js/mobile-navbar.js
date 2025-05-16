/**
 * Ottimizzazioni per la navbar su dispositivi mobili
 */

document.addEventListener('DOMContentLoaded', function() {
    // Crea l'hamburger menu se non esiste
    if (!document.querySelector('.hamburger')) {
        const nav = document.querySelector('nav');
        if (nav) {
            // Crea il pulsante hamburger
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.setAttribute('aria-label', 'Menu');
            
            // Aggiungi le linee dell'hamburger
            for (let i = 0; i < 3; i++) {
                const span = document.createElement('span');
                hamburger.appendChild(span);
            }
            
            // Aggiungi l'hamburger alla navbar
            nav.appendChild(hamburger);
            
            // Crea l'overlay scuro per il menu mobile
            const overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
            
            // Gestione del click sull'hamburger
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                const navLinks = document.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.classList.toggle('active');
                    overlay.classList.toggle('active');
                    
                    // Blocca lo scroll del body quando il menu è aperto
                    if (navLinks.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
            
            // Chiudi il menu quando si clicca sull'overlay
            overlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                const navLinks = document.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.classList.remove('active');
                    this.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Chiudi il menu quando si clicca su un link
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    // Non chiudere se è un dropdown
                    if (!this.classList.contains('dropbtn')) {
                        hamburger.classList.remove('active');
                        const navLinksContainer = document.querySelector('.nav-links');
                        if (navLinksContainer) {
                            navLinksContainer.classList.remove('active');
                            overlay.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    }
                });
            });
            
            // Gestione dei dropdown su mobile
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                const dropbtn = dropdown.querySelector('.dropbtn');
                if (dropbtn) {
                    dropbtn.addEventListener('click', function(e) {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            dropdown.classList.toggle('active');
                        }
                    });
                }
            });
        }
    }
});
