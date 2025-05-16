/**
 * Gestisce la cache dei file CSS e JS per evitare problemi di visualizzazione
 */
document.addEventListener('DOMContentLoaded', () => {
    // Aggiungiamo un timestamp a tutti i link CSS per evitare la cache
    const timestamp = new Date().getTime();
    
    // Aggiorniamo i link CSS esistenti
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    cssLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Aggiorniamo solo i link interni, non quelli esterni (CDN)
        if (href && !href.includes('//')) {
            // Se il link ha già un parametro di versione, lo sostituiamo
            if (href.includes('?v=')) {
                link.setAttribute('href', href.replace(/\?v=[\d\.]+/, `?v=${timestamp}`));
            } else {
                // Altrimenti aggiungiamo il parametro
                link.setAttribute('href', `${href}?v=${timestamp}`);
            }
        }
    });
    
    console.log('Cache manager: CSS links aggiornati con timestamp per evitare problemi di cache');
});
