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
          <div className="caseblock__main">
            <button className="btn _glass caseblock__main-moreinfo">
              <img src="img/background/info.png" alt="INFO_IMG" />
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
            <img className="case-img" src="img/cases/main_cases.png" alt="CASE_IMG" />
          </div>
          <div className="caseblock__info">
            <h3 className="caseblock__text">Main Кейс</h3>
            <div className="buttons-block">
              <button
                className={`btn _glass ${playerData && playerData.gold < 200 ? "btn-closed" : ""}`}
                onClick={() =>
                  setModalOpenCaseAnimation({ isOpen: true, type: MAIN_CASE, caseName: 'main_cases', openResource: "gold" })
                }
              >
                200 <img src="img/resources/gold.png" alt="CASE_IMG" />
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
              <button
                className={`btn _glass ${playerData && playerData.tokens < 2 ? "btn-closed" : ""}`}
                onClick={() =>
                  setModalOpenCaseAnimation({ isOpen: true, type: MAIN_CASE, caseName: 'main_cases', openResource: "gold" })
                }
              >
                2 <img src="img/resources/tokens.png" alt="CASE_IMG" />
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
            </div>
          </div>
        </div>
        <div className="caseblock">
          <div className="caseblock__main">
            <div className="_glass caseblock__main-amount">x{playerData && ( + playerData.regular_cases)}</div>
            <button className="btn _glass caseblock__main-moreinfo">
              I
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
            <img className="case-img" src="img/cases/regular_cases.png" alt="CASE_IMG" />
          </div>
          <div className="caseblock__info">
            <h3 className="caseblock__text">Звичайний Кейс</h3>
            <div className="buttons-block">
              <button
                className={`btn _glass ${playerData && playerData.regular_cases < 1 ? "btn-closed" : ""}`}
                onClick={() =>
                  setModalOpenCaseAnimation({ isOpen: true, type: REGULAR_CASE, caseName: 'regular_cases', openResource: "regular_cases" })
                }
              >
                1 <img src="img/resources/regular_cases.png" alt="CASE_IMG" />
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
            </div>
          </div>
        </div>
        <div className="caseblock">
          <div className="caseblock__main">
            <div className="_glass caseblock__main-amount">x{playerData && ( + playerData.special_cases)}</div>
            <button className="btn _glass caseblock__main-moreinfo">
              I
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
            <img className="case-img" src="img/cases/special_cases.png" alt="CASE_IMG" />
          </div>
          <div className="caseblock__info">
            <h3 className="caseblock__text">Особливий Кейс</h3>
            <div className="buttons-block">
              <button
                className={`btn _glass ${playerData && playerData.special_cases < 1 ? "btn-closed" : ""}`}
                onClick={() =>
                  setModalOpenCaseAnimation({ isOpen: true, type: SPECIAL_CASE, caseName: 'special_cases', openResource: "special_cases" })
                }
              >
                1 <img src="img/resources/special_cases.png" alt="CASE_IMG" />
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
            </div>
          </div>
        </div>
        <div className="caseblock">
          <div className="caseblock__main">
            <div className="_glass caseblock__main-amount">x{playerData && ( + playerData.rare_cases)}</div>
            <button className="btn _glass caseblock__main-moreinfo">
              I
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
            <img className="case-img" src="img/cases/rare_cases.png" alt="CASE_IMG" />
          </div>
          <div className="caseblock__info">
            <h3 className="caseblock__text">Рідкісний Кейс</h3>
            <div className="buttons-block">
              <button
                className={`btn _glass ${playerData && playerData.rare_cases < 1 ? "btn-closed" : ""}`}
                onClick={() =>
                  setModalOpenCaseAnimation({ isOpen: true, type: RARE_CASE, caseName: 'rare_cases', openResource: "rare_cases" })
                }
              >
                1 <img src="img/resources/rare_cases.png" alt="CASE_IMG" />
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
            </div>
          </div>
        </div>
        <div className="caseblock">
          <div className="caseblock__main">
            <div className="_glass caseblock__main-amount">x{playerData && ( + playerData.mythical_cases)}</div>
            <button className="btn _glass caseblock__main-moreinfo">
              I
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
            <img className="case-img" src="img/cases/mythical_cases.png" alt="CASE_IMG" />
          </div>
          <div className="caseblock__info">
            <h3 className="caseblock__text">Міфічний Кейс</h3>
            <div className="buttons-block">
              <button
                className={`btn _glass ${playerData && playerData.mythical_cases < 1 ? "btn-closed" : ""}`}
                onClick={() =>
                  setModalOpenCaseAnimation({ isOpen: true, type: MYTHICAL_CASE, caseName: 'mythical_cases', openResource: "mythical_cases" })
                }
              >
                1 <img src="img/resources/mythical_cases.png" alt="CASE_IMG" />
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
            </div>
          </div>
        </div>
        <div className="caseblock">
          <div className="caseblock__main">
            <div className="_glass caseblock__main-amount">x{playerData && ( + playerData.legendary_cases)}</div>
            <button className="btn _glass caseblock__main-moreinfo">
              I
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
            <img className="case-img" src="img/cases/legendary_cases.png" alt="CASE_IMG" />
          </div>
          <div className="caseblock__info">
            <h3 className="caseblock__text">Легендарний Кейс</h3>
            <div className="buttons-block">
              <button
                className={`btn _glass ${playerData && playerData.legendary_cases < 1 ? "btn-closed" : ""}`}
                onClick={() =>
                  setModalOpenCaseAnimation({ isOpen: true, type: LEGENDARY_CASE, caseName: 'legendary_cases', openResource: "legendary_cases" })
                }
              >
                1 <img src="img/resources/legendary_cases.png" alt="CASE_IMG" />
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
