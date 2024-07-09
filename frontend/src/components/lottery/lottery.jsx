import React from "react";
import "../../css/lottery.css";
import { LEGENDARY_CASE, MYTHICAL_CASE, RARE_CASE, REGULAR_CASE, SPECIAL_CASE, MAIN_CASE } from "../constants";
export function Lottery({ addMessage, setModalOpenCaseAnimation }) {
  const handleAddMessage = () => {
    addMessage(10000, "gold");
  };

  return (
    <div className="lottery">
      <div className="lottery__container _container">
        <div className="caseblock">
          <div className="caseblock__text">Main Кейс</div>
          <img src="img/cases/main_case.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: MAIN_CASE, caseName: 'main_case' })
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
          <div className="caseblock__text">Звичайний Кейс</div>
          <img src="img/cases/regular_case.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: REGULAR_CASE, caseName: 'regular_case' })
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
          <div className="caseblock__text">Особливий Кейс</div>
          <img src="img/cases/special_case.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: SPECIAL_CASE, caseName: 'special_case' })
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
          <div className="caseblock__text">Рідкісний Кейс</div>
          <img src="img/cases/rare_case.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: RARE_CASE, caseName: 'rare_case' })
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
          <div className="caseblock__text">Міфічний Кейс</div>
          <img src="img/cases/mythical_case.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: MYTHICAL_CASE, caseName: 'mythical_case' })
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
          <img src="img/cases/legendary_case.png" alt="CASE_IMG" />
          <button
            className="btn _glass"
            onClick={() =>
              setModalOpenCaseAnimation({ isOpen: true, type: LEGENDARY_CASE, caseName: 'legendary_case' })
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
