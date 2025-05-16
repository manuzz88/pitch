/**
 * Ottimizzazioni per dispositivi mobili
 * Questo script migliora l'esperienza utente su dispositivi mobili
 */

document.addEventListener('DOMContentLoaded', function() {
    // Forza il rendering a tutta larghezza solo su mobile
    function setFullWidth() {
        // Applica solo su dispositivi mobili (larghezza <= 768px)
        if (window.innerWidth <= 768) {
            document.documentElement.style.width = window.innerWidth + 'px';
            document.body.style.width = window.innerWidth + 'px';
            
            // Forza la larghezza per tutti i contenitori principali
            const containers = document.querySelectorAll('.container, section, #content-container');
            containers.forEach(container => {
                container.style.width = window.innerWidth + 'px';
                container.style.maxWidth = window.innerWidth + 'px';
            });
        } else {
            // Ripristina i valori originali su desktop
            document.documentElement.style.width = '';
            document.body.style.width = '';
            
            const containers = document.querySelectorAll('.container, section, #content-container');
            containers.forEach(container => {
                container.style.width = '';
                container.style.maxWidth = '';
            });
        }
    }
    
    // Esegui subito e ad ogni ridimensionamento
    setFullWidth();
    window.addEventListener('resize', setFullWidth);
    window.addEventListener('orientationchange', setFullWidth);
    // Rileva se il dispositivo è mobile
    const isMobile = window.innerWidth <= 768;
    
    // Aggiungi classe al body per styling specifico
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    // Gestione dello zoom delle immagini su mobile
    const images = document.querySelectorAll('.zoomable-image');
    if (images.length > 0 && isMobile) {
        images.forEach(img => {
            img.addEventListener('click', function() {
                this.classList.toggle('zoomed');
            });
        });
    }
    
    // Migliora lo scrolling delle tabelle su mobile
    const tables = document.querySelectorAll('table');
    if (tables.length > 0 && isMobile) {
        tables.forEach(table => {
            // Aggiungi indicatore di scroll se la tabella è più larga del contenitore
            const wrapper = document.createElement('div');
            wrapper.className = 'table-scroll-wrapper';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
            
            // Controlla se la tabella è più larga del contenitore
            if (table.offsetWidth > wrapper.offsetWidth) {
                wrapper.classList.add('scrollable');
            }
        });
    }
    
    // Migliora l'interazione con i pulsanti su mobile
    const buttons = document.querySelectorAll('button, .btn, a.btn');
    if (buttons.length > 0 && isMobile) {
        buttons.forEach(button => {
            // Aggiungi feedback tattile
            button.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            button.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }
    
    // Gestione dell'orientamento del dispositivo
    window.addEventListener('orientationchange', function() {
        // Aggiungi classe al body in base all'orientamento
        if (window.orientation === 0 || window.orientation === 180) {
            // Orientamento verticale
            document.body.classList.remove('landscape');
            document.body.classList.add('portrait');
        } else {
            // Orientamento orizzontale
            document.body.classList.remove('portrait');
            document.body.classList.add('landscape');
        }
    });
    
    // Trigger iniziale per l'orientamento
    if (window.orientation === 0 || window.orientation === 180) {
        document.body.classList.add('portrait');
    } else {
        document.body.classList.add('landscape');
    }
});
