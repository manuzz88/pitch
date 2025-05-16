/**
 * Script per correggere il problema di overflow della tabella "Cosa ci differenzia"
 */
document.addEventListener('DOMContentLoaded', function() {
    // Funzione per correggere la tabella delle differenze
    function fixDifferenzeTable() {
        const differenzeSection = document.getElementById('differenze');
        if (!differenzeSection) return;
        
        const tableContainer = differenzeSection.querySelector('.comparison-table-container');
        if (!tableContainer) return;
        
        const table = tableContainer.querySelector('.differenze-table');
        if (!table) return;
        
        // Aggiungi classe per identificare che è stato applicato il fix
        tableContainer.classList.add('mobile-fixed');
        
        // Forza la larghezza del contenitore e della tabella su mobile
        if (window.innerWidth <= 768) {
            // Imposta larghezza massima per il contenitore
            tableContainer.style.maxWidth = (window.innerWidth - 20) + 'px';
            tableContainer.style.width = '100%';
            tableContainer.style.overflowX = 'auto';
            tableContainer.style.WebkitOverflowScrolling = 'touch';
            
            // Aggiungi indicatore di scroll se necessario
            if (!tableContainer.querySelector('.scroll-indicator')) {
                const indicator = document.createElement('div');
                indicator.className = 'scroll-indicator';
                indicator.textContent = '← scorri →';
                indicator.style.position = 'absolute';
                indicator.style.bottom = '5px';
                indicator.style.right = '10px';
                indicator.style.backgroundColor = 'rgba(0,0,0,0.7)';
                indicator.style.color = 'white';
                indicator.style.padding = '5px 10px';
                indicator.style.borderRadius = '4px';
                indicator.style.fontSize = '12px';
                indicator.style.zIndex = '100';
                tableContainer.style.position = 'relative';
                tableContainer.appendChild(indicator);
                
                // Nascondi l'indicatore dopo lo scroll
                tableContainer.addEventListener('scroll', function() {
                    indicator.style.opacity = '0.5';
                    setTimeout(function() {
                        indicator.style.opacity = '0';
                    }, 1500);
                });
            }
        }
    }
    
    // Esegui la correzione
    fixDifferenzeTable();
    
    // Riesegui quando cambia l'orientamento o la dimensione della finestra
    window.addEventListener('resize', fixDifferenzeTable);
    window.addEventListener('orientationchange', fixDifferenzeTable);
});
