#!/usr/bin/env python3
"""
Script per avviare un server locale per la presentazione del pitch
e aprire automaticamente il browser con le credenziali già inserite.
"""
import os
import sys
import webbrowser
import http.server
import socketserver
import threading
import time
import socket
from urllib.parse import quote

# Configurazione
PORT = 8082
PITCH_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "web")
PASSWORD = "ShoppingTogether2025"  # La password definita in script.js

def print_colored(text, color):
    """Stampa testo colorato nella console."""
    colors = {
        "red": "\033[91m",
        "green": "\033[92m",
        "yellow": "\033[93m",
        "blue": "\033[94m",
        "magenta": "\033[95m",
        "cyan": "\033[96m",
        "reset": "\033[0m"
    }
    print(f"{colors.get(color, '')}{text}{colors['reset']}")

class PitchHandler(http.server.SimpleHTTPRequestHandler):
    """Handler personalizzato per servire i file del pitch."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PITCH_DIR, **kwargs)
    
    def log_message(self, format, *args):
        """Override per personalizzare i log del server."""
        try:
            if isinstance(args[0], str) and args[0].startswith("GET") and not args[0].endswith("favicon.ico"):
                print_colored(f"[INFO] Richiesta: {args[0]}", "cyan")
        except (IndexError, AttributeError):
            # Gestisce altri tipi di messaggi di log
            pass

def find_free_port(start_port=8080, max_port=8100):
    """Trova una porta libera a partire da start_port."""
    for port in range(start_port, max_port):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('', port))
                return port
            except OSError:
                continue
    return None

def start_server():
    """Avvia il server HTTP."""
    global PORT
    # Trova una porta libera
    free_port = find_free_port(PORT)
    if free_port is None:
        print_colored(f"[ERRORE] Nessuna porta libera trovata tra {PORT} e {PORT+20}", "red")
        sys.exit(1)
    
    PORT = free_port
    with socketserver.TCPServer(("", PORT), PitchHandler) as httpd:
        print_colored(f"[+] Server avviato su http://localhost:{PORT}", "green")
        print_colored(f"[+] Premi Ctrl+C per terminare", "yellow")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print_colored("\n[+] Server terminato dall'utente", "yellow")
            httpd.server_close()

def open_browser_with_credentials():
    """Apre il browser con la pagina di auto-login."""
    # Attendi che il server sia pronto
    time.sleep(1)
    
    # Apri direttamente la pagina di auto-login
    url = f"http://localhost:{PORT}/auto_login.html"
    webbrowser.open(url)
    print_colored(f"[+] Browser aperto con la pagina di auto-login: {url}", "green")

if __name__ == "__main__":
    # Verifica che la directory del pitch esista
    if not os.path.isdir(PITCH_DIR):
        print_colored(f"[ERRORE] La directory {PITCH_DIR} non esiste!", "red")
        sys.exit(1)
    
    # Avvia il server in un thread separato
    server_thread = threading.Thread(target=start_server)
    server_thread.daemon = True
    server_thread.start()
    
    # Apri il browser con le credenziali
    open_browser_with_credentials()
    
    # Mantieni il thread principale in esecuzione
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print_colored("\n[+] Programma terminato dall'utente", "yellow")
        sys.exit(0)
