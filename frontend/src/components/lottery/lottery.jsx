import React from "react";
import "../../css/lottery.css";
import { LEGENDARY_CASE, MYTHICAL_CASE, RARE_CASE, REGULAR_CASE, SPECIAL_CASE, MAIN_CASE } from "../constants";
import { CaseBlock } from "../uikit/case-block";

export function Lottery({ playerData, addMessage, setModalOpenCaseAnimation, playerGuarantors }) {

  const handleAddMessage = () => {
    addMessage(10000, "gold");
  };

  const casesData = [
    {
      isManu: false,
      transcription: "main_cases",
      type: MAIN_CASE,
      buttons: [
        {
          openResource: "gold",
          price: 250,
        },
        {
          openResource: "tokens",
          price: 1,
        },
      ],
    }, {
      isManu: true,
      transcription: "regular_cases",
      type: REGULAR_CASE,
      buttons: [
        {
          openResource: "regular_cases",
          price: 1,
        },
      ],
    }, {
      isManu: true,
      transcription: "special_cases",
      type: SPECIAL_CASE,
      buttons: [
        {
          openResource: "special_cases",
          price: 1,
        },
      ],
    }, {
      isManu: true,
      transcription: "rare_cases",
      type: RARE_CASE,
      buttons: [
        {
          openResource: "rare_cases",
          price: 1,
        },
      ],
    }, {
      isManu: true,
      transcription: "mythical_cases",
      type: MYTHICAL_CASE,
      buttons: [
        {
          openResource: "mythical_cases",
          price: 1,
        },
      ],
    }, {
      isManu: true,
      transcription: "legendary_cases",
      type: LEGENDARY_CASE,
      buttons: [
        {
          openResource: "legendary_cases",
          price: 1,
        },
      ],
    }
  ]

  return (
    <div className="lottery">
      <div className="_container">
        <div className="cases__content-title">
          <h2 className="_glass">Новорічні Контейнери <img src="img/resources/tokens.png" alt="" /></h2>
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
  );
}
