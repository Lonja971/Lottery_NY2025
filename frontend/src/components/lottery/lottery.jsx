import React, { useState } from "react";
import "../../css/lottery.css";
import { OpeningCasesLogic } from "../cases/opening-cases-logic";
import { LEGENDARY_CASE, REGULAR_CASE } from "../constants";

export function Lottery({ addMessage }) {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleOpenCase = () => {
    const caseResourcesInfo = LEGENDARY_CASE;
    OpeningCasesLogic(caseResourcesInfo, setDroppedItems);
  };

  const handleAddMessage = () => {
    addMessage(10000, "gold");
  };

  return (
    <div className="lottery">
      <div className="lottery__container _container">
        <button className="btn _glass" onClick={handleOpenCase}>
          {droppedItems.length > 0
            ? droppedItems.map((item, index) => (
                <div key={index}>{item.amount} {item.name}</div>
              ))
            : "Немає"}
          <div className="line line-top"></div>
          <div className="line line-right"></div>
          <div className="line line-bottom"></div>
          <div className="line line-left"></div>
        </button>
        <div className="caseblock">
          <div className="caseblock__text">Кейс</div>
          <img src="img/cases/main_case.png" alt="CASE_IMG" />
          <button className="btn _glass" onClick={handleAddMessage}>
            Відкрий
            <div className="line line-top"></div>
            <div className="line line-right"></div>
            <div className="line line-bottom"></div>
            <div className="line line-left"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
