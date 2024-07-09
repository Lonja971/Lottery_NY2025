export const PLAYER = {
  id: 1,
  name: "Bogach",
  gold: 10000,
  silver: 22888,
  tokens: 200,
  red_tokens: 300,
  tanks: 15,
  premium_akk: 8,
  drawings: 3,
};

export const RESOURCES = {
  gold: "Золота",
  silver: "Срібла",
  tokens: "Токен",
  tanks: "Танка",
  red_tokens: "Червоний Токен",
  drawings: "Креслення",
  premium_akk: "Преміум аккаунт",
};

export const TANKS = {
  1: {
    id: 1,
    name: "Maus",
    transcription: "maus",
    type: "ht",
    land: "ge",
  },
  2: {
    id: 2,
    name: "Об'єкт 490",
    transcription: "obj_490",
    type: "ht",
    land: "ua",
  },
  3: {
    id: 3,
    name: "Об'єкт 490 Білка",
    transcription: "obj_490_squirrel",
    type: "camo",
    land: "ua",
  },
  4: {
    id: 4,
    name: "Pz B2",
    transcription: "pz_b2",
    type: "ht",
    land: "ge",
  },
};

//---CASES---

export const CASES = {
  main_case: {
    name: "Main Кейс",
    transcription: "main_case"
  },
  regular_case: {
    name: "Звичайний Кейс",
    transcription: "regular_case"
  },
  special_case: {
    name: "Особливий Кейс",
    transcription: "special_case"
  },
  rare_case: {
    name: "Рідкісний Кейс",
    transcription: "rare_case"
  },
  mythical_case: {
    name: "Міфічний Кейс",
    transcription: "mythical_case"
  },
  legendary_case: {
    name: "Легендарний Кейс",
    transcription: "legendary_case"
  }
};

//---CASES-RESOURCES-INFO---

export const MAIN_CASE = [
  { type: "gold", probability: 15, amounts: [ 200, 300, 500 ] },
  { type: "red_tokens", probability: 15, amounts: [ 1, 2 ] },
];

export const REGULAR_CASE = [
  { type: "silver", probability: 40, amounts: [1000, 1500], default: true },
  { type: "tanks", probability: 40, amounts: [2, 3] },
  { type: "gold", probability: 20, amounts: [100] },
];

export const SPECIAL_CASE = [
  { type: "silver", probability: 30, amounts: [2000], default: true },
  { type: "tanks", probability: 20, amounts: [5] },
  { type: "premium_akk", probability: 20, amounts: [1] },
  { type: "gold", probability: 20, amounts: [ 300, 500 ] },
  //{ type: "skin", probability: 10, amounts: 1 },
];

export const RARE_CASE = [
  { type: "silver", probability: 30, amounts: [ 3000, 5000 ], default: true },
  { type: "premium_akk", probability: 35, amounts: 1 },
  { type: "gold", probability: 35, amounts: [ 500, 700 ] },
  { type: "red_tokens", probability: 10, amounts: [ 1, 2 ] },
  { type: "drawings", probability: 10, amounts: [1] },
];

export const MYTHICAL_CASE = [
  { type: "drawings", probability: 33, amounts: [1], default: true },
  { type: "premium_akk", probability: 33, amounts: [2] },
  { type: "gold", probability: 33, amounts: [1000] },
  { type: "red_tokens", probability: 10, amounts: [2] },
  { type: "tank", id: "3", probability: 20, amounts: [1] }, // 20% на всі скіни
];

export const LEGENDARY_CASE = [
  { type: "drawings", probability: 25, amounts: [2], default: true, dafaultAmount: 2, },
  { type: "gold", probability: 25, amounts: [2000] },
  { type: "tank", id: "1", probability: 25, amounts: [1] },
  { type: "tank", id: "2", probability: 25, amounts: [1] },
  { type: "red_tokens", probability: 10, amounts: [2, 6] },
];
