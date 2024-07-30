import axios from "axios";
import { CASES, MAIN_CASE, RESOURCES } from "../constants";

export function OpeningMainCaseLogic(playerId, setIsUpdated, setDroppedItems) {

  const handleSetIsUpdated = () => {
    setIsUpdated(true);
  }

  function openCase(MAIN_CASE) {
    let droppedItems = [];
    let droppedCaseInfo;
    let droppedCase;

    const randomValue = Math.floor(Math.random() * 100) + 1;

    if (randomValue <= 40) {
      droppedCaseInfo = "regular_cases";
    } else if (randomValue <= 72) {
      droppedCaseInfo = "special_cases";
    } else if (randomValue <= 90) {
      droppedCaseInfo = "rare_cases";
    } else if (randomValue <= 97) {
      droppedCaseInfo = "mythical_cases";
    } else {
      droppedCaseInfo = "legendary_cases";
    }

    droppedCase = { type: droppedCaseInfo, case: true, name: CASES[droppedCaseInfo].name, amount: 1 };
    droppedItems.push(droppedCase);

    MAIN_CASE.forEach((item) => {
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

        droppedItems.push({ ...itemWithoutAmounts, name, amount, tankInfo });
      }
    });

    axios.post('http://localhost/ny2025/backend/api/assignData.php', {
      playerId: playerId,
      droppedItems: droppedItems,
    })
      .then(response => {
        if (response.data.status === 'success') {
          //console.log('Data assigned successfully');
        } else {
          //console.log(response.data.message);
        }
        handleSetIsUpdated();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

    return droppedItems;
  }

  const result = openCase(MAIN_CASE);
  //console.log("Випали ресурси:", result);
  setDroppedItems(result);
}