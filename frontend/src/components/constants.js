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

//---CASES-RESOURCES-INFO---

export const REGULAR_CASE = [
  {
    type: "silver",
    probability: 1,
    amounts: [1000, 1500, 2000, 2500],
    default: true,
  },
  { type: "gold", probability: 1, amounts: [50, 100, 150] },
  { type: "tanks", probability: 100, amounts: [1, 2, 3] },
  { type: "tank", id: "1", probability: 0, amounts: [1] },
  { type: "tank", id: "3", probability: 100, amounts: [1] },
];

export const LEGENDARY_CASE = [
  {
    type: "drawings",
    probability: 100,
    amounts: [1, 2],
    default: true,
    dafaultAmount: 1,
  },
  { type: "gold", probability: 25, amounts: [1500, 2000] },
  { type: "tank", id: "2", probability: 1, amounts: [1] },
  { type: "tank", id: "4", probability: 1, amounts: [1] },
  { type: "red_tokens", probability: 100, amounts: [2, 6] },
];
