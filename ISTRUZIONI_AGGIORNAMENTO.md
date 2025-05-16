# Istruzioni per Aggiornare la Presentazione per Investitori

Questo documento contiene le istruzioni per aggiornare la presentazione per investitori di ShoppingTogether e pubblicarla su GitHub Pages.

## Struttura del Repository

- Il repository è ospitato su: https://github.com/manuzz88/pitch
- La presentazione è pubblicata su GitHub Pages: https://manuzz88.github.io/pitch/
- I file sono organizzati in una struttura pulita senza credenziali sensibili

## Procedura di Aggiornamento

### 1. Clonare il Repository (solo la prima volta)

```bash
git clone https://github.com/manuzz88/pitch.git
cd pitch
```

### 2. Aggiornare i File Localmente

Modifica i file necessari usando il tuo editor preferito. I file principali sono:

- `index.html` - Pagina principale
- `modules/*.html` - Moduli HTML inclusi nella pagina principale
- `css/*.css` - Fogli di stile
- `js/*.js` - Script JavaScript
- `images/` - Directory delle immagini

### 3. Verificare le Modifiche Localmente

Per testare le modifiche prima di pubblicarle:

```bash
# Se hai Python installato
python -m http.server 8000

# Oppure se hai Python 3
python3 -m http.server 8000

# Oppure usa il file avvia_server.py
python avvia_server.py
```

Poi apri il browser all'indirizzo: http://localhost:8000

### 4. Aggiungere, Committare e Pubblicare le Modifiche

```bash
# Aggiungere i file modificati
git add .

# Committare con un messaggio descrittivo
git commit -m "Descrizione delle modifiche apportate"

# Pubblicare su GitHub
git push origin master
```

### 5. Verificare la Pubblicazione

Dopo il push, GitHub Pages aggiornerà automaticamente il sito entro pochi minuti. Verifica le modifiche visitando:
https://manuzz88.github.io/pitch/

## Note Importanti

1. **Mai includere credenziali sensibili** nei file che vengono caricati su GitHub.
2. **Mantenere la struttura del sito** per garantire che tutto funzioni correttamente.
3. **Testare sempre localmente** prima di pubblicare.
4. Se ci sono problemi con il push, puoi forzare l'aggiornamento con:
   ```bash
   git push -f origin master
   ```
   Ma usa questa opzione con cautela, poiché sovrascriverà la storia del repository.

## Contatti

Per assistenza tecnica: manuel.lazzaro@shoppingtogether.com
