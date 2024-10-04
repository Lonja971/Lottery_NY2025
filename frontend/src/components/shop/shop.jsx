import "../../css/shop.css";
import { NEW_YEARS_MYTHICAL_TANK1, NEW_YEARS_MYTHICAL_TANK2, NEW_YEARS_TANK_1, NEW_YEARS_TANK_2,NEW_YEARS_CAMO_1, NEW_YEARS_CAMO_2, CASES, TANKS } from "../constants";

export function Shop({playerData, setModalOpenCaseAnimation}) {

   const casesData = [
      {
         transcription: "new_years_camo1",
         type: NEW_YEARS_CAMO_1,
         buttonOpenResource: "drawings",
         buttonPrice: 6,
      },
      {
         transcription: "new_years_camo2",
         type: NEW_YEARS_CAMO_2,
         buttonOpenResource: "drawings",
         buttonPrice: 6,
      },
      {
         transcription: "new_year_mythical_tank1",
         type: NEW_YEARS_MYTHICAL_TANK1,
         buttonOpenResource: "drawings",
         buttonPrice: 15,
      },
      {
         transcription: "new_year_mythical_tank2",
         type: NEW_YEARS_MYTHICAL_TANK2,
         buttonOpenResource: "drawings",
         buttonPrice: 15,
      },
      {
         transcription: "new_years_tank1",
         type: NEW_YEARS_TANK_1,
         buttonOpenResource: "drawings",
         buttonPrice: 20,
      },
      {
         transcription: "new_years_tank2",
         type: NEW_YEARS_TANK_2,
         buttonOpenResource: "drawings",
         buttonPrice: 20,
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
                        <a target="_blank" rel="noopener noreferrer" href={ TANKS[CASES[caseData.transcription].award].link } className="caseblock__main-moreinfo absolute absolute-right">
                           <img src="img/background/info.png" alt="INFO_IMG" />
                        </a>
                        <div>
                           <img className="shop__case-img" src={"img/tokens_shop/" + caseData.transcription + ".png"} alt="TOKENS_CONTAINER" />
                           <h3 className="shop__case-title">{CASES[caseData.transcription].name}</h3>
                           <p className="shop__case-text">{CASES[caseData.transcription].caseInfo}</p>
                        </div>
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