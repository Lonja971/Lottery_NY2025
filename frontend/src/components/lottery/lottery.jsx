import React from "react";
import "../../css/lottery.css";
import { LEGENDARY_CASE, MYTHICAL_CASE, RARE_CASE, REGULAR_CASE, SPECIAL_CASE, MAIN_CASE } from "../constants";
import { CaseBlock } from "./ui/case-block";

export function Lottery({ playerData, addMessage, setModalOpenCaseAnimation }) {

  const handleAddMessage = () => {
    addMessage(10000, "gold");
  };

  const casesData = [
    {
      name: "Main Кейс",
      isManu: false,
      transcription: "main_cases",
      type: MAIN_CASE,
      extra_resources: [
        {
          amounts: 1,
          case_name: "regular_cases",
          probability: 40,
        },
        {
          amounts: 1,
          case_name: "special_cases",
          probability: 32,
        },
        {
          amounts: 1,
          case_name: "rare_cases",
          probability: 18,
        },
        {
          amounts: 1,
          case_name: "mythical_cases",
          probability: 7,
        },
        {
          amounts: 1,
          case_name: "legendary_cases",
          probability: 3,
        },
      ],
      buttons: [
        {
          openResource: "gold",
          price: 200,
        },
        {
          openResource: "tokens",
          price: 2,
        },
      ],
    },{
      name: "Звичайний Кейс",
      isManu: true,
      transcription: "regular_cases",
      type: REGULAR_CASE,
      buttons: [
        {
          openResource: "regular_cases",
          price: 1,
        },
      ],
    },{
      name: "Особливий Кейс",
      isManu: true,
      transcription: "special_cases",
      type: SPECIAL_CASE,
      buttons: [
        {
          openResource: "special_cases",
          price: 1,
        },
      ],
    },{
      name: "Рідкісний Кейс",
      isManu: true,
      transcription: "rare_cases",
      type: RARE_CASE,
      buttons: [
        {
          openResource: "rare_cases",
          price: 1,
        },
      ],
    },{
      name: "Міфічний Кейс",
      isManu: true,
      transcription: "mythical_cases",
      type: MYTHICAL_CASE,
      buttons: [
        {
          openResource: "mythical_cases",
          price: 1,
        },
      ],
    },{
      name: "Легендарний Кейс",
      isManu: true,
      transcription: "legendary_cases",
      type: LEGENDARY_CASE,
      buttons: [
        {
          openResource: "legendary_cases",
          price: 1,
        },
      ],
    },
  ]

  return (
    <div className="lottery">
      <div className="lottery__container _container">
        {casesData.map((caseData, index) => (
          <CaseBlock
            key={index}
            caseData={caseData}
            playerData={playerData}
            setModalOpenCaseAnimation={setModalOpenCaseAnimation}
          />
        ))}
      </div>
    </div>
  );
}
