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
    { name: '7 days', ean: '2200018000000' },
    { name: 'Ambasador', ean: '2917886000000' },
    { name: 'AMONIACZKI', ean: '0000000001237' },
    { name: 'Babeczka mini', ean: '0000000003018' },
    { name: 'Babeczka owocowa duża', ean: '0000000001356' },
    { name: 'Babeczka z kremem', ean: '0000000000492' },
    { name: 'Babeczka z pianką', ean: '0000000003012' },
    { name: 'BABKA Z METRA', ean: '2918713000000' },
    { name: 'Bagietka', ean: '0000000001182' },
    { name: 'Bagietka czosnkowa', ean: '0000000002314' },
    { name: 'Bagietka pomidorowo-paprykowa', ean: '0000000003044' },
    { name: 'Bagietka zapiekankowa', ean: '0000000000534' },
    { name: 'Bajaderka', ean: '0000000000627' },
    { name: 'BAJGIEL CIEMNY', ean: '0000000009196' },
    { name: 'BAJGIEL Z MAKIEM/KMINKIEM', ean: '0000000001989' },
    { name: 'Bananowiec', ean: '2912272000000' },
    { name: 'BATON Z NASIONAMI', ean: '0000000003111' },
    { name: 'Beziki', ean: '0000000003106' },
    { name: 'Blat bezowy', ean: '2912335000000' },
    { name: 'Brownie wegańskie', ean: '0000000001287' },
    { name: 'BUŁKA CIABATTA', ean: '0000000009195' },
    { name: 'Bułka cięta mini 60g', ean: '2400466000000' },
    { name: 'Bułka cięta ziarnista', ean: '0000000001165' },
    { name: 'Bułka czwórka z kruszonką', ean: '0000000001286' },
    { name: 'Bułka dyniowa', ean: '0000000001162' },
    { name: 'Bułka grahamka', ean: '0000000001161' },
    { name: 'BUŁKA HAMBURGEROWA', ean: '0000000001199' },
    { name: 'BUŁKA HAMBURGEROWA 2SZT', ean: '0000000001198' },
    { name: 'BUŁKA HAMBURGEROWA PIWNA', ean: '0000000001999' },
    { name: 'BUŁKA JAGLANA Z ZIARNAMI', ean: '0000000001166' },
    { name: 'Bułka kukurydziana', ean: '0000000001163' },
    { name: 'Bułka Oregano z cebulą', ean: '0000000001174' },
    { name: 'BUŁKA ORKISZOWA', ean: '0000000001991' },
    { name: 'Bułka Paprykowa', ean: '0000000000837' },
    { name: 'Bułka serowo-cebulowa', ean: '0000000003040' },
    { name: 'BUŁKA SKANDYNAWII', ean: '0000000003057' },
    { name: 'Bułka sztangielka', ean: '0000000001183' },
    { name: 'BUŁKA TARTA 500G', ean: '5905034814126' },
    { name: 'Bułka tarta KG', ean: '0000000001260' },
    { name: 'Bułka węgierka', ean: '0000000001264' },
    { name: 'Bułka wodna', ean: '0000000001170' },
    { name: 'Bułka z kruszonką', ean: '0000000003041' },
    { name: 'Bułka żytnia bez drożdży', ean: '0000000000888' },
    { name: 'Bułki do wypieku 300g', ean: '0000000000014' },
    { name: 'Cake Pops', ean: '0000000000775' },
    { name: 'CAPPUCCINO', ean: '2991238000000' },
    { name: 'Chałka', ean: '0000000001276' },
    { name: 'CHAŁKA MAKOWA', ean: '0000000001379' },
    { name: 'CHAŁKA SEROWA', ean: '0000000001279' },
    { name: 'CHLEB BAMBO IG', ean: '0000000001445' },
    { name: 'Chleb cebulowy 500g', ean: '0000000001348' },
    { name: 'Chleb dekoracyjny 900g', ean: '0000000001329' },
    { name: 'Chleb domowy 900g', ean: '0000000001061' },
    { name: 'Chleb dyniowy 500g', ean: '0000000001133' },
    { name: 'Chleb foremka 500g', ean: '0000000001118' },
    { name: 'Chleb graham 500g', ean: '0000000001111' },
    { name: 'CHLEB IG 300G', ean: '0000000001349' },
    { name: 'CHLEB KETO', ean: '2200365000000' },
    { name: 'Chleb mieszany 500g', ean: '0000000001058' },
    { name: 'Chleb mieszany 900g', ean: '0000000001127' },
    { name: 'Chleb mieszny kłos 500g', ean: '0000000000762' },
    { name: 'Chleb mini 350g', ean: '0000000001119' },
    { name: 'Chleb na liściu kapusty', ean: '0000000000852' },
    { name: 'Chleb orkiszowy 450g', ean: '0000000001135' },
    { name: 'CHLEB OWSIANY', ean: '2200220000000' },
    { name: 'CHLEB OWSIANY Z ŻURAWINĄ', ean: '2200255000000' },
    { name: 'Chleb pasterski 500g', ean: '0000000001757' },
    { name: 'Chleb pełny kłos 500g', ean: '0000000001134' },
    { name: 'CHLEB PRADZIAD 500G', ean: '0000000001347' },
    { name: 'CHLEB PRO BODY 400G', ean: '0000000000214' },
    { name: 'CHLEB PSZENNY JAGLANY', ean: '0000000001167' },
    { name: 'Chleb razowy 400g', ean: '0000000000169' },
    { name: 'Chleb skandynawski 450g', ean: '0000000001220' },
    { name: 'Chleb słowiański', ean: '2200033000000' },
    { name: 'Chleb sprint 450g', ean: '0000000003036' },
    { name: 'Chleb staropolski 600g', ean: '0000000001059' },
    { name: 'Chleb śląski 900g', ean: '0000000001126' },
    { name: 'Chleb śląski mini 500g', ean: '0000000001129' },
    { name: 'CHLEB TOSTOWY 450G', ean: '0000000002263' },
    { name: 'CHLEB TOSTOWY GRAHAM 450G', ean: '0000000001069' },
    { name: 'Chleb tygrysi kukurydziany 450g', ean: '0000000001528' },
    { name: 'CHLEB VITALEGO 850G', ean: '0000000001762' },
    { name: 'Chleb wiejski bez drożdzy 800g', ean: '0000000001130' },
    { name: 'Chleb wiejski maślankowy 450g', ean: '0000000001109' },
    { name: 'Chleb wiejski na naturalnym zak', ean: '0000000001144' },
    { name: 'Chleb z czarnuszką', ean: '0000000001504' },
    { name: 'Chleb Zytni Razowy z slonecznik', ean: '0000000002724' },
    { name: 'Chleb żytni bez drożdży', ean: '0000000000881' },
    { name: 'Chleb żytni bez drożdży chia', ean: '0000000000884' },
    { name: 'CHLEB ŻYTNI IG 300G', ean: '0000000001449' },
    { name: 'Chleb żytni z żurawiną i orzech', ean: '0000000003001' },
    { name: 'CHLEBEK BANANOWY WEGE', ean: '2200543000000' },
    { name: 'CHLEBEK GRILOWY Z CZOSNKIEM', ean: '0000000001054' },
    { name: 'Ciastka kruche z kokosem 300g', ean: '0000000000069' },
    { name: 'Ciastka oreo 300g', ean: '0000000000653' },
    { name: 'CIASTKA OWSIANE Z ZIARNAMI', ean: '0000000004321' },
    { name: 'CIASTKA PIERNICZKI 300g', ean: '0000000001232' },
    { name: 'Ciastka rozetki z nadzieniem ja', ean: '0000000003103' },
    { name: 'Ciastka rozetki z nadzieniem po', ean: '0000000003104' },
    { name: 'Ciastko ozdobne', ean: '0000000001249' },
    { name: 'Ciastko wz', ean: '0000000001206' },
    { name: 'Ciasto 3Bit', ean: '2912330000000' },
    { name: 'CIASTO CHATKA PUCHATKA PISTACJO', ean: '2912146000000' },
    { name: 'Ciasto cytrynowiec', ean: '2912258000000' },
    { name: 'CIASTO CZEKOLADOWE LUZ', ean: '2908549000000' },
    { name: 'CIASTO LODOWIEC LUZ', ean: '2912448000000' },
    { name: 'CIASTO MALINOWA CHMURKA', ean: '2914387000000' },
    { name: 'CIASTO METROWIEC 1', ean: '2914404000000' },
    { name: 'CIASTO MIGDAŁOWIEC', ean: '2914974000000' },
    { name: 'CIASTO PIJANA ŚLIWKA LUZ', ean: '2912143000000' },
    { name: 'CIASTO PIJANA WIŚNIA LUZ', ean: '2912144000000' },
    { name: 'CIASTO PRINCE POLO', ean: '2916401000000' },
    { name: 'CIASTO PYCHOTKA LUZ', ean: '2912137000000' },
    { name: 'CIASTO RAFAELLO LUZ', ean: '2912186000000' },
    { name: 'CIASTO RODZYNKOWIEC', ean: '2904460000000' },
    { name: 'Ciasto Shrek', ean: '2912485000000' },
    { name: 'CIASTO SŁONECZNIKOWIEC', ean: '2900896000000' },
    { name: 'CIASTO SNICKERS LUZ', ean: '2918697000000' },
    { name: 'Ciasto straciatella', ean: '2991240000000' },
    { name: 'CIASTO TIRAMISU', ean: '2946720000000' },
    { name: 'Ciasto ucierane z owocami', ean: '2991236000000' },
    { name: 'Ciasto z owocami i galar', ean: '2991235000000' },
    { name: 'DESEREK CHIA', ean: '0000000004322' },
    { name: 'Deserek fit', ean: '0000000000317' },
    { name: 'DESEREK MIX KUBECZEK', ean: '0000000000384' },
    { name: 'DESEREK TIRAMISU', ean: '0000000001346' },
    { name: 'DONUT', ean: '0000000001353' },
    { name: 'DROŻDZÓWKA Z JAGODAMI', ean: '0000000003333' },
    { name: 'Drożdżówka grzebyk z marmoladą', ean: '0000000003033' },
    { name: 'Drożdżówka mini z cynamonem', ean: '0000000000876' },
    { name: 'Drożdżówka mini z syropem klono', ean: '0000000000877' },
    { name: 'Drożdżówka półfrancuska', ean: '0000000001194' },
    { name: 'Drożdżówka z brzoskwinią', ean: '0000000003038' },
    { name: 'Drożdżówka z budyniem', ean: '0000000003031' },
    { name: 'Drożdżówka z czekoladą', ean: '0000000003028' },
    { name: 'Drożdżówka z jabłkiem', ean: '0000000003037' },
    { name: 'Drożdżówka z makiem', ean: '0000000003030' },
    { name: 'Drożdżówka z serem', ean: '0000000003029' },
    { name: 'Drożdżówka z serem i marmoladą', ean: '0000000003035' },
    { name: 'DROŻDŻÓWKA ZE SZPINAKIEM', ean: '0000000001995' },
    { name: 'Drożdżówka ze szpinakiem', ean: '0000000001038' },
    { name: 'Eklerk', ean: '0000000001569' },
    { name: 'EKLERKI Z NADZIENIEM PISTACJOWY', ean: '0000000001988' },
    { name: 'Focaccia', ean: '0000000001358' },
    { name: 'FRYTKI', ean: '2000000007038' },
    { name: 'GRUSZKOWIEC', ean: '2912324000000' },
    { name: 'HOT-DOG PnZ', ean: '0000000001012' },
    { name: 'Izydor', ean: '2915460000000' },
    { name: 'JOGURT Z OWOCAMI I MUSLI 200g', ean: '0000000000777' },
    { name: 'Kajzerka', ean: '2401668000000' },
    { name: 'Kajzerka z makiem/sezamem', ean: '0000000001006' },
    { name: 'KAPUŚNIACZEK', ean: '0000000001834' },
    { name: 'KASZAK', ean: '0000000001000' },
    { name: 'KASZAK NA WAGĘ', ean: '2991243000000' },
    { name: 'KAWOWA POKUSA', ean: '2917894000000' },
    { name: 'Kocie oczka 300g', ean: '0000000001217' },
    { name: 'KORA ORZECHOWA', ean: '2991234000000' },
    { name: 'Kremówka  firmowa', ean: '0000000001415' },
    { name: 'KREMÓWKA 100G', ean: '2404027000000' },
    { name: 'LION', ean: '2991246000000' },
    { name: 'Lizak Bezowy', ean: '0000000000833' },
    { name: 'LODY CIEPŁE', ean: '0000000001420' },
    { name: 'MAKARONIKI', ean: '0000000004024' },
    { name: 'MAKARONIKI KOKOSOWE Z NISKIM IG', ean: '0000000001994' },
    { name: 'MAKOWIEC LUZ', ean: '2918687000000' },
    { name: 'MIODOWNIK', ean: '2912795000000' },
    { name: 'Monoporcja kokosowa pokusa', ean: '0000000000211' },
    { name: 'Monoporcja malinowa bomba', ean: '0000000000212' },
    { name: 'Muffinka duża', ean: '0000000001223' },
    { name: 'MUFINKA Sugar Free', ean: '0000000001299' },
    { name: 'MURZYNEK', ean: '0000000002586' },
    { name: 'Napoleonka szt', ean: '0000000022039' },
    { name: 'Obwarzanek', ean: '0000000001179' },
    { name: 'PALUCH CEBULOWY', ean: '0000000001196' },
    { name: 'Paluszki serowe francuskie 300g', ean: '0000000000498' },
    { name: 'Panierka', ean: '0000000001250' },
    { name: 'Panna Cotta', ean: '0000000000776' },
    { name: 'PĄCZEK Z KREMEM', ean: '0000000000892' },
    { name: 'PĄCZEK Z PISTACJĄ', ean: '0000000001987' },
    { name: 'PĄCZEK Z RÓŹĄ', ean: '0000000001185' },
    { name: 'PIEKARNIA NA ZAKWASIE CROISSANT', ean: '0000000000758' },
    { name: 'PIERNIK', ean: '2914560000000' },
    { name: 'Piernik w czekoladzie', ean: '0000000003075' },
    { name: 'Pizza', ean: '0000000001181' },
    { name: 'PRZEKĄSKA PIECZARKOWA', ean: '0000000001192' },
    { name: 'Ptyś z kremem', ean: '0000000001225' },
    { name: 'Ptyś z pianką', ean: '0000000003013' },
    { name: 'Rogal z nadzieniem makowym 160g', ean: '0000000001864' },
    { name: 'Rogalik', ean: '0000000003047' },
    { name: 'ROLADA MAKOWA', ean: '2913551000000' },
    { name: 'ROLADA PISTACJOWA', ean: '2200058000000' },
    { name: 'ROLSY MIX', ean: '0000000003227' },
    { name: 'RURKA Z BITĄ SMIETANĄ', ean: '0000000000383' },
    { name: 'Rurka z kremem', ean: '0000000000382' },
    { name: 'SAŁATKA OWOCOWA 200 GR', ean: '0000000000099' },
    { name: 'SERNIK DOMOWY LUZ', ean: '2918709000000' },
    { name: 'Shake', ean: '0000000002552' },
    { name: 'Stokrotka z serem', ean: '0000000001338' },
    { name: 'Super cena', ean: '2991239000000' },
    { name: 'Szarlotka', ean: '0000000001228' },
    { name: 'SZARLOTKA DOMOWA LUZ', ean: '2918742000000' },
    { name: 'Szarlotka z polewą czekoladową', ean: '0000000001421' },
    { name: 'SZYSZKI BEZCUKROWE', ean: '0000000002528' },
    { name: 'SZYSZKI KARMELOWE', ean: '0000000002527' },
    { name: 'TARTALETKA PISTACJOWA', ean: '0000000002530' },
    { name: 'TARTALETKA Z OWOCAMI', ean: '0000000002529' },
    { name: 'Torcik bezowy', ean: '0000000001105' },
    { name: 'Torcik mini', ean: '0000000001317' },
    { name: 'TORT BEZOWY', ean: '2901100000000' },
    { name: 'Tort owocowy', ean: '2991237000000' },
    { name: 'TORTILLA', ean: '0000000000095' },
    { name: 'WIÓRKI KOKOSOWE LUZ', ean: '2900155000000' },
    { name: 'WIŚNIOWIEC', ean: '2917898000000' },
    { name: 'Wuzetka Sugar Free', ean: '0000000001293' },
    { name: 'W-Z KAWOWA', ean: '0000000001294' },
    { name: 'Ziemniaczek', ean: '0000000001331' }
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
