import "../../css/shop.css";
import { NEW_YEARS_TANK_1, NEW_YEARS_TANK_2,NEW_YEARS_CAMO_1, NEW_YEARS_CAMO_2, CASES } from "../constants";

export function Shop({playerData, setModalOpenCaseAnimation}) {

   const casesData = [
      {
         isManu: false,
         transcription: "new_years_camo1",
         type: NEW_YEARS_CAMO_1,
         buttonOpenResource: "drawings",
         buttonPrice: 6,
         caseInfo: "Купіть скін Обьект 490 Білка в цьому наборі!"
      },
      {
         isManu: false,
         transcription: "new_years_camo2",
         type: NEW_YEARS_CAMO_2,
         buttonOpenResource: "drawings",
         buttonPrice: 6,
         caseInfo: "Купіть скін E 100 Втоплений Титан!"
      },
      {
         isManu: false,
         transcription: "new_years_tank1",
         type: NEW_YEARS_TANK_1,
         buttonOpenResource: "drawings",
         buttonPrice: 12,
         caseInfo: "Купіть танк Обьект 490 в цьому наборі!"
      },
      {
         isManu: false,
         transcription: "new_years_tank2",
         type: NEW_YEARS_TANK_2,
         buttonOpenResource: "drawings",
         buttonPrice: 12,
         caseInfo: "Купіть танк E 100 в цьому наборі!"
      },
   ]

   return (
      <div className="shop">
         <div className="shop__container _container">
            <div className="shop__bg"></div>
            <div className="shop__content">
               <div className="shop__content-title">
                  <div className="_glass shop_title">
                     <h2>Магазин Креслень</h2>
                     <img src="img/resources/drawings.png" alt="" />
                  </div>
               </div>
               <div className="_cases-container">
               {casesData.map((caseData, index) => {
                  const isDisabled = playerData && playerData[caseData.buttonOpenResource] < caseData.buttonPrice;

                  return(
                     <div className="_glass shop__case" key={index}>
                        <img className="shop__case-img" src="img/tokens_shop/obj_490.png" alt="TOKENS_CONTAINER" />
                        <h3 className="shop__case-title">{CASES[caseData.transcription].name}</h3>
                        <p className="shop__case-text">{caseData.caseInfo}</p>
                        <div className="buttons-block buttons-block_shop">
                           <button
                              className={`btn _glass ${isDisabled ? "btn-closed" : ""} shop-button`}
                              onClick={() =>
                                 setModalOpenCaseAnimation({
                                 isOpen: true,
                                 type: caseData.type,
                                 caseName: caseData.transcription,
                                 openResource: caseData.buttonOpenResource,
                                 })
                              }
                           >
                              {caseData.buttonPrice} <img src={`img/resources/${caseData.buttonOpenResource}.png`} alt="CASE_IMG" />
                              <div className="line line-top"></div>
                              <div className="line line-right"></div>
                              <div className="line line-bottom"></div>
                              <div className="line line-left"></div>
                           </button>
                        </div>
                     </div>
                  )
               })}
               </div>
            </div>
         </div>
      </div>
   )
}