import React from "react";
import "../../css/lottery.css";

export function Lottery({ addMessage }) {
  const handleaddMessage = () => {
    addMessage(10000, "gold");
  };

  return (
    <div className="lottery">
      <div className="lottery__container _container">
        <div className="caseblock">
          <div className="caseblock__text">Кейс</div>
          <img src="img/cases/main_case.png" alt="CASE_IMG" />
          <button className="btn _glass" onClick={handleaddMessage}>
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
