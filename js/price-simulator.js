/**
 * Script per la simulazione del prezzo in base al tipo di cliente e alla regione
 */
console.log('Script simulatore prezzi caricato');

// Funzione per inizializzare il simulatore di prezzi
function initPriceSimulator() {
    console.log('Tentativo di inizializzazione simulatore prezzi');
    
    // Elementi del DOM
    const privateBtn = document.getElementById('btn-private');
    const businessBtn = document.getElementById('btn-business');
    const italyBtn = document.getElementById('btn-it');
    const euBtn = document.getElementById('btn-eu');
    const extraEuBtn = document.getElementById('btn-extra-eu');
    
    const priceValue = document.getElementById('price-value');
    const priceInfo = document.getElementById('price-info');
    const shippingInfo = document.getElementById('shipping-info');
    const priceNote = document.getElementById('price-note');
    
    // Verifica che gli elementi esistano
    if (!privateBtn || !businessBtn || !italyBtn || !euBtn || !extraEuBtn || !priceValue || !priceInfo || !shippingInfo || !priceNote) {
        console.log('Elementi DOM non ancora disponibili, riprovo tra 500ms');
        setTimeout(initPriceSimulator, 500);
        return;
    }
    
    console.log('Elementi DOM trovati per il simulatore prezzi');
    
    // Dati di prezzo
    const prices = {
        private: {
            it: {
                value: '499,59 €',
                info: 'IVA inclusa',
                shipping: 'Trasporto incluso',
                note: 'I prezzi per privati in Italia includono l\'IVA al 22% e le spese di trasporto.'
            },
            eu: {
                value: '584,99 €',
                info: 'IVA inclusa (locale)',
                shipping: 'Trasporto incluso',
                note: 'I prezzi per privati in UE includono l\'IVA locale e le spese di trasporto.'
            },
            extra_eu: {
                value: '529,41 €',
                info: 'Senza IVA, dazi esclusi',
                shipping: 'Trasporto incluso',
                note: 'I prezzi per privati Extra UE non includono IVA e dazi di importazione, ma includono il trasporto.'
            }
        },
        business: {
            it: {
                value: '409,41 €',
                info: 'IVA esclusa',
                shipping: 'Trasporto incluso',
                note: 'I prezzi per aziende in Italia non includono l\'IVA, ma includono le spese di trasporto.'
            },
            eu: {
                value: '479,41 €',
                info: 'IVA esclusa (reverse charge)',
                shipping: 'Trasporto incluso',
                note: 'I prezzi per aziende in UE non includono l\'IVA (reverse charge), ma includono le spese di trasporto.'
            },
            extra_eu: {
                value: '529,41 €',
                info: 'Senza IVA, dazi esclusi',
                shipping: 'Trasporto incluso',
                note: 'I prezzi per aziende Extra UE non includono IVA e dazi di importazione, ma includono il trasporto.'
            }
        }
    };
    
    // Stato corrente
    let currentType = 'private';
    let currentRegion = 'it';
    
    // Funzione per aggiornare il prezzo
    function updatePrice() {
        console.log('Aggiornamento prezzo:', currentType, currentRegion);
        
        const priceData = prices[currentType][currentRegion];
        priceValue.textContent = priceData.value;
        priceInfo.textContent = priceData.info;
        shippingInfo.textContent = priceData.shipping;
        priceNote.textContent = priceData.note;
    }
    
    // Event listeners per i bottoni del tipo cliente
    privateBtn.addEventListener('click', function() {
        console.log('Click su bottone privati');
        currentType = 'private';
        privateBtn.classList.add('active');
        businessBtn.classList.remove('active');
        updatePrice();
    });
    
    businessBtn.addEventListener('click', function() {
        console.log('Click su bottone aziende');
        currentType = 'business';
        businessBtn.classList.add('active');
        privateBtn.classList.remove('active');
        updatePrice();
    });
    
    // Event listeners per i bottoni della regione
    italyBtn.addEventListener('click', function() {
        console.log('Click su bottone Italia');
        currentRegion = 'it';
        italyBtn.classList.add('active');
        euBtn.classList.remove('active');
        extraEuBtn.classList.remove('active');
        updatePrice();
    });
    
    euBtn.addEventListener('click', function() {
        console.log('Click su bottone UE');
        currentRegion = 'eu';
        euBtn.classList.add('active');
        italyBtn.classList.remove('active');
        extraEuBtn.classList.remove('active');
        updatePrice();
    });
    
    extraEuBtn.addEventListener('click', function() {
        console.log('Click su bottone Extra UE');
        currentRegion = 'extra_eu';
        extraEuBtn.classList.add('active');
        italyBtn.classList.remove('active');
        euBtn.classList.remove('active');
        updatePrice();
    });
    
    // Inizializza il prezzo
    updatePrice();
    console.log('Simulatore prezzi inizializzato');
}

// Attendi che il modulo pricing-intelligente sia caricato
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM caricato, controllo presenza modulo pricing');
    
    // Funzione per verificare se il modulo è stato caricato
    function checkModuleLoaded() {
        console.log('Controllo se il modulo pricing è stato caricato');
        if (document.querySelector('#pricing-intelligente')) {
            console.log('Modulo pricing trovato, inizializzo il simulatore');
            initPriceSimulator();
        } else {
            console.log('Modulo pricing non ancora caricato, riprovo tra 500ms');
            setTimeout(checkModuleLoaded, 500);
        }
    }
    
    // Avvia il controllo
    checkModuleLoaded();
});
