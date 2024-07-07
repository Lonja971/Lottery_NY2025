import { RESOURCES } from "../constants";

export function OpeningCasesLogic(caseResourcesInfo , setDroppedItems) {
 
   function openCase(caseResourcesInfo) {
     console.log('');
     let droppedItems = [];
 
     caseResourcesInfo.forEach(item => {
       var randomValue = Math.floor(Math.random() * 100) + 1;
       console.log("( " + randomValue + "% для item " + item.name + " )");
 
       if (randomValue <= item.probability) {

         let amount;
         if (item.amounts && item.amounts.length > 0) {
           const randomIndex = Math.floor(Math.random() * item.amounts.length);
           amount = item.amounts[randomIndex];
         } else {
           amount = 1;
         }
 
         const { amounts, ...itemWithoutAmounts } = item;
         droppedItems.push({ ...itemWithoutAmounts, amount });
       }
     });
 
     if (droppedItems.length === 0) {
       console.log('--за дефолтом');
       const defaultItem = caseResourcesInfo.find(item => item.default === true);
       if (defaultItem) {
         let amount;
         if (defaultItem.amounts && defaultItem.amounts.length > 0) {
           const randomIndex = Math.floor(Math.random() * defaultItem.amounts.length);
           amount = defaultItem.amounts[randomIndex];
         } else {
           amount = 1;
         }
         const { amounts, ...itemWithoutAmounts } = defaultItem;
         droppedItems.push({ ...itemWithoutAmounts, amount });
       } else {
         droppedItems.push({ ...caseResourcesInfo[0], amount: 1 });
       }
     } else if (droppedItems.length > 4) {
       console.log('--обмеження до 4 елементів');
       while (droppedItems.length > 4) {
         let resourceNum = Math.floor(Math.random() * droppedItems.length);
         droppedItems.splice(resourceNum, 1);
       }
     }
 
     return droppedItems;
   }
 
   const result = openCase(caseResourcesInfo);
   console.log("Випали ресурси:", result);
   setDroppedItems(result);
} 