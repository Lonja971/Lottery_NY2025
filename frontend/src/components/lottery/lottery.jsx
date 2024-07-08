import React from "react";
import "../../css/lottery.css";
import { LEGENDARY_CASE, REGULAR_CASE } from "../constants";

export function Lottery({ addMessage, setModalOpenCaseAnimation }) {
  const handleAddMessage = () => {
    addMessage(10000, "gold");
  };

  return (
    <div className="lottery">
      <div className="lottery__container _container">
        <div className="caseblock">
          <div className="caseblock__text">Звичайний Кейс</div>
          <img src="img/cases/main_case.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: REGULAR_CASE })
            }
          >
            Відкрий
            <div className="line line-top"></div>
            <div className="line line-right"></div>
            <div className="line line-bottom"></div>
            <div className="line line-left"></div>
          </button>
        </div>
        <div className="caseblock">
          <div className="caseblock__text">Легендарний Кейс</div>
          <img src="img/cases/main_case.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: LEGENDARY_CASE })
            }
          >
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
