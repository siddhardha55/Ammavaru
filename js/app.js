/**
 * Sri Ganganamma Temple - Standalone Public Website Script
 * Self-contained Firebase RTDB synchronization for GitHub Pages hosting.
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

const I18N = {
  te: {
    siteTitle: "శ్రీ అమ్మవారి 9 రోజుల దేవీ నవరాత్రి మహోత్సవాలు",
    totalCollected: "మొత్తం వసూలైన చందా",
    totalUsed: "ఉత్సవ ఖర్చులు",
    pendingBalance: "మిగిలిన నిల్వ",
    devoteesCount: "మంది భక్తులు సమర్పించారు",
    expensesCount: "ఖర్చుల నమోదులు",
    balanceNote: "ఉత్సవ నిధిలో భద్రంగా ఉంది",
    tabDonors: "🙏 దాతల జాబితా",
    tabExpenses: "📋 ఉత్సవ ఖర్చులు",
    searchPlaceholder: "దాత పేరు, గోత్రం లేదా గ్రామం వెతకండి...",
    sortHighest: "👑 ఎక్కువ చందా",
    sortRecent: "🕒 తాజా చందాలు",
    sortAlpha: "🔤 అ-హ (పేరు ప్రకారం)",
    emptyDonors: "ఎటువంటి దాతల రికార్డులు లేవు",
    emptyExpenses: "ఖర్చుల వివరాలు ఏమీ నమోదు కాలేదు",
    receiptLabel: "రసీదు",
    footerText: "శ్రీ అమ్మవారి బొమ్మ 9 రోజుల ఉత్సవ పారదర్శక నివేదిక • ఉత్సవ కమిటీ",
    updateBadge: "తాజా సమాచారం"
  },
  en: {
    siteTitle: "Sri Ammavaru 9 Days Navaratri Mahotsavam",
    totalCollected: "Total Collected",
    totalUsed: "Festival Expenses",
    pendingBalance: "Remaining Balance",
    devoteesCount: "Devotees Contributed",
    expensesCount: "Expense Entries",
    balanceNote: "Safely held in Festival Fund",
    tabDonors: "🙏 Donors Wall",
    tabExpenses: "📋 Festival Expenses",
    searchPlaceholder: "Search by donor name, gotram, or village...",
    sortHighest: "👑 Highest Amount",
    sortRecent: "🕒 Most Recent",
    sortAlpha: "🔤 A-Z (Alphabetical)",
    emptyDonors: "No donor records found",
    emptyExpenses: "No expense records found",
    receiptLabel: "Receipt",
    footerText: "Sri Ammavaru Festival Transparency Report • Festival Committee",
    updateBadge: "Latest Update"
  }
};

// Comprehensive Bilingual Transliterator for Names, Gotrams, and Places
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
    'main': 'మెయిన్', 'road': 'రోడ్', 'street': 'వీధి', 'center': 'సెంటర్',
    'near': 'దగ్గర', 'bazaar': 'బజార్', 'colony': 'కాలనీ', 'village': 'గ్రామం',
    'kashyapa': 'కాశ్యప', 'bharadwaja': 'భరద్వాజ', 'kaundinyasa': 'కౌండిన్యస',
    'vashishta': 'వశిష్ట', 'harithasa': 'హరితస', 'gowthama': 'గౌతమ', 'kausika': 'కౌశిక',
    'vishwamitra': 'విశ్వామిత్ర', 'atreya': 'ఆత్రేయ', 'agasthya': 'అగస్త్య',
    'gargeya': 'గార్గేయ', 'sandilya': 'శాండిల్య', 'mudgala': 'ముద్గల', 'vatsa': 'వత్స',
    'hyderabad': 'హైదరాబాద్', 'vijayawada': 'విజయవాడ', 'guntur': 'గుంటూరు', 'vizag': 'వైజాగ్'
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
    'అమ్మవారు': 'Ammavaru', 'అమ్మవారి': 'Ammavari', 'దగ్గర': 'Near',
    'కాశ్యప': 'Kashyapa', 'భరద్వాజ': 'Bharadwaja', 'కౌండిన్యస': 'Kaundinyasa',
    'వశిష్ట': 'Vashishta', 'హరితస': 'Harithasa', 'గౌతమ': 'Gowthama', 'కౌశిక': 'Kausika',
    'విశ్వామిత్ర': 'Vishwamitra', 'ఆత్రేయ': 'Atreya', 'అగస్త్య': 'Agasthya',
    'గార్గేయ': 'Gargeya', 'శాండిల్య': 'Sandilya', 'ముద్గల': 'Mudgala', 'వత్స': 'Vatsa',
    'మెయిన్': 'Main', 'రోడ్': 'Road', 'వీధి': 'Street', 'సెంటర్': 'Center',
    'కాలనీ': 'Colony', 'బజార్': 'Bazaar', 'గ్రామం': 'Village', 'పట్టణం': 'Town',
    'గాంధీ నగర్': 'Gandhi Nagar', 'గాంధీనగర్': 'Gandhi Nagar',
    'హైదరాబాద్': 'Hyderabad', 'విజయవాడ': 'Vijayawada', 'గుంటూరు': 'Guntur', 'వైజాగ్': 'Vizag',
    'పూజారి': 'Priest', 'డీజే': 'DJ', 'లైటింగ్': 'Lighting', 'మైక్': 'Mic', 'పందిరి': 'Pandal',
    'జనరేటర్': 'Generator', 'డీజిల్': 'Diesel', 'మంచినీరు': 'Drinking Water', 'బాణసంచా': 'Firecrackers'
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
            result += c + '\u0C4D';
          }
        } else if (standaloneVowels[twoV] || standaloneVowels[oneV]) {
          if (standaloneVowels[twoV]) {
            result += standaloneVowels[twoV];
            i += 2;
          } else {
            result += standaloneVowels[oneV];
            i += 1;
          }
        } else {
          result += cleanWord[i];
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

class AmmavaruWebsite {
  constructor() {
    this.currentLang = 'te';
    this.activeTab = 'donors';
    this.donations = [];
    this.expenses = [];
    this.publicUpdate = null;
    this.searchQuery = '';
    this.currentSort = 'amount-desc';
    this.currentTierFilter = 'all';
    this.rtdb = null;

    this.init();
  }

  init() {
    this.initFirebase();
    this.setupEventListeners();
    this.applyLanguage();
    this.fetchDirectHttp();
  }

  initFirebase() {
    try {
      if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        this.rtdb = firebase.database();
        this.listenToCloud();
      }
    } catch (e) {
      console.warn('[Website] Firebase SDK fallback to direct REST API:', e);
      this.fetchDirectHttp();
    }
  }

  listenToCloud() {
    if (!this.rtdb) return;

    this.rtdb.ref('chandha').on('value', (snapshot) => {
      const data = snapshot.val();
      this.donations = data ? Object.keys(data).map(k => ({ id: k, ...data[k] })) : [];
      this.render();
    });

    this.rtdb.ref('expenses').on('value', (snapshot) => {
      const data = snapshot.val();
      this.expenses = data ? Object.keys(data).map(k => ({ id: k, ...data[k] })) : [];
      this.render();
    });

    this.rtdb.ref('publicUpdate').on('value', (snapshot) => {
      const data = snapshot.val();
      if (data && data.text) {
        this.publicUpdate = data;
        this.renderPublicUpdate();
      }
    });
  }

  // Guaranteed fetch for GitHub Pages
  async fetchDirectHttp() {
    try {
      const [cRes, eRes, pRes] = await Promise.all([
        fetch(`${FIREBASE_CONFIG.databaseURL}/chandha.json`),
        fetch(`${FIREBASE_CONFIG.databaseURL}/expenses.json`),
        fetch(`${FIREBASE_CONFIG.databaseURL}/publicUpdate.json`).catch(() => null)
      ]);

      if (cRes.ok) {
        const cData = await cRes.json();
        if (cData) this.donations = Object.keys(cData).map(k => ({ id: k, ...cData[k] }));
      }
      if (eRes.ok) {
        const eData = await eRes.json();
        if (eData) this.expenses = Object.keys(eData).map(k => ({ id: k, ...eData[k] }));
      }
      if (pRes && pRes.ok) {
        const pData = await pRes.json();
        if (pData && pData.text) {
          this.publicUpdate = pData;
          this.renderPublicUpdate();
        }
      }
      this.render();
    } catch (err) {
      console.warn('[Website] HTTP fetch notice:', err);
    }
  }

  renderPublicUpdate() {
    if (!this.publicUpdate || !this.publicUpdate.text) return;
    const textEl = document.getElementById('publicUpdateText');
    const dateEl = document.getElementById('publicUpdateDate');
    if (textEl) {
      textEl.innerText = this.formatText(this.publicUpdate.text);
    }
    if (dateEl && this.publicUpdate.date) {
      dateEl.innerText = this.publicUpdate.date;
    }
  }

  setupEventListeners() {
    // Language Toggle (Telugu <-> English)
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        this.currentLang = this.currentLang === 'te' ? 'en' : 'te';
        this.applyLanguage();
        this.render();
      });
    }

    // Tabs Switcher
    const tabDonors = document.getElementById('tabDonorsBtn');
    const tabExpenses = document.getElementById('tabExpensesBtn');
    if (tabDonors) {
      tabDonors.addEventListener('click', () => {
        this.activeTab = 'donors';
        this.updateTabsUI();
        this.renderContent();
      });
    }
    if (tabExpenses) {
      tabExpenses.addEventListener('click', () => {
        this.activeTab = 'expenses';
        this.updateTabsUI();
        this.renderContent();
      });
    }

    // Search Input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderContent();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderContent();
      });
    }
  }

  t(key) {
    const dict = I18N[this.currentLang] || I18N['te'];
    return dict[key] || key;
  }

  formatText(text) {
    if (!text) return '';
    return TRANSLITERATOR.format(text, this.currentLang);
  }

  applyLanguage() {
    const isTe = this.currentLang === 'te';
    document.title = isTe ? 'శ్రీ అమ్మవారి 9 రోజుల ఉత్సవ చందాలు | Sri Ammavaru 9 Days Festival Donations' : 'Sri Ammavaru 9 Days Festival Donations | Transparent Report';
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.innerHTML = isTe ? '🌐 English' : '🌐 తెలుగు';
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && this.t(key)) {
        el.innerText = this.t(key);
      }
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.placeholder = this.t('searchPlaceholder');
    }

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.innerHTML = `
        <option value="amount-desc">${this.t('sortHighest')}</option>
        <option value="date-desc">${this.t('sortRecent')}</option>
        <option value="name-asc">${this.t('sortAlpha')}</option>
      `;
      sortSelect.value = this.currentSort;
    }

    this.renderPublicUpdate();
  }

  updateTabsUI() {
    const tabDonors = document.getElementById('tabDonorsBtn');
    const tabExpenses = document.getElementById('tabExpensesBtn');
    if (this.activeTab === 'donors') {
      if (tabDonors) tabDonors.classList.add('active');
      if (tabExpenses) tabExpenses.classList.remove('active');
    } else {
      if (tabDonors) tabDonors.classList.remove('active');
      if (tabExpenses) tabExpenses.classList.add('active');
    }
  }

  animateNumber(el, targetVal) {
    if (!el) return;
    const currentVal = parseInt(el.getAttribute('data-val') || '0', 10);
    if (currentVal === targetVal) {
      el.innerText = `₹${targetVal.toLocaleString('en-IN')}`;
      return;
    }

    const duration = 1000;
    const startTime = performance.now();

    const frame = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(currentVal + (targetVal - currentVal) * ease);
      el.innerText = `₹${val.toLocaleString('en-IN')}`;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.setAttribute('data-val', targetVal.toString());
        el.innerText = `₹${targetVal.toLocaleString('en-IN')}`;
      }
    };
    requestAnimationFrame(frame);
  }

  render() {
    this.renderStats();
    this.renderContent();
  }

  // --- 1. The 3 Financial Stats (Collected, Used, Pending) ---
  renderStats() {
    const totalCollected = this.donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    const totalUsed = this.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const pendingBalance = Math.max(0, totalCollected - totalUsed);

    const elCollected = document.getElementById('statCollected');
    const elUsed = document.getElementById('statUsed');
    const elPending = document.getElementById('statPending');

    this.animateNumber(elCollected, totalCollected);
    this.animateNumber(elUsed, totalUsed);
    this.animateNumber(elPending, pendingBalance);

    const elDonorsCount = document.getElementById('statDonorsCount');
    const elExpensesCount = document.getElementById('statExpensesCount');
    if (elDonorsCount) elDonorsCount.innerText = `${this.donations.length} ${this.t('devoteesCount')}`;
    if (elExpensesCount) elExpensesCount.innerText = `${this.expenses.length} ${this.t('expensesCount')}`;

    // Progress Bar
    const fillUsed = document.getElementById('fillUsed');
    const fillPending = document.getElementById('fillPending');
    if (totalCollected > 0 && fillUsed && fillPending) {
      const usedPct = Math.min(100, Math.round((totalUsed / totalCollected) * 100));
      const pendingPct = 100 - usedPct;
      fillUsed.style.width = `${usedPct}%`;
      fillPending.style.width = `${pendingPct}%`;
    }

    // Badges on tabs
    const donorsBadge = document.getElementById('donorsBadgeCount');
    const expensesBadge = document.getElementById('expensesBadgeCount');
    if (donorsBadge) donorsBadge.innerText = this.donations.length;
    if (expensesBadge) expensesBadge.innerText = this.expenses.length;
  }

  // --- 2. Main Content View ---
  renderContent() {
    const donorsWrap = document.getElementById('donorsSection');
    const expensesWrap = document.getElementById('expensesSection');

    if (this.activeTab === 'donors') {
      if (donorsWrap) donorsWrap.style.display = 'block';
      if (expensesWrap) expensesWrap.style.display = 'none';
      this.renderDonorsWall();
    } else {
      if (donorsWrap) donorsWrap.style.display = 'none';
      if (expensesWrap) expensesWrap.style.display = 'block';
      this.renderExpensesList();
    }
  }

  getDonorTier(amount) {
    const amt = Number(amount) || 0;
    const isTe = this.currentLang === 'te';
    if (amt >= 10000) {
      return {
        id: 'diamond',
        title: isTe ? 'మహా దాత' : 'Grand Benefactor',
        icon: '👑',
        badge: isTe ? '👑 మహా దాత (₹10K+)' : '👑 Grand Benefactor (₹10K+)',
        cssClass: 'tier-diamond'
      };
    }
    if (amt >= 5000) {
      return {
        id: 'platinum',
        title: isTe ? 'విశిష్ట దాత' : 'Distinguished Patron',
        icon: '💎',
        badge: isTe ? '💎 విశిష్ట దాత (₹5K-₹10K)' : '💎 Distinguished Patron (₹5K-₹10K)',
        cssClass: 'tier-platinum'
      };
    }
    if (amt >= 2000) {
      return {
        id: 'gold',
        title: isTe ? 'స్వర్ణ దాత' : 'Gold Benefactor',
        icon: '🥇',
        badge: isTe ? '🥇 స్వర్ణ దాత (₹2K-₹5K)' : '🥇 Gold Benefactor (₹2K-₹5K)',
        cssClass: 'tier-gold'
      };
    }
    if (amt >= 1000) {
      return {
        id: 'silver',
        title: isTe ? 'రజత దాత' : 'Silver Benefactor',
        icon: '🥈',
        badge: isTe ? '🥈 రజత దాత (₹1K-₹2K)' : '🥈 Silver Benefactor (₹1K-₹2K)',
        cssClass: 'tier-silver'
      };
    }
    return {
      id: 'devotee',
      title: isTe ? 'భక్తి దాత' : 'Devotee Contributor',
      icon: '🌸',
      badge: isTe ? '🌸 భక్తి దాత (< ₹1K)' : '🌸 Devotee Contributor (< ₹1K)',
      cssClass: 'tier-devotee'
    };
  }

  // Render Top 3 Benefactors on the Grand Royal Podium
  renderTopPodium() {
    const podiumCont = document.getElementById('podiumContainer');
    const podiumStage = document.getElementById('podiumStage');
    if (!podiumCont || !podiumStage) return;

    if (this.donations.length < 2 || this.searchQuery || (this.currentTierFilter && this.currentTierFilter !== 'all')) {
      podiumCont.style.display = 'none';
      return;
    }

    podiumCont.style.display = 'block';

    // Sort descending by amount to get top 3
    const sorted = [...this.donations].sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0));
    const rank1 = sorted[0];
    const rank2 = sorted[1];
    const rank3 = sorted[2] || null;

    const renderPillar = (item, rank, rankClass) => {
      if (!item) return '';
      const displayName = this.formatText(item.donorName);
      const displayVillage = item.village ? this.formatText(item.village) : (item.gotram ? this.formatText(item.gotram) : '');
      const amt = Number(item.amount) || 0;
      const initial = (displayName || '').trim().charAt(0).toUpperCase() || '👤';

      const avatarContent = item.photoUrl
        ? `<img src="${item.photoUrl}" alt="${displayName}" loading="lazy" />`
        : `<div class="avatar-fallback">${initial}</div>`;

      const crownHtml = rank === 1 ? `<span class="podium-crown-icon">👑</span>` : '';
      const rankBadgeMedal = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : '🥉');

      return `
        <div class="podium-pillar ${rankClass}">
          <div class="podium-avatar-wrap">
            ${crownHtml}
            <div class="podium-avatar">
              ${avatarContent}
            </div>
            <div class="podium-rank-badge">${rankBadgeMedal}</div>
          </div>
          <div class="podium-donor-info">
            <div class="podium-donor-name" title="${displayName}">${displayName}</div>
            ${displayVillage ? `<div class="podium-donor-meta">${displayVillage}</div>` : ''}
            <div class="podium-amount-tag">₹${amt.toLocaleString('en-IN')}/-</div>
          </div>
          <div class="podium-block">
            <div class="podium-pedestal-rank">#${rank}</div>
          </div>
        </div>
      `;
    };

    let stageHtml = '';
    // Display order: Rank 2 (Left), Rank 1 (Center Champion), Rank 3 (Right)
    if (rank2) stageHtml += renderPillar(rank2, 2, 'pillar-rank-2');
    if (rank1) stageHtml += renderPillar(rank1, 1, 'pillar-rank-1');
    if (rank3) stageHtml += renderPillar(rank3, 3, 'pillar-rank-3');

    podiumStage.innerHTML = stageHtml;
  }

  // Render Donors Wall with luxury Devotee VIP ID Cards and dynamic bilingual transliteration
  renderDonorsWall() {
    const grid = document.getElementById('donorsWallGrid');
    if (!grid) return;

    let list = [...this.donations];

    // Filter by search query (matches original, English transliterated, and Telugu names)
    if (this.searchQuery) {
      list = list.filter(item => {
        const nameRaw = (item.donorName || '').toLowerCase();
        const nameFmt = this.formatText(item.donorName).toLowerCase();
        const gotramRaw = (item.gotram || '').toLowerCase();
        const gotramFmt = this.formatText(item.gotram).toLowerCase();
        const villageRaw = (item.village || '').toLowerCase();
        const villageFmt = this.formatText(item.village).toLowerCase();
        const receipt = (item.receiptNo || '').toLowerCase();
        return nameRaw.includes(this.searchQuery) ||
          nameFmt.includes(this.searchQuery) ||
          gotramRaw.includes(this.searchQuery) ||
          gotramFmt.includes(this.searchQuery) ||
          villageRaw.includes(this.searchQuery) ||
          villageFmt.includes(this.searchQuery) ||
          receipt.includes(this.searchQuery);
      });
    }

    // Sort
    if (this.currentSort === 'amount-desc') {
      list.sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0));
    } else if (this.currentSort === 'date-desc') {
      list.sort((a, b) => new Date(b.date || b.timestamp || 0) - new Date(a.date || a.timestamp || 0));
    } else if (this.currentSort === 'name-asc') {
      list.sort((a, b) => (this.formatText(a.donorName) || '').localeCompare(this.formatText(b.donorName) || ''));
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="empty-data-state" style="grid-column: 1 / -1;">
          <div style="font-size: 46px; margin-bottom: 8px; color: var(--gold-vivid);">🪪</div>
          <div class="empty-state-title">${this.t('emptyDonors')}</div>
          <div class="empty-state-desc">${this.searchQuery ? (this.currentLang === 'te' ? 'వేరే పేరుతో వెతికి ప్రయత్నించండి.' : 'Try searching with another name or receipt number.') : (this.currentLang === 'te' ? 'చందాలు నమోదు అయిన వెంటనే ఇక్కడ భక్త ఐడీ కార్డులు కనిపిస్తాయి.' : 'Donations will appear here as Devotee ID Cards once recorded.')}</div>
        </div>
      `;
      return;
    }

    const isTe = this.currentLang === 'te';

    grid.innerHTML = list.map((item, idx) => {
      const displayName = this.formatText(item.donorName);
      const amt = Number(item.amount) || 0;
      const receiptNo = item.receiptNo ? `#${item.receiptNo}` : `#${String(idx + 1).padStart(3, '0')}`;

      // Circular devotee portrait if uploaded, otherwise glowing golden monogram avatar
      let photoHtml = '';
      if (item.photoUrl) {
        photoHtml = `<img class="glass-avatar-img" src="${item.photoUrl}" alt="${displayName}" loading="lazy" />`;
      } else {
        const initial = (displayName || '').trim().charAt(0).toUpperCase() || '🌸';
        photoHtml = `
          <div class="glass-avatar-monogram">
            <span class="monogram-initial">${initial}</span>
            <span class="monogram-om">🕉️</span>
          </div>
        `;
      }

      return `
        <article class="modern-luxury-card" data-card-id="${item.id || idx}">
          <!-- Top Card Meta Bar -->
          <div class="luxury-card-meta">
            <span class="luxury-receipt-chip">${receiptNo}</span>
            <div class="luxury-verified-badge">
              <span class="verified-dot"></span>
              <span>${isTe ? 'ధన్యవాదములు' : 'WITH GRATITUDE'}</span>
            </div>
          </div>

          <!-- Centered Glowing Golden Circular Avatar -->
          <div class="luxury-avatar-wrapper">
            <div class="luxury-avatar-ring">
              ${photoHtml}
            </div>
          </div>

          <!-- Devotee Name & Sacred Honor Subtitle -->
          <div class="luxury-name-box">
            <h3 class="luxury-donor-name" title="${displayName}">${displayName}</h3>
            <div class="luxury-sacred-subtitle">
              <span>${isTe ? '॥ శ్రీ అమ్మవారి దివ్య ఆశీస్సులు ॥' : 'DIVINE BLESSINGS'}</span>
            </div>
          </div>

          <!-- Sleek Gold-Embossed Donation Pill -->
          <div class="luxury-donation-pill">
            <div class="donation-pill-header">
              <span class="donation-coin">🪙</span>
              <span class="donation-pill-label">${isTe ? 'భక్తి చందా సమర్పణ' : 'DEVOTIONAL CHANDHA'}</span>
            </div>
            <div class="donation-pill-amount">
              ₹${amt.toLocaleString('en-IN')}/-
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Render itemized festival expenses list
  renderExpensesList() {
    const listEl = document.getElementById('expensesListWrap');
    if (!listEl) return;

    let list = [...this.expenses];

    if (this.searchQuery) {
      list = list.filter(item => {
        const descRaw = (item.description || '').toLowerCase();
        const descFmt = this.formatText(item.description).toLowerCase();
        const catRaw = (item.category || '').toLowerCase();
        const catFmt = this.formatText(item.category).toLowerCase();
        const paidToRaw = (item.paidTo || '').toLowerCase();
        const paidToFmt = this.formatText(item.paidTo).toLowerCase();
        return descRaw.includes(this.searchQuery) ||
          descFmt.includes(this.searchQuery) ||
          catRaw.includes(this.searchQuery) ||
          catFmt.includes(this.searchQuery) ||
          paidToRaw.includes(this.searchQuery) ||
          paidToFmt.includes(this.searchQuery);
      });
    }

    list.sort((a, b) => new Date(b.date || b.timestamp || 0) - new Date(a.date || a.timestamp || 0));

    if (list.length === 0) {
      listEl.innerHTML = `
        <div class="empty-data-state">
          <div style="font-size: 48px; margin-bottom: 8px;">📋</div>
          <div class="empty-state-title">${this.t('emptyExpenses')}</div>
          <div class="empty-state-desc">${this.currentLang === 'te' ? 'ఉత్సవ ఖర్చులు నమోదు అయిన వెంటనే పారదర్శకంగా ఇక్కడ ప్రదర్శించబడతాయి.' : 'Festival expenses will be transparently displayed here once recorded.'}</div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = list.map(item => {
      const desc = this.formatText(item.description || item.category || (this.currentLang === 'te' ? 'ఉత్సవ ఖర్చు' : 'Festival Expense'));
      const paidTo = item.paidTo ? this.formatText(item.paidTo) : '';

      return `
        <div class="expense-card-item">
          <div>
            <div class="expense-desc-text">${desc}</div>
            <div class="expense-sub-text">
              ${paidTo ? `<span>${this.currentLang === 'te' ? 'చెల్లింపు:' : 'Paid to:'} <strong>${paidTo}</strong></span>` : ''}
              ${item.date ? `<span>📅 ${item.date}</span>` : ''}
            </div>
          </div>
          <div class="expense-num-tag">₹${Number(item.amount).toLocaleString('en-IN')}</div>
        </div>
      `;
    }).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ammavaruWebsite = new AmmavaruWebsite();
});
