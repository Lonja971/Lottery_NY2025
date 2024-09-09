import "../../css/shop.css";
import { CaseBlock } from "../uikit/case-block";
import { NEW_YEARS_TANK_1, NEW_YEARS_TANK_2 } from "../constants";

export function Shop({playerData, setModalOpenCaseAnimation, playerGuarantors}) {

   const casesData = [
      {
         isManu: false,
         transcription: "new_years_tank1",
         type: NEW_YEARS_TANK_1,
         buttons: [
            {
               openResource: "drawings",
               price: 12,
            },
         ],
      },
      {
         isManu: false,
         transcription: "new_years_tank2",
         type: NEW_YEARS_TANK_2,
         buttons: [
            {
               openResource: "drawings",
               price: 12,
            },
         ],
      },
   ]

   return (
      <div className="shop">
         <div className="shop__container _container">
            <div className="shop__bg"></div>
            <div className="shop__content">
               <div className="shop__content-title">
                  <h2 className="_glass">Магазин Креслень <img src="img/resources/drawings.png" alt="" /></h2>
               </div>
               <div className="_cases-container">
               {casesData.map((caseData, index) => (
                  <CaseBlock
                     key={index}
                     caseData={caseData}
                     playerData={playerData}
                     setModalOpenCaseAnimation={setModalOpenCaseAnimation}
                     playerGuarantors={playerGuarantors}
                  />
               ))}
               </div>
            </div>
         </div>
      </div>
   )
}