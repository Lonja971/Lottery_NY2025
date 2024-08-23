import axios from "axios";
import { CASES, RESOURCES, TANKS } from "../constants";

export function OpeningCasesLogic(playerId, setIsUpdated, limit, caseResourcesInfo, setDroppedItems, setCompensatedItems, setNewDroppedTanks) {

  const handleSetIsUpdated = () => {
    setIsUpdated(true);
  }

  function openCase(caseResourcesInfo) {
    let droppedItems = [];

    caseResourcesInfo.forEach((item) => {
      const scaledProbability = item.probability * 100;
      var randomValue = Math.floor(Math.random() * 10000) + 1;

      if (randomValue <= scaledProbability) {
        let amount;

        // Перевірка, чи є item підмасивом
        if (item.items && Array.isArray(item.items)) {
          // Логіка для вибору елемента з підмасиву
          const totalProbability = item.items.reduce((acc, subItem) => acc + subItem.probability, 0);
          const randomSubValue = Math.random() * totalProbability;

          let minValue = 0;
          let maxValue = 0;
          let selectedSubItem = null;

          // Перебираємо елементи підмасиву
          for (let subItem of item.items) {
            minValue = maxValue;
            maxValue += subItem.probability;

            if (randomSubValue >= minValue && randomSubValue < maxValue) {
              selectedSubItem = subItem;
              break;
            }
          }

          if (selectedSubItem) {
            if (selectedSubItem.amounts && selectedSubItem.amounts.length > 0) {
              const randomIndex = Math.floor(Math.random() * selectedSubItem.amounts.length);
              amount = selectedSubItem.amounts[randomIndex];
            } else {
              amount = 1;
            }

            if (selectedSubItem.type === "case"){
              let caseInfo = { case: true, type: selectedSubItem.name, name: CASES[selectedSubItem.name].name, amount: 1 };
              droppedItems.push(caseInfo);
            }else{
              const { amounts, ...itemWithoutAmounts } = selectedSubItem;
              let name = selectedSubItem.name || (selectedSubItem.type ? RESOURCES[selectedSubItem.type] : "");
              let tankInfo = null;
              let id = selectedSubItem.id || (selectedSubItem.type === "tank" ? RESOURCES.tanks : "");
  
              if (selectedSubItem.type === "tank") {
                tankInfo = TANKS[id.toLowerCase()];
              }
  
              droppedItems.push({ ...itemWithoutAmounts, name, amount, tankInfo });
            }
          }
        } else {
          // Звичайна логіка для елементів не з підмасиву
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
      }
    });

    //-ЗА-ДЕФОЛТОМ--
    if (droppedItems.length === 0) {
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
      while (droppedItems.length > limit) {
        let resourceNum = Math.floor(Math.random() * droppedItems.length);
        droppedItems.splice(resourceNum, 1);
      }
    }
    axios.post('http://localhost/ny2025/backend/api/assignData.php', {
      playerId: playerId,
      droppedItems: droppedItems,
    })
      .then(response => {
        if (response.data.status === 'success') {
          if (response.data.new_dropped_tanks && response.data.new_dropped_tanks.length > 0) {
            setNewDroppedTanks(response.data.new_dropped_tanks);
          }

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
  setDroppedItems(result);
}