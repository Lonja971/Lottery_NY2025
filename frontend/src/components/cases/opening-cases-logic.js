import axios from "axios";
import { RESOURCES, TANKS } from "../constants";

export function OpeningCasesLogic(limit, caseResourcesInfo, setDroppedItems) {
  function openCase(caseResourcesInfo) {
    console.log("");
    let droppedItems = [];

    caseResourcesInfo.forEach((item) => {
      var randomValue = Math.floor(Math.random() * 100) + 1;
      console.log(
        "( " + randomValue + "% для item " + (item.name || item.type) + " )",
      );

      if (randomValue <= item.probability) {
        let amount;
        if (item.amounts && item.amounts.length > 0) {
          const randomIndex = Math.floor(Math.random() * item.amounts.length);
          amount = item.amounts[randomIndex];
        } else {
          amount = 1;
        }

        const { amounts, ...itemWithoutAmounts } = item;
        let id = item.id || (item.type ? RESOURCES[item.type] : "");
        let tankInfo = null;

        if (item.type === "tank") {
          tankInfo = TANKS[id.toLowerCase()];
        }

        droppedItems.push({ ...itemWithoutAmounts, id, amount, tankInfo });
      }
    });

    if (droppedItems.length === 0) {
      console.log("--за дефолтом");
      const defaultItem = caseResourcesInfo.find(
        (item) => item.default === true,
      );
      if (defaultItem) {
        let amount;

        if (defaultItem.dafaultAmount !== undefined) {
          amount = defaultItem.dafaultAmount;
        } else {
          if (defaultItem.amounts && defaultItem.amounts.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * defaultItem.amounts.length,
            );
            amount = defaultItem.amounts[randomIndex];
          } else {
            amount = 1;
          }
        }
        const { amounts, ...itemWithoutAmounts } = defaultItem;
        let id =
          defaultItem.id ||
          (defaultItem.type ? RESOURCES[defaultItem.type] : "");
        let tankInfo = null;

        if (defaultItem.type === "tank") {
          tankInfo = TANKS[id.toLowerCase()];
        }

        droppedItems.push({ ...itemWithoutAmounts, id, amount, tankInfo });
      } else {
        const { amounts, ...itemWithoutAmounts } = caseResourcesInfo[0];
        let id =
          caseResourcesInfo[0].id ||
          (caseResourcesInfo[0].type
            ? RESOURCES[caseResourcesInfo[0].type]
            : "");
        let tankInfo = null;

        if (caseResourcesInfo[0].type === "tank") {
          tankInfo = TANKS[id.toLowerCase()];
        }

        droppedItems.push({ ...itemWithoutAmounts, id, amount: 1, tankInfo });
      }
    } else if (droppedItems.length > limit) {
      console.log("--обмеження до " + limit + " елементів");
      while (droppedItems.length > limit) {
        let resourceNum = Math.floor(Math.random() * droppedItems.length);
        droppedItems.splice(resourceNum, 1);
      }
    }

    axios.post('http://NY2025/backend/api/assignData.php', {
      droppedItems: droppedItems,
    })
    .then(response => {
      if (response.data.status === 'success') {
        console.log('Data assigned successfully');
      } else {
        console.log(response.data.message);
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
    });

    return droppedItems;
  }

  const result = openCase(caseResourcesInfo);
  console.log("Випали ресурси:", result);
  setDroppedItems(result);
}
