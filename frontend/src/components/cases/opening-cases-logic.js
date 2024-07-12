import axios from "axios";
import { RESOURCES, TANKS } from "../constants";

export function OpeningCasesLogic( playerId, setIsUpdated, limit, caseResourcesInfo, setDroppedItems, setCompensatedItems, setNewDroppedTanks) {

  const handleSetIsUpdated = () => {
    setIsUpdated(true);
  }

  function openCase(caseResourcesInfo) {
    //console.log("");
    let droppedItems = [];

    caseResourcesInfo.forEach((item) => {
      var randomValue = Math.floor(Math.random() * 100) + 1;
      //console.log(
      //  "( " + randomValue + "% для item " + (item.name || item.type) + " )",
      //);

      if (randomValue <= item.probability) {
        let amount;

        if (item.amounts && item.amounts.length > 0) {
          const randomIndex = Math.floor(Math.random() * item.amounts.length);
          amount = item.amounts[randomIndex];
        } else {
          amount = 1;
        }

        const { amounts, ...itemWithoutAmounts } = item;
        let name = item.name || (item.type ? RESOURCES[item.type] : "");
        let tankInfo = null;
        let id = item.id || (item.type === "tank" ? RESOURCES.tanks : "");

        if (item.type === "tank") {
          tankInfo = TANKS[id.toLowerCase()];
        }

        droppedItems.push({ ...itemWithoutAmounts, name, amount, tankInfo });
      }
    });

    if (droppedItems.length === 0) {
      //console.log("--за дефолтом");
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
        let name =
          defaultItem.name ||
          (defaultItem.type ? RESOURCES[defaultItem.type] : "");
        let tankInfo = null;
        let id =
          defaultItem.id || (defaultItem.type === "tank" ? RESOURCES.tanks : "");

        if (defaultItem.type === "tank") {
          tankInfo = TANKS[id.toLowerCase()];
        }

        droppedItems.push({ ...itemWithoutAmounts, name, amount, tankInfo });
      } else {
        const { amounts, ...itemWithoutAmounts } = caseResourcesInfo[0];
        let name =
          caseResourcesInfo[0].name ||
          (caseResourcesInfo[0].type
            ? RESOURCES[caseResourcesInfo[0].type]
            : "");
        let tankInfo = null;
        let id =
          caseResourcesInfo[0].id || (caseResourcesInfo[0].type === "tank" ? RESOURCES.tanks : "");

        if (caseResourcesInfo[0].type === "tank") {
          tankInfo = TANKS[id.toLowerCase()];
        }

        droppedItems.push({ ...itemWithoutAmounts, name, amount: 1, tankInfo });
      }
    } else if (droppedItems.length > limit) {
      //console.log("--обмеження до " + limit + " елементів");
      while (droppedItems.length > limit) {
        let resourceNum = Math.floor(Math.random() * droppedItems.length);
        droppedItems.splice(resourceNum, 1);
      }
    }

    axios.post('http://NY2025/backend/api/assignData.php', {
      playerId: playerId,
      droppedItems: droppedItems,
    })
    .then(response => {
      if (response.data.status === 'success') {
        //console.log('Data assigned successfully');
    
        // Check for new_dropped_tanks
        if (response.data.new_dropped_tanks && response.data.new_dropped_tanks.length > 0) {
          setNewDroppedTanks(response.data.new_dropped_tanks);
        }
    
        // Check for converted_items
        if (response.data.converted_items && response.data.converted_items.length > 0) {
          setCompensatedItems(response.data.converted_items);
        }
      } else {
        console.log(response.data.message);
      }
      handleSetIsUpdated();
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
     

    return droppedItems;
  }

  const result = openCase(caseResourcesInfo);
  //console.log("Випали ресурси:", result);
  setDroppedItems(result);
}