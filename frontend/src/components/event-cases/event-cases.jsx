import "../../css/event-cases.css";
import { CaseBlock } from "../uikit/case-block";
import { WAFF_CASE, FRANCE_NATION_CASE, CHINA_NEW_YEAR_CASE, OBJ_490_CASE, USA_NATION_CASE, TD_SUPPORT_CASE } from "../constants";

export function EventCases({playerData, setModalOpenCaseAnimation, playerGuarantors}) {

   const casesData = [
      {
         isManu: false,
         transcription: "waff_cases",
         type: WAFF_CASE,
         buttons: [
            {
               openResource: "red_tokens",
               price: 2,
            },
         ],
      },
      {
         isManu: false,
         transcription: "obj_490_cases",
         type: OBJ_490_CASE,
         buttons: [
            {
               openResource: "red_tokens",
               price: 2,
            },
         ],
      },
      {
         isManu: false,
         transcription: "france_nation_cases",
         type: FRANCE_NATION_CASE,
         buttons: [
            {
               openResource: "red_tokens",
               price: 2
            },
         ],
      },
      {
         isManu: false,
         transcription: "usa_nation_cases",
         type: USA_NATION_CASE,
         buttons: [
            {
               openResource: "red_tokens",
               price: 2,
            },
         ],
      },
      /*{
         isManu: false,
         transcription: "china_new_year_cases",
         type: CHINA_NEW_YEAR_CASE,
         buttons: [
            {
               openResource: "gold",
               price: 250,
            },
            {
               openResource: "tokens",
               price: 1,
            },
            {
               openResource: "red_tokens",
               price: 1,
            },
         ],
      },*/
      {
         isManu: false,
         transcription: "td_support_cases",
         type: TD_SUPPORT_CASE,
         buttons: [
            {
               openResource: "red_tokens",
               price: 2,
            },
         ],
      },
   ]

   return (
      <div className="eventcases">
         <div className="eventcases__container _container">
            <div className="eventcases__bg"></div>
            <div className="eventcases__content">
               <div className="shop__content-title">
                  <div className="_glass shop_title">
                     <h2>Exclusive Containers</h2>
                     <img src="img/resources/red_tokens.png" alt="" />
                  </div>
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