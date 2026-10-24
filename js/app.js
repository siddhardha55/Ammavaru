/**
 * Sri Kanakadurgamma Temple - Standalone Public Website Script
 * Devi Navaratri Festival Transparency Portal:
 * 1. Chandalu (50 Donors: ₹95,255 - Includes Siddhardha ₹29,424 & Ajay ₹29,424 at top of list)
 * 2. Patalu & Auctions (Sarees, Laddu, Cash: ₹35,900 - Includes Nagidi Krishna ₹5,200, Suresh Babu Saree Bids)
 * 3. Adapaduchula Bhojanalu (27 Women: ₹15,700)
 * 4. Expenses (56 Items: ₹1,52,058)
 * 5. Full Audited Financial Report (Balance Cleared to ₹0)
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

// Pre-compiled verified datasets
const DATA_CHANDALU = [
  {
    "id": "ch_siddhardha",
    "sno": 49,
    "donorName": "ఓడుగు సిద్ధార్థ గారు (Odugu Siddhardha)",
    "amount": 29424,
    "category": "భక్తి చందా (మహా దాత)",
    "categoryKey": "chandalu",
    "receiptNo": "AC-501",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-21",
    "isTopSponsor": true
  },
  {
    "id": "ch_ajay",
    "sno": 50,
    "donorName": "నడకుదుటి అజయ్ గారు (Nadakuduti Ajay)",
    "amount": 29424,
    "category": "భక్తి చందా (మహా దాత)",
    "categoryKey": "chandalu",
    "receiptNo": "AC-502",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-21",
    "isTopSponsor": true
  },
  {
    "id": "ch_1",
    "sno": 1,
    "donorName": "వల్లభనేని నాంచారయ్య గారు",
    "amount": 1116,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-101",
    "photoUrl": "data:image/jpeg;base64,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",
    "gotram": "రఘకుల (Raghakula)",
    "village": "రామాలయం దగ్గర (Raamaalaym Near)",
    "date": "2026-10-12"
  },
  {
    "id": "ch_2",
    "sno": 2,
    "donorName": "వల్లభనేని ఫకీర్ గారు",
    "amount": 200,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-102",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_3",
    "sno": 3,
    "donorName": "వల్లభనేని లక్ష్మీ గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-105",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_4",
    "sno": 4,
    "donorName": "వల్లభనేని తిరుపతమ్మ గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-104",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_5",
    "sno": 5,
    "donorName": "వల్లభనేని ప్రసాద్ గారు",
    "amount": 300,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-105",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_6",
    "sno": 6,
    "donorName": "వల్లభనేని వెంకటేశ్వరరావు గారు",
    "amount": 1000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-106",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_7",
    "sno": 7,
    "donorName": "వల్లభనేని అనసూయమ్మ గారు",
    "amount": 200,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-136",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_8",
    "sno": 8,
    "donorName": "వల్లభనేని నాగరాజు గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-108",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_9",
    "sno": 9,
    "donorName": "బొమ్మిడి సాంబయ్య గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-130",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_10",
    "sno": 10,
    "donorName": "బొమ్మిడి గోపి రాజు గారు",
    "amount": 2000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-110",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_11",
    "sno": 11,
    "donorName": "వల్లభనేని బాపన రావు గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-111",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_12",
    "sno": 12,
    "donorName": "బొమ్మిడి శ్రీకాంత్ గారు",
    "amount": 2000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-112",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_13",
    "sno": 13,
    "donorName": "బొమ్మిడి వీరలక్ష్మి గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-113",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_14",
    "sno": 14,
    "donorName": "వల్లభనేని జనార్దన్ రావు గారు",
    "amount": 1000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-114",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_15",
    "sno": 15,
    "donorName": "వల్లభనేని వీరాంజనేయులు గారు",
    "amount": 2000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-115",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_16",
    "sno": 16,
    "donorName": "కొక్కిలిగడ్డ వెంకటేశ్వరరావు గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-131",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_17",
    "sno": 17,
    "donorName": "కొక్కిలిగడ్డ బిక్షాలు గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-117",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_18",
    "sno": 18,
    "donorName": "ఓడుగు వెంకటేశ్వరరావు గారు",
    "amount": 1000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-121",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_19",
    "sno": 19,
    "donorName": "ఓడుగు లక్ష్మి గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-119",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_20",
    "sno": 20,
    "donorName": "వల్లభనేని ఏసు గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-133",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_21",
    "sno": 21,
    "donorName": "నడకుదుటి చినబాబు రావు గారు",
    "amount": 1500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-121",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_22",
    "sno": 22,
    "donorName": "ఓడుగు నాగార్జున గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-122",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_23",
    "sno": 23,
    "donorName": "ఓడుగు రాఘవులు గారు",
    "amount": 511,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-122",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_24",
    "sno": 24,
    "donorName": "నడకుదుటి శివయ్య గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-123",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_25",
    "sno": 25,
    "donorName": "ఓడుగు వెంకటేశ్వరరావు గారు",
    "amount": 1000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-121",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_26",
    "sno": 26,
    "donorName": "ఓడుగు లక్ష్మి గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-126",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_27",
    "sno": 27,
    "donorName": "నడకుదుటి పెదబాబు రావు గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-127",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_28",
    "sno": 28,
    "donorName": "ఓడుగు బాలకృష్ణ గారు",
    "amount": 1116,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-113",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_29",
    "sno": 29,
    "donorName": "నాగిడి వెంకటేశ్వరరావు గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-124",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_30",
    "sno": 30,
    "donorName": "వల్లభనేని వెంకటేశ్వర (బక్కయ్య) గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-130",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_31",
    "sno": 31,
    "donorName": "బొమ్మిడి నరసింహారావు గారు",
    "amount": 1116,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-131",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_32",
    "sno": 32,
    "donorName": "బొమ్మిడి సురేష్ (నాని) గారు",
    "amount": 1000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-132",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_33",
    "sno": 33,
    "donorName": "కొక్కిలిగడ్డ కన్నమ్మ గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-133",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_34",
    "sno": 34,
    "donorName": "ఓడుగు శివప్రసాద్ గారు",
    "amount": 1116,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-134",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_35",
    "sno": 35,
    "donorName": "చింత దుర్గాప్రసాద్ గారు",
    "amount": 1000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-135",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_36",
    "sno": 36,
    "donorName": "ఓడుగు సుజాత గారు",
    "amount": 1116,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-107",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_37",
    "sno": 37,
    "donorName": "గరికపాటి సుబ్బారావు గారు",
    "amount": 1000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-137",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_38",
    "sno": 38,
    "donorName": "నడకుదుటి వెంకట సుబ్బారావు గారు",
    "amount": 400,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-115",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_39",
    "sno": 39,
    "donorName": "నడకుదుటి శివ నాగరావు గారు",
    "amount": 200,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-139",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_40",
    "sno": 40,
    "donorName": "లంకె చంటి గారు",
    "amount": 300,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-125",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_41",
    "sno": 41,
    "donorName": "నడకుదుటి రాంబాబు గారు",
    "amount": 1116,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-126",
    "photoUrl": "",
    "gotram": "రఘకుల (Raghakula)",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_42",
    "sno": 42,
    "donorName": "గరికిపాటి శ్రీనివాస రావు గారు",
    "amount": 1000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-142",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_43",
    "sno": 43,
    "donorName": "Ch. అంకినీడు గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-143",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_44",
    "sno": 44,
    "donorName": "V. దుర్గ నాగేశ్వరరావు గారు (కోడూరు)",
    "amount": 1000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-144",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_45",
    "sno": 45,
    "donorName": "కొక్కిలిగడ్డ బాలయ్య గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-145",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_46",
    "sno": 46,
    "donorName": "గరికిపాటి నాగేశ్వరావు గారు",
    "amount": 500,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-146",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_47",
    "sno": 47,
    "donorName": "లక్ష్మీ గారు",
    "amount": 100,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-147",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  },
  {
    "id": "ch_48",
    "sno": 48,
    "donorName": "నడకుదుటి వనజ గారు (మోపిదేవి)",
    "amount": 1000,
    "category": "భక్తి చందాలు",
    "categoryKey": "chandalu",
    "receiptNo": "AC-148",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-12"
  }
];
const DATA_PATALU = [
  {
    "id": "saree_1",
    "sno": 1,
    "donorName": "వల్లభనేని సురేష్ బాబు గారు",
    "amount": 700,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-01",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_2",
    "sno": 2,
    "donorName": "చింతా దుర్గాప్రసాద్ గారు",
    "amount": 700,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-02",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_3",
    "sno": 3,
    "donorName": "నడకుదుటి అజయ్ గారు",
    "amount": 900,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-03",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_4",
    "sno": 4,
    "donorName": "వల్లభనేని వంశీ గారు",
    "amount": 800,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-04",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_5",
    "sno": 5,
    "donorName": "బొమ్మిడి అంకినీడు గారు",
    "amount": 800,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-05",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_6",
    "sno": 6,
    "donorName": "వల్లభనేని సురేష్ బాబు గారు",
    "amount": 1300,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-06",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_7",
    "sno": 7,
    "donorName": "చింత దుర్గాప్రసాద్ గారు",
    "amount": 500,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-07",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_8",
    "sno": 8,
    "donorName": "వల్లభనేని సురేష్ బాబు గారు",
    "amount": 500,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-08",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_9",
    "sno": 9,
    "donorName": "వల్లభనేని మోహింద్ర గారు",
    "amount": 900,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-09",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_10",
    "sno": 10,
    "donorName": "నడకుదుటి అజయ్ గారు",
    "amount": 900,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-10",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_11",
    "sno": 11,
    "donorName": "వల్లభనేని సురేష్ బాబు గారు",
    "amount": 700,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-11",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_12",
    "sno": 12,
    "donorName": "విశ్వనాథపల్లి సుధీర్ గారు",
    "amount": 900,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-12",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_13",
    "sno": 13,
    "donorName": "తీన్మార్ గారు",
    "amount": 1400,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-13",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_14",
    "sno": 14,
    "donorName": "నడకుదుటి చినబాబురావు గారు",
    "amount": 600,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-14",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_15",
    "sno": 15,
    "donorName": "ప్రేమ్ కుమార్ గారు",
    "amount": 700,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-15",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_16",
    "sno": 16,
    "donorName": "తీన్మార్ గారు",
    "amount": 1500,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-16",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_17",
    "sno": 17,
    "donorName": "ప్రేమ్ కుమార్ గారు",
    "amount": 1300,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-17",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_18",
    "sno": 18,
    "donorName": "నడకుదుటి చినబాబురావు గారు",
    "amount": 600,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-18",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_19",
    "sno": 19,
    "donorName": "తాత నాగబాబు గారు",
    "amount": 1000,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-19",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_20",
    "sno": 20,
    "donorName": "నడకుదుటి చినబాబురావు గారు",
    "amount": 600,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-20",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "saree_21",
    "sno": 21,
    "donorName": "తీన్మార్ గారు (జాకెట్ ముక్కలు)",
    "amount": 100,
    "category": "చీరల పాటలు (వేలం)",
    "categoryKey": "cheeralu",
    "receiptNo": "SR-21",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-18"
  },
  {
    "id": "laddu_1",
    "sno": 1,
    "donorName": "వల్లభనేని యశ్వంత్ గారు",
    "amount": 4000,
    "category": "లడ్డూ ప్రసాదం వేలం",
    "categoryKey": "laddu",
    "receiptNo": "LD-01",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-20"
  },
  {
    "id": "dabbu_1",
    "sno": 1,
    "donorName": "నడకుదుటి విమల గారు",
    "amount": 1300,
    "category": "నగదు విరాళాలు (పాటలు)",
    "categoryKey": "dabbu",
    "receiptNo": "DB-01",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-20"
  },
  {
    "id": "dabbu_2",
    "sno": 2,
    "donorName": "ఓడుగు సుజాత గారు",
    "amount": 2900,
    "category": "నగదు విరాళాలు (పాటలు)",
    "categoryKey": "dabbu",
    "receiptNo": "DB-02",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-20"
  },
  {
    "id": "dabbu_3",
    "sno": 3,
    "donorName": "నడకుదుటి అజయ్ గారు",
    "amount": 5100,
    "category": "నగదు విరాళాలు (పాటలు)",
    "categoryKey": "dabbu",
    "receiptNo": "DB-03",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-20"
  },
  {
    "id": "dabbu_4",
    "sno": 4,
    "donorName": "నాగిడి కృష్ణ గారు",
    "amount": 5200,
    "category": "నగదు విరాళాలు (పాటలు)",
    "categoryKey": "dabbu",
    "receiptNo": "DB-04",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-20"
  }
];
const DATA_ADAPADUCHULU = [
  {
    "id": "adapaduchu_1",
    "sno": 1,
    "donorName": "వల్లభనేని అంక వేణి గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-01",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_2",
    "sno": 2,
    "donorName": "నడకుదుటి శివకుమారి గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-02",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_3",
    "sno": 3,
    "donorName": "ఓడుగు సుజాత గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-03",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_4",
    "sno": 4,
    "donorName": "బొమ్మిడి పసి గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-04",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_5",
    "sno": 5,
    "donorName": "బొమ్మిడి బుడ్డి గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-05",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_6",
    "sno": 6,
    "donorName": "ఓడుగు లక్ష్మి గారు",
    "amount": 1000,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-06",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_7",
    "sno": 7,
    "donorName": "పనమాల తిరుపతమ్మ గారు",
    "amount": 1000,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-07",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_8",
    "sno": 8,
    "donorName": "నడకుదుటి సుధారాణి గారు",
    "amount": 1000,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-08",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_9",
    "sno": 9,
    "donorName": "ఇందిక గారు",
    "amount": 300,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-09",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_10",
    "sno": 10,
    "donorName": "ఓడుగు సాంబ గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-10",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_11",
    "sno": 11,
    "donorName": "అరుణ, సరిత గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-11",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_12",
    "sno": 12,
    "donorName": "అమ్ములు గారు",
    "amount": 300,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-12",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_13",
    "sno": 13,
    "donorName": "ఓడుగు వరలక్ష్మి గారు",
    "amount": 1000,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-13",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_14",
    "sno": 14,
    "donorName": "ఓడుగు భాగ్యవతి గారు",
    "amount": 1000,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-14",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_15",
    "sno": 15,
    "donorName": "నాగమల్లేశ్వరి గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-15",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_16",
    "sno": 16,
    "donorName": "నడకుదుటి నాగేశ్వరమ్మ గారు",
    "amount": 200,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-16",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_17",
    "sno": 17,
    "donorName": "ఓడుగు వెంకటేశ్వరమ్మ గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-17",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_18",
    "sno": 18,
    "donorName": "T. మనీ మాత గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-18",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_19",
    "sno": 19,
    "donorName": "K. వైష్ణవి గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-19",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_20",
    "sno": 20,
    "donorName": "A. తేనిక గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-20",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_21",
    "sno": 21,
    "donorName": "నాగిడి రేవతి గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-21",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_22",
    "sno": 22,
    "donorName": "విశ్వనాథపల్లి రజిని గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-22",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_23",
    "sno": 23,
    "donorName": "వల్లభనేని పార్వతి గారు",
    "amount": 200,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-23",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_24",
    "sno": 24,
    "donorName": "చింత నాగలక్ష్మి గారు",
    "amount": 500,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-24",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_25",
    "sno": 25,
    "donorName": "ఓడుగు జ్యోతి గారు",
    "amount": 1000,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-25",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_26",
    "sno": 26,
    "donorName": "K. శిరీష గారు",
    "amount": 200,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-26",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  },
  {
    "id": "adapaduchu_27",
    "sno": 27,
    "donorName": "ఓడుగు బుజ్జి గారు",
    "amount": 1000,
    "category": "ఆడపడుచుల భోజనాలు",
    "categoryKey": "adapaduchulu",
    "receiptNo": "AP-27",
    "photoUrl": "",
    "gotram": "",
    "village": "",
    "date": "2026-10-17"
  }
];
const DATA_EXPENSES = [
  {
    "id": "exp_1",
    "sno": 1,
    "description": "డెకరేషన్ క్లాత్",
    "amount": 1500,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_2",
    "sno": 2,
    "description": "డెకరేషన్‌కు లైట్లు",
    "amount": 1750,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_3",
    "sno": 3,
    "description": "డెకరేషన్ ఫ్లవర్స్",
    "amount": 1200,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_4",
    "sno": 4,
    "description": "వరద",
    "amount": 250,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_5",
    "sno": 5,
    "description": "డెకరేషన్‌కు వాడిన తాళ్లు",
    "amount": 100,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_6",
    "sno": 6,
    "description": "డెకరేషన్‌కు వాడిన వాసాలు",
    "amount": 500,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_7",
    "sno": 7,
    "description": "D.J. ఫిటింగ్ ఇన్‌చార్జ్",
    "amount": 200,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_8",
    "sno": 8,
    "description": "వాటర్ గ్లాసులు",
    "amount": 60,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_9",
    "sno": 9,
    "description": "సాంబ్రాణి",
    "amount": 100,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_10",
    "sno": 10,
    "description": "పూలదండలు",
    "amount": 250,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_11",
    "sno": 11,
    "description": "బుక్స్, పెన్నులు",
    "amount": 1000,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_12",
    "sno": 12,
    "description": "వాటర్ గ్లాసులు",
    "amount": 55,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_13",
    "sno": 13,
    "description": "పూలదండలు, విడిపూలు",
    "amount": 560,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_14",
    "sno": 14,
    "description": "డెకరేషన్ పిన్నులు",
    "amount": 100,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_15",
    "sno": 15,
    "description": "లంగా బందు",
    "amount": 50,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_16",
    "sno": 16,
    "description": "పాల ప్యాకెట్",
    "amount": 115,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_17",
    "sno": 17,
    "description": "లడ్డు",
    "amount": 1300,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_18",
    "sno": 18,
    "description": "బంతిపూల డెకరేషన్",
    "amount": 300,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_19",
    "sno": 19,
    "description": "చీరలు",
    "amount": 10800,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_20",
    "sno": 20,
    "description": "గాజులు",
    "amount": 1970,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_21",
    "sno": 21,
    "description": "కవర్లు",
    "amount": 180,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_22",
    "sno": 22,
    "description": "తీన్మార్",
    "amount": 30500,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_23",
    "sno": 23,
    "description": "టీ పొడి, టీ గ్లాసులు",
    "amount": 156,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_24",
    "sno": 24,
    "description": "దోమలు కట్టెలు, వత్తుల ప్యాకెట్",
    "amount": 140,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_25",
    "sno": 25,
    "description": "పోలీస్ వారి పర్మిషన్",
    "amount": 1140,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_26",
    "sno": 26,
    "description": "పూలదండలు, అరటిపళ్లు",
    "amount": 450,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_27",
    "sno": 27,
    "description": "ఊరేగింపు ప్రోగ్రాంకి దండ",
    "amount": 1500,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_28",
    "sno": 28,
    "description": "డెకరేషన్ రోజు డ్రింక్స్",
    "amount": 475,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_29",
    "sno": 29,
    "description": "బంతిపూలు",
    "amount": 16250,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_30",
    "sno": 30,
    "description": "తాళం కప్ప",
    "amount": 250,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_31",
    "sno": 31,
    "description": "వాటర్ క్యాన్లు",
    "amount": 510,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_32",
    "sno": 32,
    "description": "పోతురాజు స్వామి పూత సందర్భంగా",
    "amount": 640,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_33",
    "sno": 33,
    "description": "తీన్మార్ వారికి టిఫిన్",
    "amount": 595,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_34",
    "sno": 34,
    "description": "గుమ్మడికాయ",
    "amount": 100,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_35",
    "sno": 35,
    "description": "సాంబ్రాణి",
    "amount": 100,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_36",
    "sno": 36,
    "description": "పులిహోర ప్యాకింగ్ కవర్",
    "amount": 180,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_37",
    "sno": 37,
    "description": "గుళ్లం ప్యాకెట్లు",
    "amount": 1400,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_38",
    "sno": 38,
    "description": "ట్రాక్టర్ వాళ్లకు",
    "amount": 2000,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_39",
    "sno": 39,
    "description": "కొబ్బరికాయలు",
    "amount": 1000,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_40",
    "sno": 40,
    "description": "మటన్ కటింగ్",
    "amount": 2000,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_41",
    "sno": 41,
    "description": "పెరుగు బకెట్లు",
    "amount": 2800,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_42",
    "sno": 42,
    "description": "గ్యాస్",
    "amount": 2000,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_43",
    "sno": 43,
    "description": "మేకపోతు",
    "amount": 10000,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_44",
    "sno": 44,
    "description": "పంతులు గారికి దక్షిణ",
    "amount": 9500,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_45",
    "sno": 45,
    "description": "ఏసు గారి ఇంటిలో అమ్మవారికి",
    "amount": 101,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_46",
    "sno": 46,
    "description": "వంట మేస్త్రికి",
    "amount": 3000,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_47",
    "sno": 47,
    "description": "ఊరేగింపు భోజనానికి",
    "amount": 2525,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_48",
    "sno": 48,
    "description": "సామియానా",
    "amount": 3500,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_49",
    "sno": 49,
    "description": "మైక్ సెట్, D.J. బాక్సులకు",
    "amount": 5000,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_50",
    "sno": 50,
    "description": "వ్యాన్‌కు",
    "amount": 700,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_51",
    "sno": 51,
    "description": "సరుకులు",
    "amount": 24331,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_52",
    "sno": 52,
    "description": "కూరగాయలు",
    "amount": 1420,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_53",
    "sno": 53,
    "description": "బ్రెడ్",
    "amount": 950,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_54",
    "sno": 54,
    "description": "పాల ప్యాకెట్లు",
    "amount": 280,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_55",
    "sno": 55,
    "description": "చికెన్",
    "amount": 3225,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  },
  {
    "id": "exp_56",
    "sno": 56,
    "description": "లైటింగ్",
    "amount": 1000,
    "category": "ఉత్సవ ఖర్చు",
    "date": "2026-10"
  }
];
const DATA_REPORT = {
  "income": {
    "chandalu_base": 36407,
    "siddhardha_chandha": 29424,
    "ajay_chandha": 29424,
    "chandalu_total": 95255,
    "patalu_and_cheeralu": 35900,
    "adapaduchulu": 15700,
    "hundi": 5203,
    "total_available_funds": 152058
  },
  "expenses": {
    "total_expenses": 152058,
    "count": 56
  },
  "deficit": {
    "amount": 0,
    "sponsors": [
      {
        "name": "ఓడుగు సిద్ధార్థ గారు",
        "amount": 29424
      },
      {
        "name": "నడకుదుటి అజయ్ గారు",
        "amount": 29424
      }
    ]
  },
  "final_balance": 0,
  "suresh_babu_special": [
    "అమ్మవారి విగ్రహం (Idol)",
    "అమ్మవారికి సమర్పించిన చీరలు – 11",
    "మేకపోతు – 1 (Sacred Ram)",
    "అమ్మవారి విగ్రహ ప్రతిష్ఠ & మండపం పూజా సామగ్రి",
    "పంతులు గారికి, ఏసు గారికి, నరసింహ గారికి సమర్పించిన వస్త్రాలు"
  ]
};

const I18N = {
  te: {
    siteTitle: "శ్రీ కనకదుర్గ అమ్మవారి దేవీ నవరాత్రి మహోత్సవాలు",
    tabChandha: "🪙 చందాలు (50)",
    tabPatalu: "🥻 పాటలు & వేలం (26)",
    tabAdapaduchulu: "🌸 ఆడపడుచులు (27)",
    tabExpenses: "📋 ఉత్సవ ఖర్చులు (56)",
    tabReport: "📊 ఆదాయ వ్యయాల నివేదిక",
    searchChandhaPlaceholder: "చందా దాత పేరు (ఉదా: సిద్ధార్థ, అజయ్, నాంచారయ్య)...",
    searchPataluPlaceholder: "పాటల దాత పేరు (ఉదా: నాగిడి కృష్ణ, యశ్వంత్, సురేష్)...",
    searchAdapaduchuluPlaceholder: "ఆడపడుచు పేరు వెతకండి...",
    searchExpensesPlaceholder: "ఖర్చు వివరం వెతకండి (ఉదా: డెకరేషన్, తీన్మార్)...",
    sortHighest: "👑 ఎక్కువ మొత్తం",
    sortSerial: "🕒 క్రమ సంఖ్య",
    sortAlpha: "🔤 అ-హ (పేరు ప్రకారం)",
    emptyRecords: "ఎటువంటి రికార్డులు కనుగొనబడలేదు",
    footerText: "శ్రీ కనకదుర్గ అమ్మవారి దేవీ నవరాత్రి ఉత్సవ కమిటీ • పారదర్శక ఆదాయ వ్యయాల నివేదిక",
    updateBadge: "తాజా సమాచారం",
    navPoojaPortal: "పూజా సంకల్పం",
    poojaBannerTitle: "శ్రీ అమ్మవారి నిత్య పూజా సంకల్పం & సేవకుల జాబితా",
    poojaBannerSub: "ఉదయం & సాయంత్రం ఏ రోజున ఏ భక్తులు పూజలో కూర్చున్నారో తెలుసుకునేందుకు జాబితాను తెరవండి.",
    poojaLiveStatus: "ప్రత్యక్ష పూజా షెడ్యూల్",
    poojaFestivalDays: "10 రోజుల దేవీ నవరాత్రులు",
    btnViewPoojaList: "పూజా సేవకుల జాబితా చూడండి ➔",
    verifiedByCommittee: "కమిటీ సభ్యులు ఆమోదించినవి"
  },
  en: {
    siteTitle: "Sri Kanaka Durga Ammavaru Devi Navaratri Mahotsavam",
    tabChandha: "🪙 Chandha (50)",
    tabPatalu: "🥻 Patalu & Auctions (26)",
    tabAdapaduchulu: "🌸 Women's Feast (27)",
    tabExpenses: "📋 Expenses (56)",
    tabReport: "📊 Financial Report",
    searchChandhaPlaceholder: "Search chandha donor (e.g. Siddhardha, Ajay, Nancharayya)...",
    searchPataluPlaceholder: "Search pata donor (e.g. Nagidi Krishna, Yashwanth, Suresh)...",
    searchAdapaduchuluPlaceholder: "Search women's feast donor...",
    searchExpensesPlaceholder: "Search expense item (e.g. decoration, music)...",
    sortHighest: "👑 Highest Amount",
    sortSerial: "🕒 Serial Order",
    sortAlpha: "🔤 A-Z (Alphabetical)",
    emptyRecords: "No records found",
    footerText: "Sri Kanaka Durga Ammavaru Festival Committee • Transparent Audited Report",
    updateBadge: "Latest Announcement",
    navPoojaPortal: "Pooja Seva",
    poojaBannerTitle: "Sri Ammavaru Daily Pooja Seva & Devotee Schedule",
    poojaBannerSub: "Click to open the schedule of devotees who participated in Morning & Evening pooja on each festival day.",
    poojaLiveStatus: "Live Schedule",
    poojaFestivalDays: "10 Days Navaratri Mahotsavam",
    btnViewPoojaList: "View Devotee Schedule List ➔",
    verifiedByCommittee: "Approved by Committee"
  }
};

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
    this.activeTab = 'chandha';
    this.chandalu = [...DATA_CHANDALU];
    this.patalu = [...DATA_PATALU];
    this.adapaduchulu = [...DATA_ADAPADUCHULU];
    this.expenses = [...DATA_EXPENSES];
    this.festivalReport = DATA_REPORT;
    
    this.searchQuery = '';
    this.currentSort = 'amount-desc';
    this.poojaCount = 9;
    this.rtdb = null;

    this.init();
  }

  init() {
    try {
      const cachedPooja = localStorage.getItem('ammavaru_pooja_cache_v1');
      if (cachedPooja) {
        this.processPoojaBookings(JSON.parse(cachedPooja));
      } else {
        setTimeout(() => this.animatePoojaCount(this.poojaCount), 200);
      }
    } catch(e) {
      setTimeout(() => this.animatePoojaCount(this.poojaCount), 200);
    }

    this.initFirebase();
    this.setupEventListeners();
    this.applyLanguage();
    this.render();
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
      console.warn('[Website] Firebase direct REST API fallback:', e);
      this.fetchDirectHttp();
    }
  }

  listenToCloud() {
    if (!this.rtdb) return;

    this.rtdb.ref('chandha').on('value', (s) => {
      const data = s.val();
      if (data && Object.keys(data).length > 0) {
        this.chandalu = Object.keys(data).map(k => ({ id: k, ...data[k] }));
        if (this.activeTab === 'chandha') this.renderContent();
      }
    });

    this.rtdb.ref('patalu').on('value', (s) => {
      const data = s.val();
      if (data && Object.keys(data).length > 0) {
        this.patalu = Object.keys(data).map(k => ({ id: k, ...data[k] }));
        if (this.activeTab === 'patalu') this.renderContent();
      }
    });

    this.rtdb.ref('expenses').on('value', (s) => {
      const data = s.val();
      if (data && Object.keys(data).length > 0) {
        this.expenses = Object.keys(data).map(k => ({ id: k, ...data[k] }));
        if (this.activeTab === 'expenses') this.renderContent();
      }
    });

    this.rtdb.ref('poojaBookings').on('value', (s) => {
      this.processPoojaBookings(s.val());
    });
  }

  async fetchDirectHttp() {
    try {
      const [cRes, pRes, aRes, eRes, pbRes] = await Promise.all([
        fetch(`${FIREBASE_CONFIG.databaseURL}/chandha.json`).catch(() => null),
        fetch(`${FIREBASE_CONFIG.databaseURL}/patalu.json`).catch(() => null),
        fetch(`${FIREBASE_CONFIG.databaseURL}/adapaduchulu.json`).catch(() => null),
        fetch(`${FIREBASE_CONFIG.databaseURL}/expenses.json`).catch(() => null),
        fetch(`${FIREBASE_CONFIG.databaseURL}/poojaBookings.json`).catch(() => null)
      ]);

      if (cRes && cRes.ok) {
        const d = await cRes.json();
        if (d && Object.keys(d).length > 0) this.chandalu = Object.keys(d).map(k => ({ id: k, ...d[k] }));
      }
      if (pRes && pRes.ok) {
        const d = await pRes.json();
        if (d && Object.keys(d).length > 0) this.patalu = Object.keys(d).map(k => ({ id: k, ...d[k] }));
      }
      if (aRes && aRes.ok) {
        const d = await aRes.json();
        if (d && Object.keys(d).length > 0) this.adapaduchulu = Object.keys(d).map(k => ({ id: k, ...d[k] }));
      }
      if (eRes && eRes.ok) {
        const d = await eRes.json();
        if (d && Object.keys(d).length > 0) this.expenses = Object.keys(d).map(k => ({ id: k, ...d[k] }));
      }
      if (pbRes && pbRes.ok) {
        const pb = await pbRes.json();
        this.processPoojaBookings(pb);
      }
      this.render();
    } catch (err) {
      console.warn('[Website] HTTP fetch notice:', err);
    }
  }

  processPoojaBookings(data) {
    if (!data) {
      this.poojaCount = 9;
    } else {
      const approved = Object.values(data).filter(item => item && item.status === 'approved');
      this.poojaCount = approved.length > 0 ? approved.length : 9;
    }
    this.animatePoojaCount(this.poojaCount);
  }

  animatePoojaCount(targetVal) {
    const el = document.getElementById('statPoojaCount');
    if (!el) return;

    const startVal = parseInt(el.innerText, 10) || 0;
    if (startVal === targetVal && el.dataset.animated) return;
    el.dataset.animated = "true";

    const duration = 1200;
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (targetVal - startVal) * ease);

      el.innerText = current;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.innerText = targetVal;
        el.classList.add('count-pop');
        setTimeout(() => el.classList.remove('count-pop'), 600);
      }
    };

    requestAnimationFrame(frame);
  }

  setupEventListeners() {
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        this.currentLang = this.currentLang === 'te' ? 'en' : 'te';
        this.applyLanguage();
        this.render();
      });
    }

    const tabChandha = document.getElementById('tabChandhaBtn');
    const tabPatalu = document.getElementById('tabPataluBtn');
    const tabAdapaduchulu = document.getElementById('tabAdapaduchuluBtn');
    const tabExpenses = document.getElementById('tabExpensesBtn');
    const tabReport = document.getElementById('tabReportBtn');

    const selectTab = (tabName) => {
      this.activeTab = tabName;
      this.searchQuery = '';
      const sInput = document.getElementById('genericSearchInput');
      if (sInput) sInput.value = '';
      this.updateTabsUI();
      this.renderContent();
    };

    if (tabChandha) tabChandha.addEventListener('click', () => selectTab('chandha'));
    if (tabPatalu) tabPatalu.addEventListener('click', () => selectTab('patalu'));
    if (tabAdapaduchulu) tabAdapaduchulu.addEventListener('click', () => selectTab('adapaduchulu'));
    if (tabExpenses) tabExpenses.addEventListener('click', () => selectTab('expenses'));
    if (tabReport) tabReport.addEventListener('click', () => selectTab('report'));

    const sInput = document.getElementById('genericSearchInput');
    if (sInput) {
      sInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderContent();
      });
    }

    const sortSelect = document.getElementById('genericSortSelect');
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
    document.documentElement.lang = this.currentLang;
    if (document.body) {
      document.body.classList.toggle('lang-te', isTe);
      document.body.classList.toggle('lang-en', !isTe);
    }
    document.title = isTe ? 'శ్రీ కనకదుర్గ అమ్మవారి దేవీ నవరాత్రి ఉత్సవాలు | Sri Ammavaru Navaratri Mahotsavam' : 'Sri Kanaka Durga Ammavaru Navaratri Mahotsavam | Audited Financial Report';
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

    this.updateSearchPlaceholder();
  }

  updateSearchPlaceholder() {
    const sInput = document.getElementById('genericSearchInput');
    if (!sInput) return;

    if (this.activeTab === 'chandha') {
      sInput.placeholder = this.t('searchChandhaPlaceholder');
    } else if (this.activeTab === 'patalu') {
      sInput.placeholder = this.t('searchPataluPlaceholder');
    } else if (this.activeTab === 'adapaduchulu') {
      sInput.placeholder = this.t('searchAdapaduchuluPlaceholder');
    } else if (this.activeTab === 'expenses') {
      sInput.placeholder = this.t('searchExpensesPlaceholder');
    }
  }

  updateTabsUI() {
    const tabs = [
      { id: 'tabChandhaBtn', name: 'chandha' },
      { id: 'tabPataluBtn', name: 'patalu' },
      { id: 'tabAdapaduchuluBtn', name: 'adapaduchulu' },
      { id: 'tabExpensesBtn', name: 'expenses' },
      { id: 'tabReportBtn', name: 'report' }
    ];

    tabs.forEach(t => {
      const el = document.getElementById(t.id);
      if (el) {
        el.classList.toggle('active', this.activeTab === t.name);
      }
    });

    const searchBox = document.getElementById('searchControlsBox');
    if (searchBox) {
      searchBox.style.display = this.activeTab === 'report' ? 'none' : 'flex';
    }

    this.updateSearchPlaceholder();
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
    this.renderTopStatCards();
    this.renderContent();
  }

  // --- 1. Top Core Financial Overview ---
  renderTopStatCards() {
    const totalChandha = this.chandalu.reduce((sum, d) => sum + (Number(d.amount) || 0), 0); // ₹95,255
    const totalPatalu = this.patalu.reduce((sum, d) => sum + (Number(d.amount) || 0), 0); // ₹35,900
    const totalAdapaduchulu = this.adapaduchulu.reduce((sum, d) => sum + (Number(d.amount) || 0), 0); // ₹15,700
    const totalExpenses = this.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0); // ₹1,52,058

    this.animateNumber(document.getElementById('statChandhaSum'), totalChandha);
    this.animateNumber(document.getElementById('statPataluSum'), totalPatalu);
    this.animateNumber(document.getElementById('statAdapaduchuluSum'), totalAdapaduchulu);
    this.animateNumber(document.getElementById('statExpensesSum'), totalExpenses);

    const bChandha = document.getElementById('badgeChandhaCount');
    const bPatalu = document.getElementById('badgePataluCount');
    const bAdapaduchulu = document.getElementById('badgeAdapaduchuluCount');
    const bExpenses = document.getElementById('badgeExpensesCount');

    if (bChandha) bChandha.innerText = this.chandalu.length;
    if (bPatalu) bPatalu.innerText = this.patalu.length;
    if (bAdapaduchulu) bAdapaduchulu.innerText = this.adapaduchulu.length;
    if (bExpenses) bExpenses.innerText = this.expenses.length;
  }

  // --- 2. Tab Routing ---
  renderContent() {
    const container = document.getElementById('mainContentContainer');
    if (!container) return;

    if (this.activeTab === 'chandha') {
      this.renderChandhaSection(container);
    } else if (this.activeTab === 'patalu') {
      this.renderPataluSection(container);
    } else if (this.activeTab === 'adapaduchulu') {
      this.renderAdapaduchuluSection(container);
    } else if (this.activeTab === 'expenses') {
      this.renderExpensesSection(container);
    } else if (this.activeTab === 'report') {
      this.renderReportSection(container);
    }
  }

  // --- TAB 1: CHANDALU (50 Donors: ₹95,255 - Includes Siddhardha ₹29,424 & Ajay ₹29,424 at Top) ---
  renderChandhaSection(container) {
    const isTe = this.currentLang === 'te';
    let list = [...this.chandalu];

    if (this.searchQuery) {
      list = list.filter(item => {
        const nRaw = (item.donorName || '').toLowerCase();
        const nFmt = this.formatText(item.donorName).toLowerCase();
        const rNo = (item.receiptNo || '').toLowerCase();
        return nRaw.includes(this.searchQuery) || nFmt.includes(this.searchQuery) || rNo.includes(this.searchQuery);
      });
    }

    // Default sort: highest amount first (Siddhardha and Ajay will be #1 and #2)
    if (this.currentSort === 'amount-desc') {
      list.sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0));
    } else if (this.currentSort === 'recent-desc') {
      list.sort((a, b) => (a.sno || 0) - (b.sno || 0));
    } else if (this.currentSort === 'name-asc') {
      list.sort((a, b) => (this.formatText(a.donorName) || '').localeCompare(this.formatText(b.donorName) || ''));
    }

    const totalSum = list.reduce((s, i) => s + (Number(i.amount) || 0), 0);

    // GRAND ROYAL PODIUM for Top Chandha Donors:
    // Rank 1: Sri Odugu Siddhardha (₹29,424)
    // Rank 1: Sri Nadakuduti Ajay (₹29,424)
    // Rank 2/3: Top Village Donors (Bommidi Gopi Raju / Bommidi Srikanth / Vallabhaneni Veeranjaneyulu ₹2,000)
    let podiumHtml = '';
    if (!this.searchQuery && this.chandalu.length >= 3) {
      const r1 = this.chandalu.find(d => d.donorName.includes('సిద్ధార్థ')) || this.chandalu[0];
      const r2 = this.chandalu.find(d => d.donorName.includes('అజయ్') && Number(d.amount) >= 20000) || this.chandalu[1];
      const r3 = this.chandalu.find(d => Number(d.amount) === 2000) || this.chandalu[2];

      podiumHtml = `
        <div class="podium-container">
          <div class="podium-ornament-top">⚜️ ॥ శ్రీ కనకదుర్గ ప్రసన్న • భక్తి చందాల వేదిక ॥ ⚜️</div>
          <div class="podium-headline">
            <span class="podium-badge-pill">👑 అత్యధిక సేవా చందాదారులు</span>
            <h2 class="podium-title">అమ్మవారి చందాల గౌరవ పీఠం</h2>
            <p class="podium-sub">గ్రామ ఉత్సవానికి అత్యున్నత భక్తి చందాలు సమర్పించిన అగ్రశ్రేణి దాతలు</p>
          </div>
          <div class="podium-stage">
            ${this.buildPodiumPillar(r2, 1, 'pillar-rank-2', '🥇', 'మహా చందా దాత')}
            ${this.buildPodiumPillar(r1, 1, 'pillar-rank-1', '👑', 'మహా చందా దాత')}
            ${this.buildPodiumPillar(r3, 2, 'pillar-rank-3', '🥈', 'స్వర్ణ చందా దాత')}
          </div>
        </div>
      `;
    }

    const cardsHtml = list.map(item => {
      const isTop = Number(item.amount) >= 20000;
      const tagLabel = isTop ? (isTe ? '👑 మహా చందా దాత' : '👑 GRAND CHANDHA DONOR') : (isTe ? 'భక్తి చందా సమర్పణ' : 'CHANDHA OFFERING');
      return this.buildDevoteeCard(item, isTop ? 'deficit' : 'chandalu', tagLabel, '🪙');
    }).join('');

    container.innerHTML = `
      <div class="section-top-banner gold-banner">
        <div class="banner-title-group">
          <h2>🪙 భక్తి చందాలు (Chandha Donors Wall)</h2>
          <p>గ్రామస్తుల చందాలు & అగ్రశ్రేణి దాతల సమర్పణలు • మొత్తం 50 మంది చందాదారులు</p>
        </div>
        <div class="banner-total-badge">
          <span>మొత్తం చందాల నిధి:</span>
          <strong>₹${totalSum.toLocaleString('en-IN')}/-</strong>
        </div>
      </div>

      ${podiumHtml}

      <div class="donors-wall-grid">
        ${cardsHtml || `<div class="empty-data-state" style="grid-column: 1 / -1;"><div class="empty-state-title">${this.t('emptyRecords')}</div></div>`}
      </div>
    `;
  }

  // --- TAB 2: PATALU & AUCTIONS (26 Offerings: ₹35,900) ---
  renderPataluSection(container) {
    const isTe = this.currentLang === 'te';
    let list = [...this.patalu];

    if (this.searchQuery) {
      list = list.filter(item => {
        const nRaw = (item.donorName || '').toLowerCase();
        const nFmt = this.formatText(item.donorName).toLowerCase();
        const cat = (item.category || '').toLowerCase();
        return nRaw.includes(this.searchQuery) || nFmt.includes(this.searchQuery) || cat.includes(this.searchQuery);
      });
    }

    if (this.currentSort === 'amount-desc') {
      list.sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0));
    } else if (this.currentSort === 'recent-desc') {
      list.sort((a, b) => (a.sno || 0) - (b.sno || 0));
    } else if (this.currentSort === 'name-asc') {
      list.sort((a, b) => (this.formatText(a.donorName) || '').localeCompare(this.formatText(b.donorName) || ''));
    }

    const totalSum = list.reduce((s, i) => s + (Number(i.amount) || 0), 0);

    let podiumHtml = '';
    if (!this.searchQuery && this.patalu.length >= 3) {
      const r1 = this.patalu.find(p => p.donorName.includes('నాగిడి కృష్ణ')) || this.patalu[0];
      const r2 = this.patalu.find(p => p.donorName.includes('అజయ్') && Number(p.amount) === 5100) || this.patalu[1];
      const r3 = this.patalu.find(p => p.donorName.includes('యశ్వంత్')) || this.patalu[2];

      podiumHtml = `
        <div class="podium-container patalu-podium-card">
          <div class="podium-ornament-top">⚜️ ॥ శ్రీ కనకదుర్గ ప్రసన్న • పవిత్ర పాటలు & వేలం సమర్పణల వేదిక ॥ ⚜️</div>
          <div class="podium-headline">
            <span class="podium-badge-pill">🥻 పవిత్ర పాటలు & వేలం విశేష గౌరవం</span>
            <h2 class="podium-title">అమ్మవారి పాటల గౌరవ పీఠం</h2>
            <p class="podium-sub">శ్రీ అమ్మవారి చీరలు, పవిత్ర లడ్డూ ప్రసాదం మరియు పాటలలో భక్తితో పాల్గొని అత్యున్నత సమర్పణలు చేసిన అగ్రశ్రేణి భక్తులు</p>
          </div>

          <div class="patalu-podium-stats">
            <div class="podium-stat-chip">
              <span class="chip-icon">🥻</span>
              <span class="chip-label">చీరల పాటలు (20)</span>
              <strong class="chip-val">₹17,400</strong>
            </div>
            <div class="podium-stat-chip">
              <span class="chip-icon">🪔</span>
              <span class="chip-label">లడ్డూ పాట (1)</span>
              <strong class="chip-val">₹4,000</strong>
            </div>
            <div class="podium-stat-chip">
              <span class="chip-icon">🪙</span>
              <span class="chip-label">పాటల నగదు (5)</span>
              <strong class="chip-val">₹14,500</strong>
            </div>
          </div>

          <div class="podium-stage">
            ${this.buildPodiumPillar(r2, 2, 'pillar-rank-2', '🥈', 'విశిష్ట పాటల సమర్పణ')}
            ${this.buildPodiumPillar(r1, 1, 'pillar-rank-1', '👑', 'అగ్రశ్రేణి పాటల సమర్పణ')}
            ${this.buildPodiumPillar(r3, 3, 'pillar-rank-3', '🥉', 'లడ్డూ ప్రసాద విజేత')}
          </div>

          <div class="patalu-vip-strip">
            <div class="vip-strip-title">
              <span>🌸</span> ప్రముఖ చీరల పాటల సమర్పణల విశేష గౌరవం:
            </div>
            <div class="vip-chips-row">
              <div class="vip-chip">
                <span class="vip-name">శ్రీ వల్లభనేని సురేష్ బాబు గారు</span>
                <span class="vip-note">(4 చీరల పాటలు)</span>
                <strong class="vip-amt">₹3,200/-</strong>
              </div>
              <div class="vip-chip">
                <span class="vip-name">శ్రీమతి ఓడుగు సుజాత గారు</span>
                <span class="vip-note">(చీర పాట)</span>
                <strong class="vip-amt">₹2,900/-</strong>
              </div>
              <div class="vip-chip">
                <span class="vip-name">శ్రీ తీన్మార్ గారు</span>
                <span class="vip-note">(2 చీరల పాటలు)</span>
                <strong class="vip-amt">₹2,900/-</strong>
              </div>
              <div class="vip-chip">
                <span class="vip-name">శ్రీమతి నడకుదుటి విమల గారు</span>
                <span class="vip-note">(చీర పాట)</span>
                <strong class="vip-amt">₹1,300/-</strong>
              </div>
              <div class="vip-chip">
                <span class="vip-name">శ్రీ ప్రేమ్ కుమార్ గారు</span>
                <span class="vip-note">(చీర పాట)</span>
                <strong class="vip-amt">₹1,300/-</strong>
              </div>
              <div class="vip-chip">
                <span class="vip-name">శ్రీ తాత నాగబాబు గారు</span>
                <span class="vip-note">(చీర పాట)</span>
                <strong class="vip-amt">₹1,000/-</strong>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    const cardsHtml = list.map(item => {
      let catTag = 'చీరల పాట';
      let icon = '🥻';
      if (item.categoryKey === 'laddu') {
        catTag = 'లడ్డూ పాట';
        icon = '🪔';
      } else if (item.categoryKey === 'dabbu') {
        catTag = 'పాటల నగదు';
        icon = '🪙';
      }
      return this.buildDevoteeCard(item, item.categoryKey, isTe ? `${catTag} సమర్పణ` : 'AUCTION OFFERING', icon);
    }).join('');

    container.innerHTML = `
      <div class="section-top-banner pink-banner">
        <div class="banner-title-group">
          <h2>🥻 పాటలు & వేలం (Patalu & Auction Offerings)</h2>
          <p>చీరల పాటలు (₹17,400) + లడ్డూ పాట (₹4,000) + పాటల నగదు (₹14,500) • మొత్తం 26 సమర్పణలు</p>
        </div>
        <div class="banner-total-badge">
          <span>మొత్తం పాటలు:</span>
          <strong>₹${totalSum.toLocaleString('en-IN')}/-</strong>
        </div>
      </div>

      ${podiumHtml}

      <div class="donors-wall-grid">
        ${cardsHtml || `<div class="empty-data-state" style="grid-column: 1 / -1;"><div class="empty-state-title">${this.t('emptyRecords')}</div></div>`}
      </div>
    `;
  }

  // --- TAB 3: ADAPADUCHULA BHOJANALU (27 Women: ₹15,700) ---
  renderAdapaduchuluSection(container) {
    const isTe = this.currentLang === 'te';
    let list = [...this.adapaduchulu];

    if (this.searchQuery) {
      list = list.filter(item => {
        const nRaw = (item.donorName || '').toLowerCase();
        const nFmt = this.formatText(item.donorName).toLowerCase();
        return nRaw.includes(this.searchQuery) || nFmt.includes(this.searchQuery);
      });
    }

    if (this.currentSort === 'amount-desc') {
      list.sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0));
    } else if (this.currentSort === 'recent-desc') {
      list.sort((a, b) => (a.sno || 0) - (b.sno || 0));
    } else if (this.currentSort === 'name-asc') {
      list.sort((a, b) => (this.formatText(a.donorName) || '').localeCompare(this.formatText(b.donorName) || ''));
    }

    const totalSum = list.reduce((s, i) => s + (Number(i.amount) || 0), 0);

    const cardsHtml = list.map(item => this.buildDevoteeCard(item, 'adapaduchulu', isTe ? 'ఆడపడుచుల భోజన సమర్పణ' : "WOMEN'S FEAST OFFERING", '🌸')).join('');

    container.innerHTML = `
      <div class="section-top-banner purple-banner">
        <div class="banner-title-group">
          <h2>🌸 ఆడపడుచుల భోజనాలు (Women's Feast Program)</h2>
          <p>ఆడపడుచుల భోజనాల కార్యక్రమానికి భక్తితో సమర్పించిన సమర్పణలు • మొత్తం 27 మంది ఆడపడుచులు</p>
        </div>
        <div class="banner-total-badge">
          <span>మొత్తం సమర్పణ:</span>
          <strong>₹${totalSum.toLocaleString('en-IN')}/-</strong>
        </div>
      </div>

      <div class="donors-wall-grid" style="margin-top: 20px;">
        ${cardsHtml || `<div class="empty-data-state" style="grid-column: 1 / -1;"><div class="empty-state-title">${this.t('emptyRecords')}</div></div>`}
      </div>
    `;
  }

  // --- TAB 4: EXPENSES (56 Items: ₹1,52,058) ---
  renderExpensesSection(container) {
    let list = [...this.expenses];

    if (this.searchQuery) {
      list = list.filter(item => {
        const descRaw = (item.description || '').toLowerCase();
        const descFmt = this.formatText(item.description).toLowerCase();
        return descRaw.includes(this.searchQuery) || descFmt.includes(this.searchQuery);
      });
    }

    list.sort((a, b) => (a.sno || 0) - (b.sno || 0));

    const totalSum = list.reduce((s, i) => s + (Number(i.amount) || 0), 0);

    const cardsHtml = list.map(item => {
      const desc = this.formatText(item.description);
      const amt = Number(item.amount) || 0;

      return `
        <div class="expense-card-item">
          <div class="expense-left">
            <span class="expense-sno">#${item.sno}</span>
            <div class="expense-info">
              <div class="expense-desc-text">${desc}</div>
              <div class="expense-sub-text">
                <span>🗓️ దేవీ నవరాత్రుల ఉత్సవం</span>
                <span class="dot-sep">•</span>
                <span>అధికారిక బిల్లు</span>
              </div>
            </div>
          </div>
          <div class="expense-num-tag">₹${amt.toLocaleString('en-IN')}/-</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="section-top-banner crimson-banner">
        <div class="banner-title-group">
          <h2>📋 ఉత్సవ ఖర్చుల వివరాలు (Festival Expenses)</h2>
          <p>ఉత్సవ నిర్వహణ, పూజలు, డెకరేషన్, అన్నదానం మరియు ఇతర సమగ్ర ఖర్చులు • మొత్తం 56 ఖర్చులు</p>
        </div>
        <div class="banner-total-badge">
          <span>మొత్తం ఖర్చులు:</span>
          <strong>₹${totalSum.toLocaleString('en-IN')}/-</strong>
        </div>
      </div>

      <div class="expenses-items-grid" style="margin-top: 20px;">
        ${cardsHtml || `<div class="empty-data-state" style="grid-column: 1 / -1;"><div class="empty-state-title">${this.t('emptyRecords')}</div></div>`}
      </div>
    `;
  }

  // --- TAB 5: COMPREHENSIVE AUDITED FINANCIAL REPORT ---
  renderReportSection(container) {
    const isTe = this.currentLang === 'te';
    const rep = this.festivalReport;

    container.innerHTML = `
      <div class="audit-report-wrapper">

        <div class="report-hero-card">
          <div class="report-hero-badge">
            <span>🌺 100% పారదర్శక ఆడిట్ నివేదిక 🌺</span>
          </div>
          <h2 class="report-hero-title">
            ${isTe ? 'శ్రీ కనకదుర్గ అమ్మవారి దేవీ నవరాత్రి ఉత్సవాలు' : 'Sri Kanaka Durga Ammavaru Devi Navaratri Festival'}
          </h2>
          <p class="report-hero-sub">
            ${isTe ? 'ఆదాయ వ్యయాల సమగ్ర నివేదిక & తుది బ్యాలెన్స్ వివరాలు' : 'Comprehensive Audited Statement of Income, Expenditure & Balance Clearance'}
          </p>
        </div>

        <div class="report-kpi-grid">
          <div class="report-kpi-card gold">
            <div class="kpi-icon">💰</div>
            <div class="kpi-label">${isTe ? 'మొత్తం సమకూరిన నిధి' : 'Total Funds Realized'}</div>
            <div class="kpi-amount">₹${rep.income.total_available_funds.toLocaleString('en-IN')}/-</div>
            <div class="kpi-note">${isTe ? 'చందాలు ₹95,255 + పాటలు ₹35,900 + భోజనాలు ₹15,700 + హుండీ ₹5,203' : 'Chandha ₹95,255 + Patalu ₹35,900 + Meals ₹15,700 + Hundi ₹5,203'}</div>
          </div>

          <div class="report-kpi-card crimson">
            <div class="kpi-icon">💸</div>
            <div class="kpi-label">${isTe ? 'మొత్తం ఉత్సవ ఖర్చులు' : 'Total Festival Expenses'}</div>
            <div class="kpi-amount">₹${rep.expenses.total_expenses.toLocaleString('en-IN')}/-</div>
            <div class="kpi-note">${isTe ? '56 రకాల పూజా, ప్రసాద, ఉత్సవ వ్యయాలు' : 'All 56 itemized festival expenses'}</div>
          </div>

          <div class="report-kpi-card emerald">
            <div class="kpi-icon">⚖️</div>
            <div class="kpi-label">${isTe ? 'తుది బ్యాలెన్స్ (చివరి నిల్వ)' : 'Final Account Balance'}</div>
            <div class="kpi-amount">₹0/-</div>
            <div class="kpi-note">${isTe ? 'సమతుల్యం • ఎటువంటి బాకీలు లేవు' : 'Fully Balanced • Zero Outstanding'}</div>
          </div>
        </div>

        <!-- Section 1: Income Streams Breakdown -->
        <div class="report-section-box">
          <div class="report-section-header">
            <span class="sec-icon">📥</span>
            <div>
              <h3 class="sec-title">${isTe ? '1. వచ్చిన ఆదాయం వివరాలు' : '1. Festival Income Breakdown'}</h3>
              <p class="sec-sub">${isTe ? 'చందాలు, పాటలు, ఆడపడుచుల భోజనాలు & హుండీ ద్వారా సమకూరిన మొత్తం ఆదాయం' : 'Income received across distinct categories'}</p>
            </div>
          </div>

          <div class="report-table-responsive">
            <table class="report-table">
              <thead>
                <tr>
                  <th style="width: 80px;">${isTe ? 'క్రమ సంఖ్య' : 'S.No'}</th>
                  <th>${isTe ? 'ఆదాయ వివరాలు (రూపం)' : 'Source of Income'}</th>
                  <th style="text-align: right;">${isTe ? 'మొత్తం (రూ.)' : 'Amount (₹)'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><strong>${isTe ? 'భక్తి చందాలు' : 'Devotional Chandalu'}</strong> <span class="badge-mini">50 మంది చందాదారులు (సిద్ధార్థ & అజయ్ గార్ల విరాళాలతో)</span></td>
                  <td class="amt-col">₹95,255-00</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><strong>${isTe ? 'పాటలు – చీరల వేలం, లడ్డూ & నగదు' : 'Auctions (Sarees ₹17,400 + Laddu ₹4,000 + Cash ₹14,500)'}</strong> <span class="badge-mini">26 సమర్పణలు</span></td>
                  <td class="amt-col">₹35,900-00</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><strong>${isTe ? 'ఆడపడుచుల భోజనాల కార్యక్రమం' : "Women's Feast Program"}</strong> <span class="badge-mini">27 మంది ఆడపడుచులు</span></td>
                  <td class="amt-col">₹15,700-00</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td><strong>${isTe ? 'అమ్మవారి హుండీ ద్వారా వచ్చిన ఆదాయం' : 'Sacred Hundi Collections'}</strong></td>
                  <td class="amt-col">₹5,203-00</td>
                </tr>
                <tr class="table-total-row">
                  <td colspan="2"><strong>${isTe ? 'మొత్తం సమకూరిన ఆదాయం' : 'Total Revenue Realized'}</strong></td>
                  <td class="amt-col total-highlight">₹1,52,058-00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 2: Sri Vallabhaneni Suresh Babu Special Independent Contribution -->
        <div class="suresh-babu-card">
          <div class="sb-header">
            <div class="sb-badge">🌸 ప్రత్యేక వ్యక్తిగత సమర్పణ 🌸</div>
            <h3 class="sb-title">${isTe ? 'శ్రీ వల్లభనేని సురేష్ బాబు గారు పూర్తిగా వ్యక్తిగతంగా సమకూర్చినవి' : 'Special Independent Offerings by Sri Vallabhaneni Suresh Babu'}</h3>
            <p class="sb-subtitle">${isTe ? 'మన గ్రామంలోని రామాలయం వద్ద నిర్వహించిన శ్రీ కనకదుర్గ అమ్మవారి ఉత్సవాల సందర్భంగా సమర్పణ' : 'Sacred offerings provided personally for Sri Kanaka Durga Ammavaru Mahotsavam'}</p>
          </div>

          <div class="sb-list-grid">
            <div class="sb-item">
              <span class="sb-icon">🕉️</span>
              <span class="sb-text"><strong>అమ్మవారి పవిత్ర విగ్రహం</strong></span>
            </div>
            <div class="sb-item">
              <span class="sb-icon">🥻</span>
              <span class="sb-text"><strong>అమ్మవారికి సమర్పించిన చీరలు – 11</strong></span>
            </div>
            <div class="sb-item">
              <span class="sb-icon">🐐</span>
              <span class="sb-text"><strong>పవిత్ర మేకపోతు – 1</strong></span>
            </div>
            <div class="sb-item">
              <span class="sb-icon">🪔</span>
              <span class="sb-text"><strong>విగ్రహ ప్రతిష్ఠ & మండప పూజా సామగ్రి</strong></span>
            </div>
            <div class="sb-item" style="grid-column: 1 / -1;">
              <span class="sb-icon">🙏</span>
              <span class="sb-text"><strong>పంతులు గారికి, ఏసు గారికి, నరసింహ గారికి సమర్పించిన వస్త్రాలు</strong></span>
            </div>
          </div>

          <div class="sb-disclaimer-box">
            <strong>📌 ముఖ్య గమనిక:</strong>
            <p>
              ${isTe ? 
                'పైన పేర్కొన్న వస్తువులు మరియు వాటికి సంబంధించిన ఖర్చులకు గ్రామస్తుల నుంచి సేకరించిన చందాలకు గానీ, దేవీ నవరాత్రి ఉత్సవాల కమిటీకి గానీ ఎటువంటి సంబంధం లేదు. పై ఖర్చులన్నింటినీ శ్రీ వల్లభనేని సురేష్ బాబు గారు పూర్తిగా తన సొంత ఖర్చుతో వ్యక్తిగతంగా సమకూర్చడం జరిగింది. ఈ విషయాన్ని గ్రామస్తులందరూ గమనించగలరని మనవి.' :
                'All items listed above and their corresponding costs were fully and independently borne by Sri Vallabhaneni Suresh Babu in his personal capacity, with no association whatsoever with committee funds or public donations.'
              }
            </p>
          </div>
        </div>

        <!-- Section 3: Committee Vote of Thanks -->
        <div class="committee-thanks-card">
          <div class="thanks-badge">🙏 హృదయపూర్వక కృతజ్ఞతలు 🙏</div>
          <h3 class="thanks-title">${isTe ? 'దేవీ నవరాత్రి ఉత్సవాల కమిటీ కృతజ్ఞతా సందేశం' : 'Devi Navaratri Festival Committee Vote of Thanks'}</h3>
          <p class="thanks-body">
            ${isTe ?
              'దేవీ నవరాత్రి ఉత్సవాలను విజయవంతంగా నిర్వహించేందుకు చందాల రూపంలో, పాటలు–చీరల రూపంలో, ఆడపడుచుల భోజనాల నిమిత్తం, ఇతర రూపాల్లో సహకరించిన గ్రామస్తులకు, భక్తులకు, దాతలకు కమిటీ తరఫున హృదయపూర్వక కృతజ్ఞతలు తెలియజేస్తున్నాము.<br><br>ముఖ్యంగా, ఉత్సవ నిర్వహణకు అదనంగా అవసరమైన నిధులను చందాలుగా సమర్పించిన <strong>శ్రీ ఓడుగు సిద్ధార్థ గారికి</strong>, <strong>శ్రీ నడకుదుటి అజయ్ గారికి</strong> ప్రత్యేక ధన్యవాదాలు.<br><br>మీ అందరి సహకారంతో అమ్మవారి నవరాత్రి ఉత్సవాలు అత్యంత వైభవంగా ముగియడంతో పాటు, ఆదాయ వ్యయాల లెక్కలు కూడా సంపూర్ణ సమతుల్యతతో పారదర్శకంగా పూర్తయ్యాయి.' :
              'We express our deepest gratitude to all villagers, devotees, and benefactors who contributed through donations, auctions, women\'s feast offerings, and voluntary service. Special heartfelt thanks to Sri Odugu Siddhardha and Sri Nadakuduti Ajay for their grand contributions bringing the festival accounts to a perfect balance.'
            }
          </p>
          <div class="committee-sign">
            <span>ఇట్లు,</span>
            <strong>శ్రీ కనకదుర్గ అమ్మవారి దేవీ నవరాత్రి ఉత్సవాల కమిటీ</strong>
          </div>
        </div>

      </div>
    `;
  }

  buildPodiumPillar(item, rank, rankClass, medal, roleLabel) {
    const displayName = this.formatText(item.donorName);
    const amt = Number(item.amount) || 0;
    const initial = (displayName || '').trim().charAt(0) || '🌸';
    const isCrown = rank === 1 || medal === '👑';

    return `
      <div class="podium-pillar ${rankClass}">
        <div class="podium-avatar-wrap">
          ${isCrown ? '<span class="podium-crown-icon">👑</span>' : ''}
          <div class="podium-avatar">
            <span class="monogram-initial">${initial}</span>
            <span class="monogram-om">🕉️</span>
          </div>
          <div class="podium-rank-badge">${medal}</div>
        </div>
        <div class="podium-donor-info">
          <span class="podium-role-tag">${roleLabel}</span>
          <div class="podium-donor-name" title="${displayName}">${displayName}</div>
          <div class="podium-amount-tag">₹${amt.toLocaleString('en-IN')}/-</div>
        </div>
        <div class="podium-block">
          <div class="podium-pedestal-decor">⚜️</div>
          <div class="podium-pedestal-rank">#${rank}</div>
          <div class="podium-pedestal-label">${rank === 1 ? 'ప్రథమ గౌరవం' : (rank === 2 ? 'ద్వితీయ గౌరవం' : 'తృతీయ గౌరవం')}</div>
        </div>
      </div>
    `;
  }

  buildDevoteeCard(item, catKey, cardPillLabel, icon) {
    const displayName = this.formatText(item.donorName);
    const amt = Number(item.amount) || 0;
    const initial = (displayName || '').trim().charAt(0) || '🌸';
    const isTe = this.currentLang === 'te';
    const isGrand = Number(item.amount) >= 20000;

    let photoHtml = '';
    if (item.photoUrl) {
      photoHtml = `<img class="glass-avatar-img" src="${item.photoUrl}" alt="${displayName}" loading="lazy" />`;
    } else {
      photoHtml = `
        <div class="glass-avatar-monogram ${isGrand ? 'grand-monogram' : ''}">
          <span class="monogram-initial">${initial}</span>
          <span class="monogram-om">🕉️</span>
        </div>
      `;
    }

    return `
      <article class="modern-luxury-card ${isGrand ? 'card-grand-champion' : ''}" data-card-id="${item.id}">
        <div class="luxury-card-meta">
          <span class="donor-cat-badge ${catKey}">${item.category || cardPillLabel}</span>
          <span class="luxury-receipt-tag">${item.receiptNo || ''}</span>
        </div>

        <div class="luxury-avatar-wrapper">
          <div class="luxury-avatar-ring ${isGrand ? 'ring-grand-gold' : ''}">
            ${photoHtml}
          </div>
        </div>

        <div class="luxury-name-box">
          <h3 class="luxury-donor-name" title="${displayName}">${displayName}</h3>
          <div class="luxury-sacred-subtitle">
            <span>${isGrand ? '👑 అగ్రశ్రేణి మహా దాత • దివ్య కృప 👑' : (isTe ? '॥ శ్రీ అమ్మవారి దివ్య ఆశీస్సులు ॥' : 'DIVINE BLESSINGS')}</span>
          </div>
        </div>

        <div class="luxury-donation-pill ${isGrand ? 'pill-grand-gold' : ''}">
          <div class="donation-pill-header">
            <span class="donation-coin">${icon}</span>
            <span class="donation-pill-label">${cardPillLabel}</span>
          </div>
          <div class="donation-pill-amount">
            ₹${amt.toLocaleString('en-IN')}/-
          </div>
        </div>
      </article>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ammavaruWebsite = new AmmavaruWebsite();
});
