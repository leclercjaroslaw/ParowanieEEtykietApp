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
    { name: 'TORT TIRAMISU', ean: '2912263000000' },
    { name: '7 days', ean: '2200018000000' },
    { name: 'Ambasador', ean: '2917886000000' },
    { name: 'AMONIACZKI', ean: '0000000001237' },
    { name: 'ARYZTA BUŁKA FARMERSKA ZAM.', ean: '0000000000698' },
    { name: 'BABECZKA BURACZANA Z MASCARPONE', ean: '0000000002268' },
    { name: 'BABECZKA DO KOSZYCZKA', ean: '0000000000435' },
    { name: 'BABECZKA MERCHEWKOWA', ean: '0000000002267' },
    { name: 'Babeczka mini', ean: '0000000003018' },
    { name: 'Babeczka mix', ean: '0000000001226' },
    { name: 'Babeczka owocowa duża', ean: '0000000001356' },
    { name: 'Babeczka z kremem', ean: '0000000000492' },
    { name: 'Babeczka z owocami', ean: '0000000001270' },
    { name: 'Babeczka z pianką', ean: '0000000003012' },
    { name: 'Babeczka z pianką', ean: '0000000000619' },
    { name: 'Babka', ean: '0000000002585' },
    { name: 'BABKA DROZDZOWA', ean: '2918688000000' },
    { name: 'BABKA PISTACJOWA', ean: '2200159000000' },
    { name: 'BABKA Z METRA', ean: '2918713000000' },
    { name: 'Bagietka', ean: '0000000001182' },
    { name: 'Bagietka czosnkowa', ean: '0000000002314' },
    { name: 'Bagietka francuska', ean: '0000000000525' },
    { name: 'Bagietka oliwkowa', ean: '0000000003043' },
    { name: 'Bagietka oliwkowa 70g', ean: '0000000000472' },
    { name: 'Bagietka pomidorowo-paprykowa', ean: '0000000003044' },
    { name: 'Bagietka z suszonymi pomidorami', ean: '0000000000473' },
    { name: 'Bagietka zapiekankowa', ean: '0000000000534' },
    { name: 'Bajaderka', ean: '0000000000627' },
    { name: 'BAJGIEL CIEMNY', ean: '0000000009196' },
    { name: 'BAJGIEL Z MAKIEM/KMINKIEM', ean: '0000000001989' },
    { name: 'Baletki 300g', ean: '0000000003097' },
    { name: 'BAMAPOL BUŁKA TARTA 500G', ean: '5903521001134' },
    { name: 'Bananowiec', ean: '2912272000000' },
    { name: 'Baran świąteczny chlebowy', ean: '2200281000000' },
    { name: 'Baran świąteczny drożdżowy', ean: '2201034000000' },
    { name: 'BATON Z NASIONAMI', ean: '0000000003111' },
    { name: 'Beza kawowa', ean: '0000000001320' },
    { name: 'Beza mascarpone', ean: '0000000001525' },
    { name: 'Bezglutenowy chleb świeży z kmi', ean: '5902768989199' },
    { name: 'Beziki', ean: '0000000003106' },
    { name: 'Beziki', ean: '2200111000000' },
    { name: 'Blat bezowy', ean: '2912335000000' },
    { name: 'Brownie wegańskie', ean: '0000000001287' },
    { name: 'Bułka baton', ean: '0000000001350' },
    { name: 'Bułka cebulowa', ean: '0000000001173' },
    { name: 'BUŁKA CIABATTA', ean: '0000000009195' },
    { name: 'Bułka cięta mini 60g', ean: '2400466000000' },
    { name: 'Bułka cięta ziarnista', ean: '0000000001165' },
    { name: 'BUŁKA CZARNA', ean: '2000000018676' },
    { name: 'Bułka czosnkowa', ean: '0000000001164' },
    { name: 'Bułka czwórka z kruszonką', ean: '0000000001286' },
    { name: 'Bułka dyniowa', ean: '0000000001162' },
    { name: 'Bułka grahamka', ean: '0000000001161' },
    { name: 'BUŁKA GRAHAMKA PROMOCJA', ean: '0000000001394' },
    { name: 'BUŁKA HAMBURGEROWA', ean: '0000000001199' },
    { name: 'BUŁKA HAMBURGEROWA 2SZT', ean: '0000000001198' },
    { name: 'BUŁKA HAMBURGEROWA CZARNA', ean: '0000000001499' },
    { name: 'BUŁKA HAMBURGEROWA GRAH. 2SZT', ean: '0000000001193' },
    { name: 'BUŁKA HAMBURGEROWA GRAHAMKA', ean: '0000000001191' },
    { name: 'BUŁKA HAMBURGEROWA PIWNA', ean: '0000000001999' },
    { name: 'BUŁKA JAGLANA Z ZIARNAMI', ean: '0000000001166' },
    { name: 'Bułka kukurydziana', ean: '0000000001163' },
    { name: 'Bułka na zapiekanke', ean: '0000000001171' },
    { name: 'BUŁKA NA ZAPIEKANKĘ 220 G', ean: '0000000002780' },
    { name: 'Bułka Oregano z cebulą', ean: '0000000001174' },
    { name: 'BUŁKA ORKISZOWA', ean: '0000000001991' },
    { name: 'Bułka Paprykowa', ean: '0000000000837' },
    { name: 'BUŁKA PARYSKA', ean: '0000000000531' },
    { name: 'Bułka serowo-cebulowa', ean: '0000000003040' },
    { name: 'BUŁKA SKANDYNAWII', ean: '0000000003057' },
    { name: 'Bułka sztangielka', ean: '0000000001183' },
    { name: 'Bułka tarta 0,5kg', ean: '0000000001767' },
    { name: 'BUŁKA TARTA 500G', ean: '5905034814126' },
    { name: 'BUŁKA TARTA 500G KENIA', ean: '0000000004217' },
    { name: 'Bułka tarta KG', ean: '0000000001260' },
    { name: 'Bułka węgierka', ean: '0000000001264' },
    { name: 'Bułka wodna', ean: '0000000001170' },
    { name: 'Bułka z kruszonką', ean: '0000000003041' },
    { name: 'Bułka z orzechami', ean: '0000000003048' },
    { name: 'Bułka z siemieniem', ean: '0000000001172' },
    { name: 'Bułka ze słonecznikiem', ean: '0000000003027' },
    { name: 'Bułka ziarnista', ean: '0000000001244' },
    { name: 'Bułka żytnia bez drożdży', ean: '0000000000888' },
    { name: 'Bułki do wypieku 300g', ean: '0000000000014' },
    { name: 'Cake Pops', ean: '0000000000775' },
    { name: 'Całuski', ean: '2402126000000' },
    { name: 'CAPPUCCINO', ean: '2991238000000' },
    { name: 'Cebularz', ean: '0000000002978' },
    { name: 'Chalka 200g Mima', ean: '2414720000000' },
    { name: 'Chałka', ean: '0000000001276' },
    { name: 'CHAŁKA MAKOWA', ean: '0000000001379' },
    { name: 'CHAŁKA SEROWA', ean: '0000000001279' },
    { name: 'CHLEB BAMBO IG', ean: '0000000001445' },
    { name: 'Chleb bez glutenu "D" 300g', ean: '0000000001139' },
    { name: 'CHLEB BIESZCZADZKI', ean: '0000000000008' },
    { name: 'Chleb bieszczadzki 1kg', ean: '0000000001128' },
    { name: 'CHLEB BYDGOSKI KROJONY 500G JAS', ean: '5908226622011' },
    { name: 'Chleb cebulowy 500g', ean: '0000000001348' },
    { name: 'CHLEB CHIA 500G', ean: '2201196000000' },
    { name: 'Chleb czosnkowy 500g', ean: '0000000001912' },
    { name: 'Chleb dekoracyjny 900g', ean: '0000000001329' },
    { name: 'Chleb dietetyczny 500g Mima', ean: '2414600000000' },
    { name: 'Chleb do Żurku', ean: '0000000003064' },
    { name: 'Chleb dobre ziarno 500g', ean: '0000000001759' },
    { name: 'Chleb domowy 900g', ean: '0000000001061' },
    { name: 'Chleb dyniowy 500g', ean: '0000000001133' },
    { name: 'Chleb firmowy 350g', ean: '0000000001157' },
    { name: 'Chleb FIT 500G', ean: '0000000001268' },
    { name: 'CHLEB FITNES', ean: '2200186000000' },
    { name: 'Chleb foremka 500g', ean: '0000000001118' },
    { name: 'Chleb graham 500g', ean: '0000000001111' },
    { name: 'CHLEB IG 300G', ean: '0000000001349' },
    { name: 'CHLEB KETO', ean: '2200365000000' },
    { name: 'Chleb kornel 400g', ean: '0000000003039' },
    { name: 'Chleb magnat 400g', ean: '0000000001131' },
    { name: 'Chleb mazurski 500g', ean: '0000000001132' },
    { name: 'Chleb mieszany 500g', ean: '0000000001058' },
    { name: 'Chleb mieszany 900g', ean: '0000000001127' },
    { name: 'Chleb mieszany pieczony na kapu', ean: '0000000002186' },
    { name: 'Chleb mieszny kłos 500g', ean: '0000000000762' },
    { name: 'Chleb mini 350g', ean: '0000000001119' },
    { name: 'Chleb młodości 500g', ean: '0000000002926' },
    { name: 'Chleb na Dzień Dobry', ean: '0000000003002' },
    { name: 'Chleb na liściu kapusty', ean: '0000000000852' },
    { name: 'Chleb orkiszowy 450g', ean: '0000000001135' },
    { name: 'CHLEB OWSIANY', ean: '2200220000000' },
    { name: 'Chleb owsiany 400g', ean: '0000000001494' },
    { name: 'CHLEB OWSIANY Z ŻURAWINĄ', ean: '2200255000000' },
    { name: 'Chleb paryski', ean: '0000000000538' },
    { name: 'Chleb pasterski 500g', ean: '0000000001757' },
    { name: 'Chleb pełny kłos 500g', ean: '0000000001134' },
    { name: 'CHLEB PRADZIAD 500G', ean: '0000000001347' },
    { name: 'CHLEB PRO BODY 400G', ean: '0000000000214' },
    { name: 'Chleb pszenny 450g', ean: '0000000001120' },
    { name: 'Chleb pszenny 900g', ean: '0000000001121' },
    { name: 'CHLEB PSZENNY JAGLANY', ean: '0000000001167' },
    { name: 'Chleb razowy 400g', ean: '0000000000169' },
    { name: 'Chleb razowy babuni 350g', ean: '0000000001137' },
    { name: 'Chleb razowy bez drożdży 500g', ean: '0000000001156' },
    { name: 'Chleb sielankowy 500g', ean: '0000000002928' },
    { name: 'Chleb skandynawski 450g', ean: '0000000001220' },
    { name: 'Chleb słonecznikowy 400g', ean: '0000000001254' },
    { name: 'Chleb słonecznikowy 500g', ean: '0000000001159' },
    { name: 'Chleb słowiański', ean: '2200033000000' },
    { name: 'CHLEB SMAK SKANDYNAWII 450g', ean: '0000000002951' },
    { name: 'Chleb sprint 450g', ean: '0000000003036' },
    { name: 'Chleb staropolski 600g', ean: '0000000001059' },
    { name: 'Chleb śląski 900g', ean: '0000000001126' },
    { name: 'Chleb śląski mini 500g', ean: '0000000001129' },
    { name: 'CHLEB TOSTOWY 450G', ean: '0000000002263' },
    { name: 'CHLEB TOSTOWY GRAHAM 450G', ean: '0000000001069' },
    { name: 'Chleb tygrysi kukurydziany 450g', ean: '0000000001528' },
    { name: 'CHLEB VITALEGO 850G', ean: '0000000001762' },
    { name: 'CHLEB WIEJSKI 600G KROJONY', ean: '2418805000000' },
    { name: 'Chleb wiejski bez drożdzy 800g', ean: '0000000001130' },
    { name: 'Chleb wiejski maślankowy 450g', ean: '0000000001109' },
    { name: 'Chleb wiejski na naturalnym zak', ean: '0000000001144' },
    { name: 'Chleb Włoski', ean: '0000000001501' },
    { name: 'Chleb z czarnuszką', ean: '0000000001504' },
    { name: 'Chleb z oliwkami', ean: '0000000001361' },
    { name: 'Chleb ze smalcem', ean: '0000000001354' },
    { name: 'Chleb ziarnisty 500g', ean: '0000000001122' },
    { name: 'Chleb Zytni Razowy z slonecznik', ean: '0000000002724' },
    { name: 'Chleb żytni bez drożdży', ean: '0000000000881' },
    { name: 'Chleb żytni bez drożdży chia', ean: '0000000000884' },
    { name: 'CHLEB ŻYTNI IG 300G', ean: '0000000001449' },
    { name: 'Chleb żytni z żurawiną', ean: '0000000001355' },
    { name: 'Chleb żytni z żurawiną i orzech', ean: '0000000003001' },
    { name: 'CHLEBEK BANANOWY WEGE', ean: '2200543000000' },
    { name: 'CHLEBEK GRILOWY Z CZOSNKIEM', ean: '0000000001054' },
    { name: 'CHOINKA', ean: '0000000000029' },
    { name: 'Ciasteczka francuskie 300g', ean: '0000000000421' },
    { name: 'Ciasteczka francuskie z nadzien', ean: '0000000001266' },
    { name: 'Ciastka beciki 300g', ean: '0000000000655' },
    { name: 'CIASTKA DO DEKORACJI 70G', ean: '0000000001233' },
    { name: 'Ciastka kręcone z orzeszkami 30', ean: '0000000000068' },
    { name: 'Ciastka kruche mix 300g', ean: '0000000002542' },
    { name: 'Ciastka kruche z kokosem 300g', ean: '0000000000069' },
    { name: 'Ciastka mix 500G', ean: '5901179060497' },
    { name: 'Ciastka oreo 300g', ean: '0000000000653' },
    { name: 'CIASTKA OWSIANE Z ZIARNAMI', ean: '0000000004321' },
    { name: 'CIASTKA PIERNICZKI 300g', ean: '0000000001232' },
    { name: 'Ciastka rozetki z nadzieniem ja', ean: '0000000003103' },
    { name: 'Ciastka rozetki z nadzieniem po', ean: '0000000003104' },
    { name: 'CIASTKO BOUNTY', ean: '0000000001619' },
    { name: 'Ciastko dekoracyjne', ean: '0000000001252' },
    { name: 'CIASTKO MUSLI', ean: '0000000001015' },
    { name: 'Ciastko ozdobne', ean: '0000000001249' },
    { name: 'Ciastko ozdobne', ean: '0000000001246' },
    { name: 'Ciastko ozdobne', ean: '0000000001247' },
    { name: 'Ciastko parzak 60g Kosakowska', ean: '2406380000000' },
    { name: 'Ciastko promocyjne', ean: '0000000000236' },
    { name: 'CIASTKO SŁONECZNIK', ean: '0000000001603' },
    { name: 'Ciastko Stokrotka', ean: '0000000002041' },
    { name: 'Ciastko wz', ean: '0000000001206' },
    { name: 'Ciastko wz', ean: '0000000000241' },
    { name: 'Ciastko wz', ean: '0000000000191' },
    { name: 'Ciastko wz', ean: '0000000000434' },
    { name: 'Ciastko wz', ean: '0000000000015' },
    { name: 'CIASTO 380G WEGE Z BANANAMI', ean: '5905784644721' },
    { name: 'Ciasto 3Bit', ean: '2912330000000' },
    { name: 'CIASTO 400G TRUSKAWKOWE', ean: '5905784636634' },
    { name: 'Ciasto Agnieszka', ean: '2402139000000' },
    { name: 'CIASTO CHAŁWOWE', ean: '2991249000000' },
    { name: 'CIASTO CHATKA PUCHATKA PISTACJO', ean: '2912146000000' },
    { name: 'Ciasto Cytryna pod pierzynką', ean: '0000000000216' },
    { name: 'Ciasto cytrynowiec', ean: '2912258000000' },
    { name: 'CIASTO CZEKOLADOWE LUZ', ean: '2908549000000' },
    { name: 'CIASTO DROŻDŻOWE Z KRUSZONKĄ', ean: '0000000001422' },
    { name: 'CIASTO DROŻDŻOWE Z OWOCAMI SEZO', ean: '2200345000000' },
    { name: 'Ciasto jagodowe', ean: '2200029000000' },
    { name: 'Ciasto jogurtowe', ean: '2200310000000' },
    { name: 'CIASTO KRÓWKA LUZ', ean: '2912329000000' },
    { name: 'CIASTO KRUCHE Z OWOCAMI', ean: '2914358000000' },
    { name: 'CIASTO LEŚNY MECH', ean: '2914372000000' },
    { name: 'CIASTO LODOWIEC LUZ', ean: '2912448000000' },
    { name: 'Ciasto makaronikowe', ean: '2991242000000' },
    { name: 'CIASTO MALINOWA CHMURKA', ean: '2914387000000' },
    { name: 'Ciasto marchewkowe', ean: '0000000001527' },
    { name: 'CIASTO METROWIEC 1', ean: '2914404000000' },
    { name: 'CIASTO MIGDAŁOWIEC', ean: '2914974000000' },
    { name: 'CIASTO NIEBO', ean: '2915340000000' },
    { name: 'CIASTO NUTELLA', ean: '2907840000000' },
    { name: 'CIASTO OREO', ean: '2903021000000' },
    { name: 'Ciasto Piernikowy Orzech', ean: '0000000000215' },
    { name: 'CIASTO PIJANA ŚLIWKA LUZ', ean: '2912143000000' },
    { name: 'CIASTO PIJANA WIŚNIA LUZ', ean: '2912144000000' },
    { name: 'CIASTO PRINCE POLO', ean: '2916401000000' },
    { name: 'CIASTO PYCHOTKA LUZ', ean: '2912137000000' },
    { name: 'CIASTO RAFAELLO LUZ', ean: '2912186000000' },
    { name: 'CIASTO RODZYNKOWIEC', ean: '2904460000000' },
    { name: 'CIASTO ROLADA LUZ', ean: '2908069000000' },
    { name: 'Ciasto Shrek', ean: '2912485000000' },
    { name: 'CIASTO SŁONECZNIKOWIEC', ean: '2900896000000' },
    { name: 'CIASTO SNICKERS LUZ', ean: '2918697000000' },
    { name: 'Ciasto straciatella', ean: '2991240000000' },
    { name: 'CIASTO TIRAMISU', ean: '2946720000000' },
    { name: 'Ciasto tortowe', ean: '0000000001564' },
    { name: 'Ciasto ucierane z owocami', ean: '2991236000000' },
    { name: 'Ciasto wiśniowo-śmietankowe', ean: '2200040000000' },
    { name: 'CIASTO Z MUSEM JABLKOWYM', ean: '2200013000000' },
    { name: 'Ciasto z owocami i galar', ean: '2991235000000' },
    { name: 'Ciasto z owocami i galar Aromat', ean: '2200598000000' },
    { name: 'croissant przecena', ean: '0000000000759' },
    { name: 'CYNAMONKA', ean: '0000000001423' },
    { name: 'Czekolada gorąca', ean: '0000000001255' },
    { name: 'Dekoracja cukiernicza', ean: '2201217000000' },
    { name: 'DELICJUSZ', ean: '2401409000000' },
    { name: 'Deser 250g', ean: '0000000001573' },
    { name: 'Deser 300g', ean: '0000000001570' },
    { name: 'DESER FIT 250 GR.', ean: '0000000002209' },
    { name: 'DESER FIT 300 GR.', ean: '0000000002210' },
    { name: 'DESER PANNA COTTA 250 G', ean: '0000000000044' },
    { name: 'DESEREK CHIA', ean: '0000000004322' },
    { name: 'Deserek fit', ean: '0000000000317' },
    { name: 'DESEREK MIX KUBECZEK', ean: '0000000000384' },
    { name: 'DESEREK TIRAMISU', ean: '0000000001346' },
    { name: 'Deserki mix', ean: '0000000001209' },
    { name: 'DONUT', ean: '0000000001353' },
    { name: 'DROŻDZÓWKA Z JAGODAMI', ean: '0000000003333' },
    { name: 'Drożdżówka 8%', ean: '2401030000000' },
    { name: 'Drożdżówka grzebyk z marmoladą', ean: '0000000003033' },
    { name: 'Drożdżówka mini z cynamonem', ean: '0000000000876' },
    { name: 'Drożdżówka mini z jagodą', ean: '0000000000878' },
    { name: 'Drożdżówka mini z marmoladą', ean: '0000000000875' },
    { name: 'Drożdżówka mini z syropem klono', ean: '0000000000877' },
    { name: 'Drożdżówka mix smaków', ean: '0000000001187' },
    { name: 'Drożdżówka półfrancuska', ean: '0000000001194' },
    { name: 'Drożdżówka półfrancuska', ean: '0000000009194' },
    { name: 'DROŻDŻÓWKA PROMOCJA', ean: '0000000000060' },
    { name: 'Drożdżówka z brzoskwinią', ean: '0000000003038' },
    { name: 'Drożdżówka z budyniem', ean: '0000000003031' },
    { name: 'Drożdżówka z czekoladą', ean: '0000000003028' },
    { name: 'Drożdżówka z jabłkiem', ean: '0000000003037' },
    { name: 'Drożdżówka z jagodą', ean: '0000000003032' },
    { name: 'Drożdżówka z makiem', ean: '0000000003030' },
    { name: 'Drożdżówka z serem', ean: '0000000003029' },
    { name: 'DROŻDŻÓWKA Z SEREM', ean: '0000000000230' },
    { name: 'Drożdżówka z serem i marmoladą', ean: '0000000003035' },
    { name: 'DROŻDŻÓWKA Z TOFFI', ean: '0000000000419' },
    { name: 'DROŻDŻÓWKA ZE SZPINAKIEM', ean: '0000000001995' },
    { name: 'Drożdżówka ze szpinakiem', ean: '0000000001038' },
    { name: 'Eklerk', ean: '0000000001569' },
    { name: 'EKLERKI Z NADZIENIEM PISTACJOWY', ean: '0000000001988' },
    { name: 'Fale jak w Dunaju', ean: '2912166000000' },
    { name: 'FAWORKI 300g', ean: '0000000001037' },
    { name: 'Figurki do tortu', ean: '0000000002340' },
    { name: 'Focaccia', ean: '0000000001358' },
    { name: 'FRYTKI', ean: '2000000007038' },
    { name: 'GRUSZKOWIEC', ean: '2912324000000' },
    { name: 'HAMBURGER PROMO', ean: '0000000002855' },
    { name: 'HOT DOG AMERYKAŃSKI', ean: '0000000000335' },
    { name: 'HOT DOG AMERYKAŃSKI', ean: '0000000000456' },
    { name: 'HOT DOG AMERYKAŃSKI', ean: '0000000000053' },
    { name: 'HOT DOG PROMO', ean: '0000000002661' },
    { name: 'HOT-DOG PnZ', ean: '0000000001012' },
    { name: 'Izydor', ean: '2915460000000' },
    { name: 'JOGURT Z OWOCAMI I MUSLI 200g', ean: '0000000000777' },
    { name: 'Kajzerka', ean: '2401668000000' },
    { name: 'Kajzerka z makiem/sezamem', ean: '0000000001006' },
    { name: 'KANAPKA', ean: '0000000000540' },
    { name: 'KANAPKA NA GORĄCO', ean: '0000000000594' },
    { name: 'KAPUŚNIACZEK', ean: '0000000001834' },
    { name: 'KAPUŚNIACZKI', ean: '2400895000000' },
    { name: 'KASZAK', ean: '0000000001000' },
    { name: 'KASZAK NA WAGĘ', ean: '2991243000000' },
    { name: 'Kawa/czekolada mała', ean: '0000000000320' },
    { name: 'Kawa/czekolada mała', ean: '0000000000449' },
    { name: 'KAWOWA POKUSA', ean: '2917894000000' },
    { name: 'Kilimandzaro', ean: '2991241000000' },
    { name: 'Kocie oczka 300g', ean: '0000000001217' },
    { name: 'KOCIE OCZKA DUŻE', ean: '0000000002976' },
    { name: 'Kokosanki 250g', ean: '0000000002185' },
    { name: 'Koperta serowa', ean: '0000000001343' },
    { name: 'KORA ORZECHOWA', ean: '2991234000000' },
    { name: 'KORPUSY DUŻE', ean: '2000000018591' },
    { name: 'KORPUSY NA TARTALETKI Aromat', ean: '2991247000000' },
    { name: 'KRAINA CIASTO 400G Z JAGODAMI', ean: '5905784636627' },
    { name: 'Kremówka', ean: '0000000000595' },
    { name: 'Kremówka', ean: '0000000000258' },
    { name: 'Kremówka', ean: '0000000001207' },
    { name: 'Kremówka  firmowa', ean: '0000000001415' },
    { name: 'KREMÓWKA 100G', ean: '2404027000000' },
    { name: 'kremówka promo', ean: '0000000000063' },
    { name: 'Królewiec', ean: '2401211000000' },
    { name: 'Kruche pierniki', ean: '2200206000000' },
    { name: 'LA LOR KAJZERKA 55G Z MAKIEM', ean: '2420070000000' },
    { name: 'LEŚNY MECH KAWAEK', ean: '0000000001911' },
    { name: 'LION', ean: '2991246000000' },
    { name: 'Lizak Bezowy', ean: '0000000000833' },
    { name: 'Lody', ean: '0000000000669' },
    { name: 'LODY CIEPŁE', ean: '0000000001420' },
    { name: 'Lody Promocja', ean: '0000000002688' },
    { name: 'MAKARONIKI', ean: '0000000004024' },
    { name: 'MAKARONIKI KOKOSOWE Z NISKIM IG', ean: '0000000001994' },
    { name: 'MAKOWIEC LUZ', ean: '2918687000000' },
    { name: 'MAZUREK', ean: '2912189000000' },
    { name: 'Migdałek malinowy', ean: '2991245000000' },
    { name: 'MIKOŁAJ', ean: '0000000002000' },
    { name: 'Mini Karmelki', ean: '0000000000048' },
    { name: 'MIODOWNIK', ean: '2912795000000' },
    { name: 'Monoporcja kokosowa pokusa', ean: '0000000000211' },
    { name: 'Monoporcja malinowa bomba', ean: '0000000000212' },
    { name: 'Monoporcja słony karmel', ean: '0000000000210' },
    { name: 'Muffika z nadzieniem', ean: '0000000000186' },
    { name: 'Muffinka duża', ean: '0000000001223' },
    { name: 'Muffinka duża promo', ean: '0000000002860' },
    { name: 'Muffinka mini', ean: '0000000001221' },
    { name: 'MUFINKA Sugar Free', ean: '0000000001299' },
    { name: 'MURZYNEK', ean: '0000000002586' },
    { name: 'Napoleonka szt', ean: '0000000022039' },
    { name: 'NUGGETSY', ean: '2000000007113' },
    { name: 'Obwarzanek', ean: '0000000001179' },
    { name: 'Obwarzanek słodki', ean: '0000000001292' },
    { name: 'OMLET', ean: '0000000001352' },
    { name: 'Oreo mix 300g', ean: '0000000000632' },
    { name: 'PALUCH CEBULOWY', ean: '0000000001196' },
    { name: 'PALUSZKI DO BARSZCZU', ean: '2200076000000' },
    { name: 'Paluszki francuskie z kminkiem', ean: '0000000000499' },
    { name: 'PALUSZKI PTYSIOWE', ean: '2917912000000' },
    { name: 'Paluszki serowe francuskie 300g', ean: '0000000000498' },
    { name: 'Pałeczki ptysiowe', ean: '5901179060428' },
    { name: 'Panierka', ean: '0000000001250' },
    { name: 'Panko paprykowe', ean: '0000000001261' },
    { name: 'Panko paprykowe 0,5KG', ean: '0000000001269' },
    { name: 'Panna Cotta', ean: '0000000000776' },
    { name: 'PĄCZEK 10 SZT', ean: '0000000003023' },
    { name: 'PĄCZEK 6 SZT', ean: '0000000003026' },
    { name: 'PĄCZEK 90 G', ean: '0000000001044' },
    { name: 'PĄCZEK CZEK. TRUSK. ADW. TOFFI', ean: '0000000002369' },
    { name: 'PĄCZEK MIX 15 SZT', ean: '0000000003024' },
    { name: 'PĄCZEK WYPIEKANY W PIEKARNIKU', ean: '2000000014043' },
    { name: 'PĄCZEK Z ADWOKATEM', ean: '2000000013886' },
    { name: 'PĄCZEK Z BANANEM', ean: '2000000013701' },
    { name: 'PĄCZEK Z KOKOSEM', ean: '2000000013961' },
    { name: 'PĄCZEK Z KREMEM', ean: '0000000000892' },
    { name: 'PĄCZEK Z PISTACJĄ', ean: '0000000001987' },
    { name: 'PĄCZEK Z PUDREM NADZ.', ean: '0000000002367' },
    { name: 'PĄCZEK Z RÓŹĄ', ean: '0000000001185' },
    { name: 'PIEGUSEK LUZ', ean: '2912466000000' },
    { name: 'PIEKARNIA NA ZAKWASIE CROISSANT', ean: '0000000000758' },
    { name: 'PIEKARNIA NA ZAKWASIE CROISSANT', ean: '0000000000050' },
    { name: 'Pierniczki 300g', ean: '0000000000067' },
    { name: 'PIERNIK', ean: '2914560000000' },
    { name: 'Piernik w czekoladzie', ean: '0000000003075' },
    { name: 'Pizza', ean: '0000000001181' },
    { name: 'Placek z bezikami', ean: '2402242000000' },
    { name: 'Placek z truskawkami', ean: '2402207000000' },
    { name: 'PRZEKĄSKA PIECZARKOWA', ean: '0000000001192' },
    { name: 'PTASIE MLECZKO', ean: '0000000000331' },
    { name: 'Ptyś', ean: '0000000000526' },
    { name: 'Ptyś z kremem', ean: '0000000001225' },
    { name: 'Ptyś z pianką', ean: '0000000003013' },
    { name: 'RACZKI PUDER 250G', ean: '5901179060268' },
    { name: 'RACZKI Z KRYSZTAŁEM  250G', ean: '5901179060558' },
    { name: 'Rogal', ean: '0000000001178' },
    { name: 'Rogal z nadzieniem makowym 160g', ean: '0000000001864' },
    { name: 'Rogalik', ean: '0000000003047' },
    { name: 'ROGALIK PROMOCJA', ean: '0000000000013' },
    { name: 'Rogaliki z nadzieniem różanym', ean: '0000000001039' },
    { name: 'ROLADA MAKOWA', ean: '2913551000000' },
    { name: 'ROLADA PISTACJOWA', ean: '2200058000000' },
    { name: 'ROLSY MIX', ean: '0000000003227' },
    { name: 'Rurka Aromat', ean: '2200564000000' },
    { name: 'RURKA Z BITĄ SMIETANĄ', ean: '0000000000383' },
    { name: 'Rurka z kremem', ean: '0000000000382' },
    { name: 'Sałatka Grecka Bistro', ean: '0000000000386' },
    { name: 'SAŁATKA OWOCOWA 200 GR', ean: '0000000000099' },
    { name: 'SEKRET CZKOLADOWY/WANILIOWY350G', ean: '5901179060961' },
    { name: 'Serduszko duże', ean: '0000000000411' },
    { name: 'Serduszko małe', ean: '0000000000379' },
    { name: 'Sernik', ean: '0000000001238' },
    { name: 'Sernik Aromat', ean: '2201157000000' },
    { name: 'SERNIK DOMOWY LUZ', ean: '2918709000000' },
    { name: 'SERNIK FIT BEZ CUKRU', ean: '2918246000000' },
    { name: 'SERNIK KRÓLEWSKI', ean: '2200002000000' },
    { name: 'Sernik na cieście czekoladowym', ean: '2200010000000' },
    { name: 'SERNIK NA ZIMNO LUZ', ean: '2918727000000' },
    { name: 'Sernik Sugar Free', ean: '0000000001301' },
    { name: 'Sernik wisniowo-kokosowy 350g', ean: '5905784643830' },
    { name: 'Sernik z brzoskwiniami (1,5kg n', ean: '0000000001224' },
    { name: 'Sernik z czekoladowa kruszonka', ean: '5905784643717' },
    { name: 'SERNIK Z KRUSZONKĄ KOKOSOWĄ', ean: '2912261000000' },
    { name: 'Sernik z malinami 350g', ean: '5905784643038' },
    { name: 'Shake', ean: '0000000002552' },
    { name: 'Shake', ean: '0000000000253' },
    { name: 'Shake', ean: '0000000000620' },
    { name: 'Smietanowiec 350g', ean: '5905784643847' },
    { name: 'Solodrąg', ean: '0000000001180' },
    { name: 'Stokrotka z serem', ean: '0000000001338' },
    { name: 'Super cena', ean: '2991239000000' },
    { name: 'Szarlotka', ean: '0000000001228' },
    { name: 'Szarlotka', ean: '0000000000820' },
    { name: 'Szarlotka', ean: '0000000000213' },
    { name: 'Szarlotka', ean: '0000000000509' },
    { name: 'Szarlotka Aromat', ean: '2991248000000' },
    { name: 'Szarlotka champion 350g', ean: '5905784643892' },
    { name: 'SZARLOTKA DOMOWA LUZ', ean: '2918742000000' },
    { name: 'Szarlotka na zimno Sugar free', ean: '0000000001298' },
    { name: 'Szarlotka pychotka', ean: '2201048000000' },
    { name: 'Szarlotka z polewą czekoladową', ean: '0000000001421' },
    { name: 'SZYSZKI BEZCUKROWE', ean: '0000000002528' },
    { name: 'SZYSZKI KARMELOWE', ean: '0000000002527' },
    { name: 'Tarta z owocami w żelu', ean: '0000000001239' },
    { name: 'TARTALETKA PISTACJOWA', ean: '0000000002530' },
    { name: 'TARTALETKA Z OWOCAMI', ean: '0000000002529' },
    { name: 'Tartaletki', ean: '0000000001219' },
    { name: 'Torcik bezowy', ean: '0000000001105' },
    { name: 'Torcik marakuja sztuka', ean: '0000000001275' },
    { name: 'Torcik mini', ean: '0000000001317' },
    { name: 'Torcik serce', ean: '0000000002357' },
    { name: 'Torcik Serce', ean: '0000000000368' },
    { name: 'TORT BEZOWY', ean: '2901100000000' },
    { name: 'TORT BEZOWY MASCARPONE', ean: '0000000002272' },
    { name: 'Tort kawałek', ean: '0000000001218' },
    { name: 'Tort owocowy', ean: '2991237000000' },
    { name: 'TORT PRALINOWY', ean: '2900230000000' },
    { name: 'Tort rafaello', ean: '2991244000000' },
    { name: 'TORT SERCE MAŁY', ean: '0000000002359' },
    { name: 'Tort wg. zamówienia', ean: '0000000003108' },
    { name: 'TORTILLA', ean: '0000000000095' },
    { name: 'TORTILLA', ean: '0000000000517' },
    { name: 'TORTILLA', ean: '0000000000207' },
    { name: 'TOST Z DODATKAMI', ean: '0000000000248' },
    { name: 'TOST Z DODATKAMI', ean: '0000000000476' },
    { name: 'TOST Z DODATKAMI PROMO', ean: '0000000002858' },
    { name: 'Trójkąt fintes 80g', ean: '0000000001498' },
    { name: 'TRÓJKĄT MALINOWY', ean: '0000000002264' },
    { name: 'TRÓJKĄT MIX SMAKÓW', ean: '0000000002311' },
    { name: 'TRÓJKĄT SZARLOTKA', ean: '0000000002265' },
    { name: 'TWAROŻKOWA CHMURKA', ean: '2912459000000' },
    { name: 'Wafel przekłądany trójkąt', ean: '0000000001281' },
    { name: 'Wafle Przekładane', ean: '2401734000000' },
    { name: 'Wek 300g', ean: '0000000001123' },
    { name: 'WIÓRKI KOKOSOWE LUZ', ean: '2900155000000' },
    { name: 'WIŚNIOWIEC', ean: '2917898000000' },
    { name: 'Wuzetka Sugar Free', ean: '0000000001293' },
    { name: 'WZ Aromat', ean: '2201029000000' },
    { name: 'W-Z KAWOWA', ean: '0000000001294' },
    { name: 'Zajączek wielkanocny', ean: '0000000000455' },
    { name: 'ZAPIEKANKA', ean: '0000000000354' },
    { name: 'ZAPIEKANKA', ean: '0000000000422' },
    { name: 'ZAPIEKANKA Promo', ean: '0000000002678' },
    { name: 'ZAPIEKANKA Promo', ean: '0000000000228' },
    { name: 'Zestaw Bistro 10 PLN', ean: '0000000000414' },
    { name: 'ZESTAW PIERNIKÓW', ean: '0000000002006' },
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
