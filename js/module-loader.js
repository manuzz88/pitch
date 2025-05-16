/**
 * Gestisce il caricamento dinamico dei moduli per il pitch ShoppingTogether
 */
document.addEventListener('DOMContentLoaded', () => {
    // Elementi del DOM
    const contentContainer = document.getElementById('content-container');
    
    // Lista dei moduli da caricare
    const modules = [
        'header',
        'vision-problema',
        'soluzione',
        'storia-modello',
        'missione-valori-mercato',
        'esempi-reali',
        'differenze',
        'pricing-intelligente',
        'business',
        'traction-team-roadmap',
        'investimento-footer'
    ];
    
    /**
     * Carica un modulo HTML e lo inserisce nel container
     * @param {string} moduleName - Nome del file del modulo senza estensione
     * @returns {Promise} - Promise risolta quando il modulo è stato caricato
     */
    async function loadModule(moduleName) {
        try {
            // Aggiungiamo un timestamp per evitare problemi di cache
            const timestamp = new Date().getTime();
            const response = await fetch(`modules/${moduleName}.html?v=${timestamp}`);
            if (!response.ok) {
                throw new Error(`Errore nel caricamento del modulo ${moduleName}: ${response.status}`);
            }
            
            const moduleContent = await response.text();
            console.log(`Modulo ${moduleName} caricato con successo, lunghezza: ${moduleContent.length} caratteri`);
            return moduleContent;
        } catch (error) {
            console.error(`Errore nel caricamento del modulo ${moduleName}:`, error);
            return `<div class="module-error">Errore nel caricamento del modulo ${moduleName}</div>`;
        }
    }
    
    /**
     * Carica tutti i moduli in sequenza
     */
    async function loadAllModules() {
        let allContent = '';
        
        for (const moduleName of modules) {
            const moduleContent = await loadModule(moduleName);
            allContent += moduleContent;
        }
        
        contentContainer.innerHTML = allContent;
        
        // Inizializza eventuali script dopo il caricamento dei moduli
        initScripts();
    }
    
    /**
     * Inizializza script dopo il caricamento dei moduli
     */
    function initScripts() {
        // Qui puoi aggiungere l'inizializzazione di eventuali script
        // dopo che tutti i moduli sono stati caricati
        
        // Esempio: gestione dello scroll al click sui link del menu
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                // Verifica che targetId non sia solo '#'
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Avvia il caricamento dei moduli
    loadAllModules();
});
