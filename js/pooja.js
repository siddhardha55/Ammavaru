/**
 * Sri Ammavaru Pooja Seva Portal Controller
 * Real-time Firebase RTDB synchronization for Daily Morning & Evening Pooja Schedule.
 * 
 * Strict Privacy Guarantee:
 * Mobile numbers are kept confidential for committee members contact only.
 * The public portal strictly renders approved devotee names, gotram, and date/slot.
 */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBFKIu5Dno8TpjPrfTtcVJ2tR28dOrU0LE",
  authDomain: "ammavaru-533ac.firebaseapp.com",
  databaseURL: "https://ammavaru-533ac-default-rtdb.firebaseio.com",
  projectId: "ammavaru-533ac",
  storageBucket: "ammavaru-533ac.firebasestorage.app",
  messagingSenderId: "697067769497",
  appId: "1:697067769497:android:91ff2729938bf3a904b208"
};

// Festival Days Metadata (9 Auspicious Alankarams & Festival Dates)
const FESTIVAL_DAYS = [
  { id: 'day-1', dayNum: 1, date: '2026-10-11', teName: '1వ రోజు - శ్రీ బాలా త్రిపుర సుందరి దేవి', enName: 'Day 1 - Sri Bala Tripura Sundari', tithiTe: 'పాడ్యమి', tithiEn: 'Prathama' },
  { id: 'day-2', dayNum: 2, date: '2026-10-12', teName: '2వ రోజు - శ్రీ గాయత్రీ దేవి అలంకారం', enName: 'Day 2 - Sri Gayatri Devi', tithiTe: 'విదియ', tithiEn: 'Dwitiya' },
  { id: 'day-3', dayNum: 3, date: '2026-10-13', teName: '3వ రోజు - శ్రీ అన్నపూర్ణా దేవి అలంకారం', enName: 'Day 3 - Sri Annapurna Devi', tithiTe: 'తదియ', tithiEn: 'Tritiya' },
  { id: 'day-4', dayNum: 4, date: '2026-10-14', teName: '4వ రోజు - శ్రీ కాత్యాయనీ దేవి అలంకారం', enName: 'Day 4 - Sri Katyayani Devi', tithiTe: 'చవితి', tithiEn: 'Chaturthi' },
  { id: 'day-5', dayNum: 5, date: '2026-10-15', teName: '5వ రోజు - శ్రీ లలితా త్రిపుర సుందరి దేవి', enName: 'Day 5 - Sri Lalitha Tripura Sundari', tithiTe: 'పంచమి', tithiEn: 'Panchami' },
  { id: 'day-6', dayNum: 6, date: '2026-10-16', teName: '6వ రోజు - శ్రీ మహాలక్ష్మీ దేవి అలంకారం', enName: 'Day 6 - Sri Mahalakshmi Devi', tithiTe: 'షష్ఠి', tithiEn: 'Shashthi' },
  { id: 'day-7', dayNum: 7, date: '2026-10-17', teName: '7వ రోజు - శ్రీ మహా సరస్వతీ దేవి (మూలా నక్షత్రం)', enName: 'Day 7 - Sri Saraswati Devi (Moola)', tithiTe: 'సప్తమి', tithiEn: 'Saptami' },
  { id: 'day-8', dayNum: 8, date: '2026-10-18', teName: '8వ రోజు - శ్రీ దుర్గా దేవి అలంకారం (దుర్గాష్టమి)', enName: 'Day 8 - Sri Durga Devi (Durgashtami)', tithiTe: 'అష్టమి', tithiEn: 'Ashtami' },
  { id: 'day-9', dayNum: 9, date: '2026-10-19', teName: '9వ రోజు - శ్రీ మహిషాసుర మర్దిని (విజయదశమి)', enName: 'Day 9 - Sri Mahishasura Mardini (Vijayadasami)', tithiTe: 'దశమి', tithiEn: 'Dasami' }
];

const POOJA_I18N = {
  te: {
    poojaPortalTitle: "శ్రీ అమ్మవారి నిత్య పూజా సంకల్పం",
    poojaPortalSubtitle: "9 రోజుల ఉత్సవ ఉదయం & సాయంత్రం పూజా సేవకుల వివరాలు",
    navBackToAccounts: "చందాలు & ఖర్చులు",
    heroBadgeText: "అమ్మవారి దివ్య సన్నిధిలో పవిత్ర పూజా సేవ",
    heroHeading: "మీరు కూడా పూజలో కూర్చోవాలనుకుంటున్నారా?",
    heroDesc: "ఉదయం లేదా సాయంత్రం విశేష పూజలలో దంపతులుగా లేదా కుటుంబ సమేతంగా కూర్చునే భక్తులు ఇక్కడే మీ వివరాలను నమోదు చేసుకోండి.",
    registerCTA: "పూజలో కూర్చునేందుకు నమోదు చేసుకోండి",
    privacyGuaranteedPill: "మొబైల్ నంబర్ గోప్యత రక్షించబడుతుంది",
    tagApprovedDevotees: "పూజా సంకల్పం",
    totalPoojaDevotees: "పూజలో కూర్చునే మొత్తం భక్తులు",
    verifiedByCommittee: "కమిటీ సభ్యులు ఆమోదించినవి",
    purityPill: "100% పవిత్రం",
    morningTag: "ఉదయం పూజ (08:00 AM)",
    morningDevoteesLabel: "ఉదయ కాల సేవకులు",
    morningCardSub: "విశేష కుంకుమార్చన & అభిషేకం",
    eveningTag: "సాయంత్రం పూజ (06:30 PM)",
    eveningDevoteesLabel: "సాయంకాల సేవకులు",
    eveningCardSub: "దీపారాధన & విశేష హారతి",
    filterTitle: "తేదీ & పూజా సమయం ఎంచుకోండి",
    allSessions: "అన్ని పూజలు (All)",
    morningSession: "ఉదయం పూజ (8:00 AM)",
    eveningSession: "సాయంత్రం పూజ (6:30 PM)",
    allDaysLabel: "అన్ని రోజులు (All Days)",
    pillFestiveDays: "9 రోజుల ఉత్సవాలు",
    dayLabel: "రోజు",
    tithiSuffix: "తిథి",
    devoteesCountSuffix: "మంది సేవకులు",
    morningColSub: "కుంకుమార్చన & అభిషేకం",
    eveningColSub: "సహస్ర దీపారాధన & హారతి",
    searchPlaceholder: "భక్తుని పేరు లేదా గోత్రం వెతకండి...",
    searchNoResults: "పేరుతో ఎవరూ కనిపించలేదు.",
    noDevoteesMorning: "ఈ తేదీన ఉదయం పూజలో ఎవరూ నమోదు కాలేదు",
    noDevoteesEvening: "ఈ తేదీన సాయంత్రం పూజలో ఎవరూ నమోదు కాలేదు",
    noDevoteesMatch: "ఎటువంటి పూజా సేవకుల రికార్డులు లభించలేదు",
    modalHeading: "పూజలో కూర్చునేందుకు నమోదు",
    modalSubheading: "శ్రీ అమ్మవారి కృపా కటాక్షములు మీ కుటుంబానికి కలుగుగాక",
    formPrivacyNotice: "గోప్యత రక్షణ: మీ మొబైల్ నంబర్ కమిటీ సభ్యుల సంప్రదింపులకు మాత్రమే భద్రంగా ఉపయోగించబడుతుంది. వెబ్‌సైట్‌లో కేవలం మీ పేర్లు మరియు తేదీ మాత్రమే ప్రదర్శించబడతాయి.",
    labelDevoteeNames: "పూజలో కూర్చునే భక్తుల పేర్లు *",
    hintDevoteeNames: "దంపతుల పేర్లు లేదా కుటుంబ సభ్యుల పేర్లు నమోదు చేయవచ్చు",
    placeholderDevoteeNames: "ఉదా: వెంకటేశ్వర్లు & లక్ష్మి లేదా మీ పేరు...",
    labelMobile: "మొబైల్ నంబర్ * (కమిటీ సభ్యుల సంప్రదింపు కొరకు)",
    hintMobile: "కమిటీ సభ్యులు పూజా సమయం మరియు ఏర్పాట్ల కోసం మాత్రమే ఫోన్ చేస్తారు",
    placeholderMobile: "10 అంకెల మొబైల్ నంబర్",
    labelGotram: "గోత్రం (Gotram)",
    placeholderGotram: "ఉదా: కాశ్యపస, భరద్వాజ, కౌండిన్యస...",
    labelDate: "పూజా తేదీ ఎంచుకోండి *",
    labelSession: "పూజా సమయం (Session) *",
    radioMorning: "ఉదయం పూజ",
    radioEvening: "సాయంత్రం పూజ",
    approvalNoticeText: "మీ నమోదు సమర్పించిన తర్వాత కమిటీ సభ్యుల పరిశీలన మరియు ఆమోదం పొందిన అనంతరం వెబ్‌సైట్‌లో ప్రదర్శించబడుతుంది.",
    btnCancel: "రద్దు",
    btnSubmitBooking: "పూజా సేవ నమోదు చేయండి",
    successTitle: "శ్రీరస్తు • శుభమస్తు!",
    btnClose: "ధన్యవాదాలు (Close)",
    footerText: "శ్రీ అమ్మవారి బొమ్మ 9 రోజుల ఉత్సవ నిత్య పూజా సేవ • కమిటీ సభ్యులు",
    footerBackLink: "🙏 చందాలు & ఖర్చుల వివరాల పేజీకి వెళ్లండి",
    morningHeader: "🌅 ఉదయం విశేష పూజ (08:00 AM)",
    eveningHeader: "🪔 సాయంత్రం విశేష దీపారాధన & పూజ (06:30 PM)",
    gotramPrefix: "గోత్రం:",
    tokenPrefix: "టోకెన్ #",
    receiptDevoteeName: "భక్తుల పేర్లు:",
    receiptGotram: "గోత్రం:",
    receiptDate: "పూజా తేదీ:",
    receiptTime: "సమయం:",
    receiptPrivacyFootnote: "🔒 భక్తుల రక్షణార్థం మీ ఫోన్ నంబర్ వెబ్‌సైట్‌లో బహిర్గతం చేయబడదు."
  },
  en: {
    poojaPortalTitle: "Sri Ammavaru Daily Pooja Seva Schedule",
    poojaPortalSubtitle: "9 Days Navaratri Morning & Evening Devotee Seva Portal",
    navBackToAccounts: "Donors & Accounts",
    heroBadgeText: "Divine Seva in Sri Ammavaru's Sanctum",
    heroHeading: "Wish to sit for Pooja Seva in Sri Ammavaru Mahotsavam?",
    heroDesc: "Devotees, couples, and families willing to sit in morning or evening pooja can register their details directly here.",
    registerCTA: "Register to Sit in Pooja",
    privacyGuaranteedPill: "Mobile Number Privacy Guaranteed",
    tagApprovedDevotees: "Pooja Sankalpam",
    totalPoojaDevotees: "Total Devotees Sitting",
    verifiedByCommittee: "Approved by Committee Members",
    purityPill: "100% Sacred",
    morningTag: "Morning Pooja (08:00 AM)",
    morningDevoteesLabel: "Morning Devotees",
    morningCardSub: "Special Kumkumarchana & Abhishekam",
    eveningTag: "Evening Pooja (06:30 PM)",
    eveningDevoteesLabel: "Evening Devotees",
    eveningCardSub: "Deeparadhana & Special Harati",
    filterTitle: "Select Date & Pooja Session",
    allSessions: "All Sessions",
    morningSession: "Morning Pooja (8:00 AM)",
    eveningSession: "Evening Pooja (6:30 PM)",
    allDaysLabel: "All Festival Days",
    pillFestiveDays: "9 Festive Days",
    dayLabel: "DAY",
    tithiSuffix: "Tithi",
    devoteesCountSuffix: "Devotees",
    morningColSub: "Kumkumarchana & Abhishekam",
    eveningColSub: "Sahasra Deeparadhana & Harati",
    searchPlaceholder: "Search by devotee name or gotram...",
    searchNoResults: "No devotees found matching this name.",
    noDevoteesMorning: "No devotees registered for morning pooja on this date yet",
    noDevoteesEvening: "No devotees registered for evening pooja on this date yet",
    noDevoteesMatch: "No pooja devotee records found matching your selection",
    modalHeading: "Register to Sit in Pooja Seva",
    modalSubheading: "May Sri Ammavaru bestow divine blessings on your family",
    formPrivacyNotice: "Privacy Guaranteed: Your mobile number is kept strictly confidential for committee members contact only. Only your names and session are displayed on the public website.",
    labelDevoteeNames: "Devotee Names Sitting for Pooja *",
    hintDevoteeNames: "You may enter couple names or family member names",
    placeholderDevoteeNames: "e.g., Venkateswarlu & Lakshmi or your name...",
    labelMobile: "Mobile Number * (For Committee Members Contact)",
    hintMobile: "Committee members will only call for pooja timing and sankalpam coordination",
    placeholderMobile: "10-digit mobile number",
    labelGotram: "Gotram",
    placeholderGotram: "e.g., Kashyapa, Bharadwaja, Kaundinyasa...",
    labelDate: "Select Pooja Date *",
    labelSession: "Pooja Session *",
    radioMorning: "Morning Pooja",
    radioEvening: "Evening Pooja",
    approvalNoticeText: "Note: Your registration will appear on the website once reviewed and approved by committee members.",
    btnCancel: "Cancel",
    btnSubmitBooking: "Submit Pooja Registration",
    successTitle: "Auspicious Blessings • Sri Ammavaru!",
    btnClose: "Close",
    footerText: "Sri Ammavaru 9 Days Festival Pooja Seva • Committee Members",
    footerBackLink: "🙏 Return to Donors & Accounts Page",
    morningHeader: "🌅 Morning Special Pooja (08:00 AM)",
    eveningHeader: "🪔 Evening Deeparadhana & Pooja (06:30 PM)",
    gotramPrefix: "Gotram:",
    tokenPrefix: "Token #",
    receiptDevoteeName: "Devotee Names:",
    receiptGotram: "Gotram:",
    receiptDate: "Pooja Date:",
    receiptTime: "Session:",
    receiptPrivacyFootnote: "🔒 For devotee privacy, phone numbers are never displayed publicly on the website."
  }
};

// Comprehensive Bilingual Transliterator for Devotee Names, Gotrams, and Places
const TRANSLITERATOR = {
  dictEnToTe: {
    'ajay': 'అజయ్', 'vinay': 'వినయ్', 'suresh babu': 'సురేష్ బాబు', 'siddu': 'సిద్ధు', 'siddhu': 'సిద్ధు',
    'ramesh': 'రమేష్', 'suresh': 'సురేష్', 'bobby': 'బాబీ', 'siddhardha': 'సిద్ధార్థ',
    'siddhartha': 'సిద్ధార్థ', 'venkat': 'వెంకట్', 'venkatesh': 'వెంకటేష్', 'raju': 'రాజు',
    'prasad': 'ప్రసాద్', 'satish': 'సతీష్', 'sateesh': 'సతీష్', 'kushwant': 'కుష్వంత్',
    'srinivas': 'శ్రీనివాస్', 'srinivasa': 'శ్రీనివాస', 'rao': 'రావు', 'reddy': 'రెడ్డి',
    'chowdary': 'చౌదరి', 'varma': 'వర్మ', 'kumar': 'కుమార్', 'babu': 'బాబు',
    'baburao': 'బాబురావు', 'nagaraju': 'నాగరాజు', 'ravi': 'రవి', 'kiran': 'కిరణ్',
    'ganesh': 'గణేష్', 'shiva': 'శివ', 'krishna': 'కృష్ణ', 'ramana': 'రమణ',
    'lakshmi': 'లక్ష్మి', 'parvathi': 'పార్వతి', 'ammavaru': 'అమ్మవారు', 'vijay': 'విజయ్',
    'mahesh': 'మహేష్', 'naresh': 'నరేష్', 'anand': 'ఆనంద్', 'mohan': 'మోహన్',
    'chandrasekhar': 'చంద్రశేఖర్', 'subbarao': 'సుబ్బారావు', 'apparao': 'అప్పారావు',
    'kashyapa': 'కాశ్యప', 'bharadwaja': 'భరద్వాజ', 'kaundinyasa': 'కౌండిన్యస',
    'vashishta': 'వశిష్ట', 'harithasa': 'హరితస', 'gowthama': 'గౌతమ', 'kausika': 'కౌశిక',
    'vishwamitra': 'విశ్వామిత్ర', 'atreya': 'ఆత్రేయ', 'agasthya': 'అగస్త్య',
    'gargeya': 'గార్గేయ', 'sandilya': 'శాండిల్య', 'mudgala': 'ముద్గల', 'vatsa': 'వత్స'
  },

  dictTeToEn: {
    'అజయ్': 'Ajay', 'బాబీ': 'Bobby', 'వినయ్': 'Vinay', 'సురేష్ బాబు': 'Suresh Babu', 'సిద్ధు': 'Siddu',
    'రమేష్': 'Ramesh', 'సురేష్': 'Suresh', 'సిద్ధార్థ': 'Siddhardha',
    'వెంకట్': 'Venkat', 'వెంకటేష్': 'Venkatesh', 'రాజు': 'Raju', 'ప్రసాద్': 'Prasad',
    'సతీష్': 'Sateesh', 'కుష్వంత్': 'Kushwant', 'శ్రీనివాస్': 'Srinivas', 'శ్రీనివాస': 'Srinivasa',
    'రావు': 'Rao', 'రెడ్డి': 'Reddy', 'చౌదరి': 'Chowdary', 'వర్మ': 'Varma',
    'కుమార్': 'Kumar', 'బాబు': 'Babu', 'బాబురావు': 'Baburao', 'నాగరాజు': 'Nagaraju',
    'రవి': 'Ravi', 'కిరణ్': 'Kiran', 'గణేష్': 'Ganesh', 'శివ': 'Shiva',
    'కృష్ణ': 'Krishna', 'రమణ': 'Ramana', 'లక్ష్మి': 'Lakshmi', 'పార్వతి': 'Parvathi',
    'అమ్మవారు': 'Ammavaru', 'అమ్మవారి': 'Ammavari',
    'కాశ్యప': 'Kashyapa', 'కాశ్యపస': 'Kashyapasa', 'భరద్వాజ': 'Bharadwaja', 'కౌండిన్యస': 'Kaundinyasa',
    'వశిష్ట': 'Vashishta', 'హరితస': 'Harithasa', 'గౌతమ': 'Gowthama', 'కౌశిక': 'Kausika',
    'విశ్వామిత్ర': 'Vishwamitra', 'ఆత్రేయ': 'Atreya', 'అగస్త్య': 'Agasthya',
    'గార్గేయ': 'Gargeya', 'శాండిల్య': 'Sandilya', 'ముద్గల': 'Mudgala', 'వత్స': 'Vatsa'
  },

  isTelugu(text) {
    if (!text || typeof text !== 'string') return false;
    return /[\u0C00-\u0C7F]/.test(text);
  },

  isEnglish(text) {
    if (!text || typeof text !== 'string') return false;
    return /[a-zA-Z]/.test(text);
  },

  teluguToEnglish(str) {
    if (!str || typeof str !== 'string') return '';
    const trimmed = str.trim();
    if (this.dictTeToEn[trimmed]) return this.dictTeToEn[trimmed];

    const words = str.split(/\s+/);
    return words.map(w => {
      const cleanWord = w.replace(/[^\u0C00-\u0C7F]/g, '');
      const punctBefore = (w.match(/^[^\u0C00-\u0C7F]+/) || [''])[0];
      const punctAfter = (w.match(/[^\u0C00-\u0C7F]+$/) || [''])[0];

      if (!cleanWord) return w;
      if (this.dictTeToEn[cleanWord]) {
        return punctBefore + this.dictTeToEn[cleanWord] + punctAfter;
      }

      const vowels = {
        'అ': 'a', 'ఆ': 'aa', 'ఇ': 'i', 'ఈ': 'ee', 'ఉ': 'u', 'ఊ': 'oo', 'ఋ': 'ru',
        'ఎ': 'e', 'ఏ': 'e', 'ఐ': 'ai', 'ఒ': 'o', 'ఓ': 'o', 'ఔ': 'au', 'అం': 'am'
      };

      const matras = {
        '\u0C3E': 'aa', '\u0C3F': 'i', '\u0C40': 'ee', '\u0C41': 'u', '\u0C42': 'oo',
        '\u0C43': 'ru', '\u0C46': 'e', '\u0C47': 'e', '\u0C48': 'ai', '\u0C4A': 'o',
        '\u0C4B': 'o', '\u0C4C': 'au', '\u0C02': 'm', '\u0C4D': ''
      };

      const consonants = {
        'క': 'k', 'ఖ': 'kh', 'గ': 'g', 'ఘ': 'gh', 'ఙ': 'ng',
        'చ': 'ch', 'ఛ': 'chh', 'జ': 'j', 'ఝ': 'jh', 'ఞ': 'ny',
        'ట': 't', 'ఠ': 'th', 'డ': 'd', 'ఢ': 'dh', 'ణ': 'n',
        'త': 't', 'థ': 'th', 'ద': 'd', 'ధ': 'dh', 'న': 'n',
        'ప': 'p', 'ఫ': 'ph', 'బ': 'b', 'భ': 'bh', 'మ': 'm',
        'య': 'y', 'ర': 'r', 'ల': 'l', 'వ': 'v',
        'శ': 'sh', 'ష': 'sh', 'స': 's', 'హ': 'h', 'ళ': 'l', 'ఱ': 'r'
      };

      let out = '';
      for (let i = 0; i < cleanWord.length; i++) {
        const ch = cleanWord[i];
        const next = cleanWord[i + 1];

        if (vowels[ch]) {
          out += vowels[ch];
        } else if (consonants[ch]) {
          let base = consonants[ch];
          if (next && matras[next] !== undefined) {
            out += base + matras[next];
            i++;
          } else {
            out += base + 'a';
          }
        } else if (matras[ch]) {
          out += matras[ch];
        } else {
          out += ch;
        }
      }

      const capped = out.charAt(0).toUpperCase() + out.slice(1);
      return punctBefore + capped + punctAfter;
    }).join(' ');
  },

  englishToTelugu(str) {
    if (!str || typeof str !== 'string') return '';
    const trimmed = str.trim().toLowerCase();
    if (this.dictEnToTe[trimmed]) return this.dictEnToTe[trimmed];

    const words = str.split(/\s+/);
    return words.map(w => {
      const cleanWord = w.toLowerCase().replace(/[^a-z]/g, '');
      const punctBefore = (w.match(/^[^a-zA-Z]+/) || [''])[0];
      const punctAfter = (w.match(/[^a-zA-Z]+$/) || [''])[0];

      if (!cleanWord) return w;
      if (this.dictEnToTe[cleanWord]) {
        return punctBefore + this.dictEnToTe[cleanWord] + punctAfter;
      }

      const vowels = {
        'aa': 'ా', 'a': '', 'ee': 'ీ', 'ii': 'ీ', 'i': 'ి',
        'oo': 'ూ', 'uu': 'ూ', 'u': 'ు', 'ai': 'ై', 'au': 'ౌ',
        'e': 'ె', 'ea': 'ే', 'o': 'ొ', 'oa': 'ో'
      };

      const standaloneVowels = {
        'aa': 'ఆ', 'a': 'అ', 'ee': 'ఈ', 'ii': 'ఈ', 'i': 'ఇ',
        'oo': 'ఊ', 'uu': 'ఊ', 'u': 'ఉ', 'ai': 'ఐ', 'au': 'ఔ',
        'e': 'ఎ', 'ea': 'ఏ', 'o': 'ఒ', 'oa': 'ఓ'
      };

      const consonants = {
        'kh': 'ఖ', 'gh': 'ఘ', 'ch': 'చ', 'chh': 'ఛ', 'jh': 'ఝ',
        'th': 'థ', 'dh': 'ధ', 'ph': 'ఫ', 'bh': 'భ', 'sh': 'శ',
        'k': 'క', 'g': 'గ', 'c': 'క', 'j': 'జ', 't': 'ట',
        'd': 'డ', 'n': 'న', 'p': 'ప', 'f': 'ఫ', 'b': 'బ',
        'm': 'మ', 'y': 'య', 'r': 'ర', 'l': 'ల', 'v': 'వ',
        'w': 'వ', 's': 'స', 'h': 'హ', 'z': 'జ'
      };

      let result = '';
      let i = 0;

      while (i < cleanWord.length) {
        let twoV = cleanWord.substr(i, 2);
        let oneV = cleanWord[i];
        let twoC = cleanWord.substr(i, 2);
        let oneC = cleanWord[i];

        if (i === 0 && (standaloneVowels[twoV] || standaloneVowels[oneV])) {
          if (standaloneVowels[twoV]) {
            result += standaloneVowels[twoV];
            i += 2;
          } else {
            result += standaloneVowels[oneV];
            i += 1;
          }
        } else if (consonants[twoC] || consonants[oneC]) {
          let c = consonants[twoC] ? consonants[twoC] : consonants[oneC];
          let cLen = consonants[twoC] ? 2 : 1;
          i += cLen;

          let nextTwoV = cleanWord.substr(i, 2);
          let nextOneV = cleanWord[i];

          if (vowels[nextTwoV] !== undefined) {
            result += c + vowels[nextTwoV];
            i += 2;
          } else if (vowels[nextOneV] !== undefined) {
            result += c + vowels[nextOneV];
            i += 1;
          } else {
            result += c;
          }
        } else {
          i++;
        }
      }
      return punctBefore + result + punctAfter;
    }).join(' ');
  },

  format(text, lang) {
    if (!text || typeof text !== 'string') return text || '';
    
    // If text contains dual language like "అజయ్ (Ajay)" or "Ajay (అజయ్)"
    const matchParen = text.match(/^([^(]+)\s*\(([^)]+)\)$/);
    if (matchParen) {
      const part1 = matchParen[1].trim();
      const part2 = matchParen[2].trim();
      if (lang === 'en') {
        text = this.isEnglish(part2) ? part2 : (this.isEnglish(part1) ? part1 : this.teluguToEnglish(part1));
      } else {
        text = this.isTelugu(part1) ? part1 : (this.isTelugu(part2) ? part2 : this.englishToTelugu(part1));
      }
    }

    const trimmed = text.trim();
    if (lang === 'en') {
      if (this.dictTeToEn[trimmed]) return this.dictTeToEn[trimmed];
      if (this.isTelugu(trimmed)) return this.teluguToEnglish(trimmed);
      return trimmed;
    } else {
      if (this.dictEnToTe[trimmed.toLowerCase()]) return this.dictEnToTe[trimmed.toLowerCase()];
      if (this.isEnglish(trimmed) && !this.isTelugu(trimmed)) return this.englishToTelugu(trimmed);
      return trimmed;
    }
  }
};

class AmmavaruPoojaPortal {
  constructor() {
    this.currentLang = localStorage.getItem('ammavaru_website_lang') || 'te';
    this.bookings = [];
    this.selectedDayId = 'all';
    this.selectedSession = 'all';
    this.searchQuery = '';
    this.rtdb = null;

    this.init();
  }

  init() {
    this.applyLanguage();
    this.bindEvents();
    this.renderDatePills();
    this.populateDateSelect();
    this.initFirebase();
    if (window.location.hash === '#register') {
      setTimeout(() => this.openRegistrationModal(), 300);
    }
  }

  // --- Firebase Initialization & Live Synchronization ---
  initFirebase() {
    try {
      if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        this.rtdb = firebase.database();
        this.listenToBookings();
      } else {
        this.fetchDirectHttp();
      }
    } catch (e) {
      console.warn('[PoojaPortal] Firebase SDK fallback to REST:', e);
      this.fetchDirectHttp();
    }
  }

  listenToBookings() {
    if (!this.rtdb) return;

    this.rtdb.ref('poojaBookings').on('value', (snapshot) => {
      const data = snapshot.val();
      this.processBookingsData(data);
    }, (err) => {
      console.warn('[PoojaPortal] RTDB listener error, falling back to REST:', err);
      this.fetchDirectHttp();
    });
  }

  async fetchDirectHttp() {
    try {
      const res = await fetch(`${FIREBASE_CONFIG.databaseURL}/poojaBookings.json`);
      if (res.ok) {
        const data = await res.json();
        this.processBookingsData(data);
      }
    } catch (e) {
      console.error('[PoojaPortal] REST Fetch failed:', e);
      // Fallback to local storage cache if available
      const cached = localStorage.getItem('ammavaru_pooja_cache_v1');
      if (cached) {
        try {
          this.processBookingsData(JSON.parse(cached));
        } catch(err) {}
      }
    }
  }

  processBookingsData(data) {
    if (!data) {
      this.bookings = [];
    } else {
      // Convert object to array
      const allItems = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));

      // Cache raw in localStorage
      localStorage.setItem('ammavaru_pooja_cache_v1', JSON.stringify(data));

      /**
       * CRITICAL PRIVACY & APPROVAL FILTER:
       * 1. Only show bookings approved by admin (status === 'approved')
       * 2. Sanitize and remove phone numbers from public client memory
       */
      this.bookings = allItems
        .filter(item => item.status === 'approved')
        .map(item => ({
          id: item.id,
          devoteeName: item.devoteeName || item.name || '',
          gotram: item.gotram || '',
          date: item.date || '',
          dayId: item.dayId || this.findDayIdByDate(item.date),
          session: item.session || 'morning', // 'morning', 'evening', or 'both'
          sankalpam: item.sankalpam || '',
          createdAt: item.createdAt || 0
          // Notice: item.mobile is INTENTIONALLY NOT mapped to guarantee public privacy!
        }));
    }

    this.render();
  }

  findDayIdByDate(dateStr) {
    if (!dateStr) return 'day-1';
    const matched = FESTIVAL_DAYS.find(d => d.date === dateStr);
    return matched ? matched.id : 'day-1';
  }

  // --- UI Event Binding ---
  bindEvents() {
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.toggleLanguage());
    }

    const searchInput = document.getElementById('devoteeSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = (e.target.value || '').trim().toLowerCase();
        this.renderSchedule();
      });
    }

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeRegistrationModal();
        this.closeSuccessModal();
      }
    });
  }

  // --- Language Management ---
  toggleLanguage() {
    this.currentLang = this.currentLang === 'te' ? 'en' : 'te';
    localStorage.setItem('ammavaru_website_lang', this.currentLang);
    this.applyLanguage();
    this.renderDatePills();
    this.populateDateSelect();
    this.render();
  }

  applyLanguage() {
    const isTe = this.currentLang === 'te';
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.innerText = isTe ? '🌐 English' : '🌐 తెలుగు';
    }

    // Update all data-i18n elements
    const i18nMap = POOJA_I18N[this.currentLang] || POOJA_I18N.te;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18nMap[key]) {
        el.innerText = i18nMap[key];
      }
    });

    const searchInput = document.getElementById('devoteeSearchInput');
    if (searchInput) {
      searchInput.placeholder = i18nMap.searchPlaceholder;
    }

    const regNamesInput = document.getElementById('regDevoteeNames');
    if (regNamesInput && i18nMap.placeholderDevoteeNames) {
      regNamesInput.placeholder = i18nMap.placeholderDevoteeNames;
    }

    const regMobileInput = document.getElementById('regMobile');
    if (regMobileInput && i18nMap.placeholderMobile) {
      regMobileInput.placeholder = i18nMap.placeholderMobile;
    }

    const regGotramInput = document.getElementById('regGotram');
    if (regGotramInput && i18nMap.placeholderGotram) {
      regGotramInput.placeholder = i18nMap.placeholderGotram;
    }
  }

  t(key) {
    const map = POOJA_I18N[this.currentLang] || POOJA_I18N.te;
    return map[key] || key;
  }

  formatText(text) {
    if (!text) return '';
    return TRANSLITERATOR.format(text, this.currentLang);
  }

  // --- Render Date Filter Pills ---
  renderDatePills() {
    const container = document.getElementById('datePillsContainer');
    if (!container) return;

    const isTe = this.currentLang === 'te';
    let html = `
      <button class="date-pill-btn ${this.selectedDayId === 'all' ? 'active' : ''}" 
              onclick="poojaPortal.setDateFilter('all', this)">
        <span class="pill-day-title">${this.t('allDaysLabel')}</span>
        <span class="pill-sub">${this.t('pillFestiveDays')}</span>
      </button>
    `;

    FESTIVAL_DAYS.forEach(day => {
      const isSelected = this.selectedDayId === day.id;
      const title = isTe ? day.teName : day.enName;
      const tithi = isTe ? day.tithiTe : day.tithiEn;
      const formattedDate = this.formatDateDisplay(day.date);

      html += `
        <button class="date-pill-btn ${isSelected ? 'active' : ''}" 
                onclick="poojaPortal.setDateFilter('${day.id}', this)">
          <span class="pill-day-title">${title}</span>
          <span class="pill-sub">📅 ${formattedDate} • ${tithi}</span>
        </button>
      `;
    });

    container.innerHTML = html;
  }

  formatDateDisplay(isoDate) {
    if (!isoDate) return '';
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      const d = parts[2];
      const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(parts[1], 10) - 1];
      return `${d} ${m}`;
    }
    return isoDate;
  }

  populateDateSelect() {
    const select = document.getElementById('regDate');
    if (!select) return;

    const isTe = this.currentLang === 'te';
    let options = '';
    FESTIVAL_DAYS.forEach(day => {
      const name = isTe ? day.teName : day.enName;
      const dateDisplay = this.formatDateDisplay(day.date);
      options += `<option value="${day.date}" data-dayid="${day.id}">${name} (${dateDisplay})</option>`;
    });

    select.innerHTML = options;
  }

  setDateFilter(dayId, btn) {
    this.selectedDayId = dayId;
    document.querySelectorAll('.date-pill-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderSchedule();
  }

  setSessionFilter(session, btn) {
    this.selectedSession = session;
    document.querySelectorAll('.session-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderSchedule();
  }

  // --- Main Render ---
  render() {
    this.renderStats();
    this.renderSchedule();
  }

  renderStats() {
    const totalEl = document.getElementById('statTotalDevotees');
    const morningEl = document.getElementById('statMorningCount');
    const eveningEl = document.getElementById('statEveningCount');

    let morningCount = 0;
    let eveningCount = 0;

    this.bookings.forEach(b => {
      if (b.session === 'morning') morningCount++;
      if (b.session === 'evening') eveningCount++;
    });

    const totalDevotees = this.bookings.length;

    if (totalEl) totalEl.innerText = totalDevotees;
    if (morningEl) morningEl.innerText = morningCount;
    if (eveningEl) eveningEl.innerText = eveningCount;
  }

  renderSchedule() {
    const container = document.getElementById('scheduleContainer');
    if (!container) return;

    const isTe = this.currentLang === 'te';

    // Filter by Day
    let daysToRender = FESTIVAL_DAYS;
    if (this.selectedDayId !== 'all') {
      daysToRender = FESTIVAL_DAYS.filter(d => d.id === this.selectedDayId);
    }

    let hasAnyDevoteesFound = false;
    let html = '';

    daysToRender.forEach(day => {
      // Find all bookings for this day
      let dayBookings = this.bookings.filter(b => {
        const matchesDate = b.date === day.date || b.dayId === day.id;
        if (!matchesDate) return false;

        // Search query filter
        if (this.searchQuery) {
          const nameMatch = b.devoteeName.toLowerCase().includes(this.searchQuery);
          const gotramMatch = (b.gotram || '').toLowerCase().includes(this.searchQuery);
          if (!nameMatch && !gotramMatch) return false;
        }

        return true;
      });

      // Filter by session
      const morningDevotees = dayBookings.filter(b => b.session === 'morning');
      const eveningDevotees = dayBookings.filter(b => b.session === 'evening');

      const shouldShowMorning = this.selectedSession === 'all' || this.selectedSession === 'morning';
      const shouldShowEvening = this.selectedSession === 'all' || this.selectedSession === 'evening';

      const totalDayCount = morningDevotees.length + eveningDevotees.length;
      if (totalDayCount > 0) hasAnyDevoteesFound = true;

      const dayTitle = isTe ? day.teName : day.enName;
      const tithi = isTe ? day.tithiTe : day.tithiEn;
      const dateDisplay = this.formatDateDisplay(day.date);

      html += `
        <div class="day-schedule-card">
          <!-- Day Header -->
          <div class="day-card-header">
            <div class="day-title-group">
              <span class="day-number-pill">${this.t('dayLabel')} ${day.dayNum}</span>
              <div>
                <h3 class="day-heading">${dayTitle}</h3>
                <span class="day-meta">📅 ${dateDisplay} • ${tithi} ${this.t('tithiSuffix')}</span>
              </div>
            </div>
            <div class="day-count-badge">
              <span>👥 ${totalDayCount} ${this.t('devoteesCountSuffix')}</span>
            </div>
          </div>

          <!-- Sessions Grid (Morning & Evening) -->
          <div class="day-sessions-grid">
      `;

      // --- MORNING SESSION COLUMN ---
      if (shouldShowMorning) {
        html += `
          <div class="session-column morning-col">
            <div class="session-col-header morning-header">
              <div class="session-title-wrap">
                <span class="session-icon">🌅</span>
                <div>
                  <h4>${this.t('morningHeader')}</h4>
                  <span class="session-subtitle">${this.t('morningColSub')}</span>
                </div>
              </div>
              <span class="session-badge-count">${morningDevotees.length}</span>
            </div>

            <div class="devotees-list">
              ${morningDevotees.length === 0 ? `
                <div class="empty-session-box">
                  <span>🪔</span>
                  <p>${this.t('noDevoteesMorning')}</p>
                </div>
              ` : morningDevotees.map((devotee, idx) => this.renderDevoteeCard(devotee, idx + 1, 'morning')).join('')}
            </div>
          </div>
        `;
      }

      // --- EVENING SESSION COLUMN ---
      if (shouldShowEvening) {
        html += `
          <div class="session-column evening-col">
            <div class="session-col-header evening-header">
              <div class="session-title-wrap">
                <span class="session-icon">🪔</span>
                <div>
                  <h4>${this.t('eveningHeader')}</h4>
                  <span class="session-subtitle">${this.t('eveningColSub')}</span>
                </div>
              </div>
              <span class="session-badge-count">${eveningDevotees.length}</span>
            </div>

            <div class="devotees-list">
              ${eveningDevotees.length === 0 ? `
                <div class="empty-session-box">
                  <span>✨</span>
                  <p>${this.t('noDevoteesEvening')}</p>
                </div>
              ` : eveningDevotees.map((devotee, idx) => this.renderDevoteeCard(devotee, idx + 1, 'evening')).join('')}
            </div>
          </div>
        `;
      }

      html += `
          </div>
        </div>
      `;
    });

    if (!hasAnyDevoteesFound && this.searchQuery) {
      container.innerHTML = `
        <div class="empty-state-search">
          <span class="empty-icon">🔍</span>
          <h3>${this.t('noDevoteesMatch')}</h3>
          <p>"${this.escapeHtml(this.searchQuery)}" ${this.t('searchNoResults')}</p>
        </div>
      `;
    } else {
      container.innerHTML = html;
    }
  }

  renderDevoteeCard(devotee, tokenNum, sessionType) {
    const displayName = this.formatText(devotee.devoteeName);
    const displayGotram = devotee.gotram ? this.formatText(devotee.gotram) : '';
    const gotramHtml = displayGotram ? `
      <div class="devotee-gotram">
        <span class="gotram-label">${this.t('gotramPrefix')}</span>
        <span class="gotram-value">${this.escapeHtml(displayGotram)}</span>
      </div>
    ` : '';

    return `
      <div class="devotee-card ${sessionType}">
        <div class="devotee-left">
          <div class="devotee-token">#${tokenNum}</div>
          <div class="devotee-info">
            <div class="devotee-name">
              <span>🙏</span>
              <strong>${this.escapeHtml(displayName)}</strong>
            </div>
            ${gotramHtml}
          </div>
        </div>
      </div>
    `;
  }

  // --- Registration Modal Handlers ---
  openRegistrationModal() {
    const backdrop = document.getElementById('registrationModalBackdrop');
    if (backdrop) {
      backdrop.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      // Pre-select date if a specific day was filtered
      if (this.selectedDayId !== 'all') {
        const matched = FESTIVAL_DAYS.find(d => d.id === this.selectedDayId);
        if (matched) {
          const dateSel = document.getElementById('regDate');
          if (dateSel) dateSel.value = matched.date;
        }
      }
      setTimeout(() => {
        const nameInput = document.getElementById('regDevoteeNames');
        if (nameInput) nameInput.focus();
      }, 100);
    }
  }

  closeRegistrationModal() {
    const backdrop = document.getElementById('registrationModalBackdrop');
    if (backdrop) {
      backdrop.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  closeSuccessModal() {
    const backdrop = document.getElementById('successModalBackdrop');
    if (backdrop) {
      backdrop.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // --- Form Submission & Saving to Firebase RTDB ---
  async handleFormSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('regDevoteeNames');
    const mobileInput = document.getElementById('regMobile');
    const gotramInput = document.getElementById('regGotram');
    const dateInput = document.getElementById('regDate');
    const submitBtn = document.getElementById('submitBookingBtn');

    const devoteeName = (nameInput ? nameInput.value : '').trim();
    const mobile = (mobileInput ? mobileInput.value : '').trim();
    const gotram = (gotramInput ? gotramInput.value : '').trim();
    const date = dateInput ? dateInput.value : '';

    // Selected session radio
    const sessionRadio = document.querySelector('input[name="poojaSession"]:checked');
    const session = sessionRadio ? sessionRadio.value : 'morning';

    // Validation
    if (!devoteeName) {
      alert(this.currentLang === 'te' ? 'దయచేసి భక్తుల పేర్లు నమోదు చేయండి.' : 'Please enter devotee name(s).');
      return;
    }

    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
      alert(this.currentLang === 'te' ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!date) {
      alert(this.currentLang === 'te' ? 'దయచేసి పూజా తేదీని ఎంచుకోండి.' : 'Please select a pooja date.');
      return;
    }

    const matchedDay = FESTIVAL_DAYS.find(d => d.date === date);
    const dayId = matchedDay ? matchedDay.id : 'day-1';

    const bookingPayload = {
      devoteeName: devoteeName,
      mobile: mobile,
      gotram: gotram,
      date: date,
      dayId: dayId,
      session: session,
      status: 'pending', // PENDING APPROVAL by admin in mobile app!
      createdAt: Date.now(),
      source: 'website'
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳</span> <span>నమోదు చేయబడుతోంది...</span>`;
    }

    try {
      let saved = false;

      // 1. Try Firebase RTDB SDK
      if (this.rtdb) {
        const newRef = this.rtdb.ref('poojaBookings').push();
        bookingPayload.id = newRef.key;
        await newRef.set(bookingPayload);
        saved = true;
      } else {
        // 2. Direct REST POST to Firebase RTDB
        const res = await fetch(`${FIREBASE_CONFIG.databaseURL}/poojaBookings.json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload)
        });
        if (res.ok) {
          const resData = await res.json();
          if (resData && resData.name) {
            bookingPayload.id = resData.name;
            fetch(`${FIREBASE_CONFIG.databaseURL}/poojaBookings/${resData.name}/id.json`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(resData.name)
            }).catch(() => null);
          }
          saved = true;
        }
      }

      if (saved) {
        this.closeRegistrationModal();
        // Reset form
        e.target.reset();

        // Show auspicious confirmation
        this.showSuccessConfirmation(bookingPayload, matchedDay);
      } else {
        throw new Error('Save response not successful');
      }
    } catch (err) {
      console.error('[PoojaPortal] Save error:', err);
      alert(this.currentLang === 'te' 
        ? 'నమోదు చేయడంలో సమస్య ఏర్పడింది. దయచేసి నెట్‌వర్క్ సరిచూసి మళ్లీ ప్రయత్నించండి.' 
        : 'Error submitting registration. Please check your network and try again.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>🙏</span> <span>${this.t('btnSubmitBooking')}</span>`;
      }
    }
  }

  showSuccessConfirmation(data, matchedDay) {
    const modal = document.getElementById('successModalBackdrop');
    const detailsEl = document.getElementById('successReceiptDetails');
    const msgEl = document.getElementById('successMessageText');

    if (!modal) return;

    const isTe = this.currentLang === 'te';
    const dayTitle = matchedDay ? (isTe ? matchedDay.teName : matchedDay.enName) : data.date;
    const sessionTitle = data.session === 'evening'
      ? (isTe ? 'సాయంత్రం పూజ (06:30 PM)' : 'Evening Pooja (06:30 PM)')
      : (isTe ? 'ఉదయం పూజ (08:00 AM)' : 'Morning Pooja (08:00 AM)');

    if (msgEl) {
      msgEl.innerHTML = isTe ? `
        <strong>నమోదు విజయవంతంగా అందింది!</strong><br/>
        మీ అభ్యర్థన కమిటీ సభ్యుల పరిశీలనకు పంపబడింది. కమిటీ సభ్యులు ఆమోదం తెలిపిన వెంటనే మీ పేర్లు ఇక్కడ వెబ్‌సైట్‌లో ప్రదర్శించబడతాయి.
      ` : `
        <strong>Registration Received Successfully!</strong><br/>
        Your request has been forwarded to committee members. Once approved by committee members, your names will appear on the website.
      `;
    }

    if (detailsEl) {
      detailsEl.innerHTML = `
        <div style="font-size:14px; line-height:1.6; text-align:left; color:#78350f;">
          <div><strong>${this.t('receiptDevoteeName')}</strong> ${this.escapeHtml(this.formatText(data.devoteeName))}</div>
          ${data.gotram ? `<div><strong>${this.t('receiptGotram')}</strong> ${this.escapeHtml(this.formatText(data.gotram))}</div>` : ''}
          <div><strong>${this.t('receiptDate')}</strong> ${dayTitle}</div>
          <div><strong>${this.t('receiptTime')}</strong> ${sessionTitle}</div>
          <div style="margin-top:6px; font-size:11px; color:#be123c;">
            ${this.t('receiptPrivacyFootnote')}
          </div>
        </div>
      `;
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Instantiate on load
let poojaPortal;
document.addEventListener('DOMContentLoaded', () => {
  poojaPortal = new AmmavaruPoojaPortal();
  window.poojaPortal = poojaPortal;
});
