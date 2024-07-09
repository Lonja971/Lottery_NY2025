import axios from "axios";
import { CASES, MAIN_CASE, RESOURCES } from "../constants";

export function OpeningMainCaseLogic( setIsUpdated, setDroppedItems ) {

  const handleSetIsUpdated = () => {
    setIsUpdated(true);
  }

  function openCase(MAIN_CASE) {
    let droppedItems = [];
    let droppedCaseInfo;
    let droppedCase;

    const randomValue = Math.floor(Math.random() * 100) + 1;

    if (randomValue <= 40) {
      droppedCaseInfo = "regular_case";
      console.log('Звичайний кейс');
    } else if (randomValue <= 72) {
      droppedCaseInfo = "special_case";
      console.log('Особовий кейс');
    } else if (randomValue <= 90) {
      droppedCaseInfo = "rare_case";
      console.log('Рідкий кейс');
    } else if (randomValue <= 97) {
      droppedCaseInfo = "mythical_case";
      console.log('Міфічний кейс');
    } else {
      droppedCaseInfo = "legendary_case";
      console.log('Легендарний кейс');
    }

    droppedCase = { type: droppedCaseInfo, case: true, name: CASES[droppedCaseInfo].name, amount: 1 };
    droppedItems.push(droppedCase);

    MAIN_CASE.forEach((item) => {
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
        let name = item.name || (item.type ? RESOURCES[item.type] : "");
        let tankInfo = null;
        let id = item.id;

        droppedItems.push({ ...itemWithoutAmounts, name, amount, tankInfo });
      }
    });

    axios.post('http://NY2025/backend/api/assignData.php', {
      droppedItems: droppedItems,
    })
    .then(response => {
      if (response.data.status === 'success') {
        console.log('Data assigned successfully');
        handleSetIsUpdated();
      } else {
        console.log(response.data.message);
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
    });

    return droppedItems;
  }

  const result = openCase(MAIN_CASE);
  console.log("Випали ресурси:", result);
  setDroppedItems(result);
}