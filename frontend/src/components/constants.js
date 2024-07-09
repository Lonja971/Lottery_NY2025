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
};

export const TANKS = {
  maus: {
    name: "Maus",
    transcription: "maus",
    type: "ht",
    land: "ge",
  },
  obj_490: {
    name: "Об'єкт 490",
    transcription: "obj_490",
    type: "ht",
    land: "ua",
  },
  obj_490_squirrel: {
    name: "Об'єкт 490 Білка",
    transcription: "obj_490-squirrel",
    type: "camo",
    land: "ua",
  },
  pz_b2: {
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
    probability: 100,
    amounts: [1000, 1500, 2000, 2500],
    default: true,
  },
  { type: "gold", probability: 100, amounts: [50, 100, 150] },
  { type: "tanks", probability: 100, amounts: [1, 2, 3] },
  { type: "tank", name: "maus", probability: 100, amounts: [1] },
  { type: "tank", name: "obj_490_squirrel", probability: 90, amounts: [1] },
];

export const LEGENDARY_CASE = [
  {
    type: "drawings",
    probability: 15,
    amounts: [1, 2],
    default: true,
    dafaultAmount: 1,
  },
  { type: "gold", probability: 25, amounts: [1500, 2000] },
  { type: "tank", name: "obj_490", probability: 15, amounts: [1] },
  { type: "tank", name: "pz_b2", probability: 15, amounts: [1] },
  { type: "red_tokens", probability: 10, amounts: [2, 6] },
];
