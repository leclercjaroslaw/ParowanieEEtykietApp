// Konfiguracja (poza komponentem, ale dostępna dla pliku)
const CONFIG = {
    PHP_URL: 'http://192.168.210.219/aplikacja_mobilna.php', 
    API_URL: 'https://192.168.210.219:8888/api'
};

// Rejestracja Service Workera
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log('SW zarejestrowany:', registration.scope);
    }).catch(function(err) {
        console.log('Błąd SW:', err);
    });
}

// Oczekujemy na załadowanie Alpine, aby uniknąć błędów "undefined"
document.addEventListener('alpine:init', () => {
    
    Alpine.data('scannerApp', () => ({
        // Przekazujemy CONFIG do wnętrza komponentu
        CONFIG: CONFIG,
        
        darkMode: false,
        scanMode: 'pairing',
        lastScannedCode: null,
        flashSuccess: false,
        
        // Zmienne do parowania
        scannedProduct: null,
        scannedEtiquette: null,
        pairingStatus: { msg: '', type: '' },
        
        // Dane piekarni
        bakeryProducts: [
            { name: 'Chleb pszenny', ean: '2000000013961' },
            { name: 'Bułka tarta', ean: '5909876543210' },
            { name: 'Rogal maślany', ean: '5905555555555' }
        ],
        selectedBakeryProduct: '',
        
        // Zmienne techniczne
        scanner: null,
        lastProcessedCode: null,
        lastScannedTime: 0,
        installable: false,
        deferredPrompt: null,

        init() {
            // Sprawdzenie motywu
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                this.darkMode = savedTheme === 'dark';
            } else {
                this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            
            this.initializeScanner();

            // PWA Install Prompt
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                this.deferredPrompt = e;
                this.installable = true;
                console.log('PWA gotowe do instalacji');
            });
        },

        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
        },

        triggerFeedback(success = true) {
            if (navigator.vibrate) {
                navigator.vibrate(success ? 200 : [100, 50, 100]);
            }
            if (success) {
                this.flashSuccess = true;
                setTimeout(() => this.flashSuccess = false, 500);
            }
        },

        handleScan(decodedText) {
            const now = Date.now();
            if (this.lastProcessedCode === decodedText && now - this.lastScannedTime < 2500) {
                return;
            }

            this.lastProcessedCode = decodedText;
            this.lastScannedTime = now;
            console.log(`[SCAN] ${decodedText} (${this.scanMode})`);

            if (this.scanMode === 'ean') {
                if (/^\d{8}|\d{13}$/.test(decodedText)) {
                    this.lastScannedCode = decodedText;
                    this.triggerFeedback(true);
                }
            } 
            else if (this.scanMode === 'pairing') {
                if (/^[0-9]+$/.test(decodedText)) {
                    this.scannedProduct = decodedText;
                    this.triggerFeedback(true);
                } else if (/[a-zA-Z]/.test(decodedText)) {
                    this.scannedEtiquette = decodedText;
                    this.triggerFeedback(true);
                }
                
                if (this.scannedProduct && this.scannedEtiquette) {
                    this.pairProductAndEtiquette();
                }
            } 
            else if (this.scanMode === 'bakery') {
                if (/[a-zA-Z]/.test(decodedText)) {
                    this.scannedEtiquette = decodedText;
                    this.triggerFeedback(true);
                }
            }
        },

        initializeScanner() {
            // Uruchomienie skanera z małym opóźnieniem, żeby DOM był gotowy
            this.$nextTick(() => {
                const config = { 
                    fps: 10, 
                    qrbox: { width: 250, height: 250 }, 
                    aspectRatio: 1.0 
                };
                
                // Sprawdzamy czy element istnieje
                if (document.getElementById('reader')) {
                    this.scanner = new Html5QrcodeScanner('reader', config, false);
                    this.scanner.render(this.handleScan.bind(this), (err) => {});
                }
            });
        },

        handleModeChange() {
            this.resetPairing();
            this.lastScannedCode = null;
        },

        resetPairing() {
            this.scannedProduct = null;
            this.scannedEtiquette = null;
            this.selectedBakeryProduct = '';
            this.pairingStatus = { msg: '', type: '' };
        },

        async pairProductAndEtiquette() {
            if (!this.scannedProduct || !this.scannedEtiquette) return;
            await this.pair(this.scannedProduct, this.scannedEtiquette);
            
            if (this.pairingStatus.type === 'status-success') {
                setTimeout(() => this.resetPairing(), 2000);
            }
        },

        async pairBakeryProduct() {
            if (!this.selectedBakeryProduct || !this.scannedEtiquette) return;
            await this.pair(this.selectedBakeryProduct, this.scannedEtiquette);
            
            if (this.pairingStatus.type === 'status-success') {
                 setTimeout(() => {
                     this.scannedEtiquette = null;
                     this.selectedBakeryProduct = '';
                     this.pairingStatus = { msg: '', type: '' };
                 }, 2000);
            }
        },

        async pair(productCode, etiquetteCode) {
            this.pairingStatus = { msg: 'Przetwarzanie...', type: '' };
            
            try {
                const formData = new FormData();
                formData.append('plu_kod', productCode);
                formData.append('api_mode', 'true');
                formData.append('nr_etykiety_elektronicznej', etiquetteCode);

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                const response = await fetch(CONFIG.API_URL, {
                    method: 'POST',
                    body: formData,
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (response.ok) {
                    this.pairingStatus = { msg: 'OK! Sparowano.', type: 'status-success' };
                    this.triggerFeedback(true);
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.error('API Error:', error);
                this.pairingStatus = { msg: 'Błąd połączenia.', type: 'status-error' };
                if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
            }
        },

        handleInstallClick() {
            this.installable = false;
            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                this.deferredPrompt.userChoice.then((choiceResult) => {
                    console.log('Decyzja użytkownika:', choiceResult.outcome);
                    this.deferredPrompt = null;
                });
            }
        }
    }));
});