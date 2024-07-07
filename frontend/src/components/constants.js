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
  tanks: "Танків",
  red_tokens: "Червоний Токен",
  drawings: "Креслення",
};

export const TANKS = {
  maus: {
    name: "Maus",
    type: "ht",
    land: "ge",
  },
  obj_490: {
    name: "Об'єкт 490",
    type: "ht",
    land: "ua",
  },
  pz_b2: {
    name: "Pz B2",
    type: "ht",
    land: "ge",
  },
};

//---CASES-RESOURCES-INFO---

export const REGULAR_CASE = [
  { type: "silver", probability: 20, amounts: [1000, 1500, 2000, 2500], default: true },
  { type: "gold", probability: 20, amounts: [50, 100, 150] },
  { type: "tanks", probability: 20, amounts: [1, 2, 3] },
  { name: "Т-64 БМ Оплот", probability: 20, amounts: [1] }
];

export const LEGENDARY_CASE = [
  { type: "drawings", probability: 25, amounts: [1, 2], default: true },
  { type: "gold", probability: 25, amounts: [1500, 2000] },
  { name: "Танк 1", probability: 25, amounts: [1] },
  { name: "Танк 2", probability: 25, amounts: [1] },
  { type: "red_tokens", probability: 10, amounts: [2, 6] },
];