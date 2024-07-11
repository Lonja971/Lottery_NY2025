import React from "react";
import "../../css/lottery.css";
import { LEGENDARY_CASE, MYTHICAL_CASE, RARE_CASE, REGULAR_CASE, SPECIAL_CASE, MAIN_CASE } from "../constants";
export function Lottery({ playerData, addMessage, setModalOpenCaseAnimation }) {
  const handleAddMessage = () => {
    addMessage(10000, "gold");
  };

  return (
    <div className="lottery">
      <div className="lottery__container _container">
        <div className="caseblock">
          <div className="caseblock__text">Main Кейс</div>
          <img src="img/cases/main_cases.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: MAIN_CASE, caseName: 'main_cases' })
            }
          >
            Відкрити
            <div className="line line-top"></div>
            <div className="line line-right"></div>
            <div className="line line-bottom"></div>
            <div className="line line-left"></div>
          </button>
        </div>
        <div className="caseblock">
          <div className="caseblock__text">Звичайний Кейс {playerData && ("( x" + playerData.regular_cases + " )")}</div>
          <img src="img/cases/regular_cases.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: REGULAR_CASE, caseName: 'regular_cases' })
            }
          >
            Відкрити
            <div className="line line-top"></div>
            <div className="line line-right"></div>
            <div className="line line-bottom"></div>
            <div className="line line-left"></div>
          </button>
        </div>
        <div className="caseblock">
          <div className="caseblock__text">Особливий Кейс {playerData && ("( x" + playerData.special_cases + " )")}</div>
          <img src="img/cases/special_cases.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: SPECIAL_CASE, caseName: 'special_cases' })
            }
          >
            Відкрити
            <div className="line line-top"></div>
            <div className="line line-right"></div>
            <div className="line line-bottom"></div>
            <div className="line line-left"></div>
          </button>
        </div>
        <div className="caseblock">
          <div className="caseblock__text">Рідкісний Кейс {playerData && ("( x" + playerData.rare_cases + " )")}</div>
          <img src="img/cases/rare_cases.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: RARE_CASE, caseName: 'rare_cases' })
            }
          >
            Відкрити
            <div className="line line-top"></div>
            <div className="line line-right"></div>
            <div className="line line-bottom"></div>
            <div className="line line-left"></div>
          </button>
        </div>
        <div className="caseblock">
          <div className="caseblock__text">Міфічний Кейс {playerData && ("( x" + playerData.mythical_cases + " )")}</div>
          <img src="img/cases/mythical_cases.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: MYTHICAL_CASE, caseName: 'mythical_cases' })
            }
          >
            Відкрити
            <div className="line line-top"></div>
            <div className="line line-right"></div>
            <div className="line line-bottom"></div>
            <div className="line line-left"></div>
          </button>
        </div>
        <div className="caseblock">
          <div className="caseblock__text">Легендарний Кейс {playerData && ("( x" + playerData.legendary_cases + " )")}</div>
          <img src="img/cases/legendary_cases.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: LEGENDARY_CASE, caseName: 'legendary_cases' })
            }
          >
            Відкрити
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
