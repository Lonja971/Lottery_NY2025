import { useState } from "react";
import { RESOURCES, TANKS } from "../../constants";

export function CaseBlock({ caseData, playerData, setModalOpenCaseAnimation }) {
  const [isBack, setIsBack] = useState(false);
  let amount = caseData.transcription;

  const formatNumber = (number) => {
    return number >= 1000 ? (number / 1000) + 'k' : number;
  };

  return (
    <div className="caseblock-container">
      <div className={"caseblock" + (isBack ? " back-open" : "")}>
        <div className="_glass caseblock-side caseblock-front">
          <div className="caseblock__main">
            {caseData.isManu && (
              <div className="caseblock__main-amount absolute-left">x{playerData && (+playerData[amount])}</div>
            )}
            <button className="caseblock__main-moreinfo absolute-right" onClick={() => setIsBack(true)}>
              <img src="img/background/info_v2.png" alt="INFO_IMG" />
            </button>
            <img className="case-img" src={`img/cases/${caseData.transcription}.png`} alt="CASE_IMG" />
          </div>
          <div className="caseblock__info">
            <div className="caseblock__text">
              <h3>{caseData.name}</h3>
              {
              //<p>Удачі вибити щось цінне командире!</p>
              }
            </div>
            <div className="buttons-block">
              {caseData.buttons.map((button, index) => {
                const isDisabled = playerData && playerData[button.openResource] < button.price;
                return (
                  <button
                    key={index}
                    className={`btn _glass ${isDisabled ? "btn-closed" : ""}`}
                    onClick={() =>
                      setModalOpenCaseAnimation({
                        isOpen: true,
                        type: caseData.type,
                        caseName: caseData.transcription,
                        openResource: button.openResource,
                      })
                    }
                  >
                    {button.price} <img src={`img/resources/${button.openResource}.png`} alt="CASE_IMG" />
                    <div className="line line-top"></div>
                    <div className="line line-right"></div>
                    <div className="line line-bottom"></div>
                    <div className="line line-left"></div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="_glass caseblock-side caseblock-back">
          <h3 className="caseblock__main-amount absolute-left"> <img src={"img/cases/" + caseData.transcription + ".png"} alt="CASE_IMG" /> Шанси:</h3>
          <button className="caseblock__main-moreinfo absolute-right" onClick={() => setIsBack(false)}>
            <img src="img/background/info_v2.png" alt="INFO_IMG" />
          </button>
          {caseData.extra_resources !== undefined ? caseData.extra_resources.map((item, index) => (
            <div className="info-block" key={item.case_name + index}>
              <div className="back-info">
                <p>{ item.amounts }</p>
                <p>
                  <img src={"img/cases/" + item.case_name + ".png"} alt="CASE" />
                </p>
              </div>
              <div className="back-line"></div>
              <div className="back-procents">
                {item.probability + "%"}
              </div>
            </div>
          )) : ""}
          {caseData.type.map((item, index) => (
            item.type !== 'tank' ? (
              <div className="info-block" key={item.type + index}>
                <div className="back-info">
                  {Array.isArray(item.amounts) && (
                    <div>
                      <p>
                        {item.amounts.length === 1 ? (
                          formatNumber(item.amounts[0])
                        ) : (
                          "" + formatNumber(Math.min(...item.amounts)) + " - " + formatNumber(Math.max(...item.amounts)) + ""
                        )}
                      </p>
                    </div>
                  )}
                  <p>
                    <img src={"img/resources/" + item.type + ".png"} alt="RES" />
                  </p>
                </div>
                <div className="back-line"></div>
                <div className="back-procents">
                  {item.probability + "%"}
                </div>
              </div>
            ) : (
              <div className="info-block info-block-tank" key={item.type + index}>
                <div className={"back-info " + ( TANKS[item.id].land ? TANKS[item.id].land : "default" )}>
                  {TANKS[item.id].type !== "camo" ? (
                    <div>
                      <img className="tank-img" src={"img/icons/" + TANKS[item.id].type + ".png"} alt="TYPE" />
                    </div>
                  ) : (
                    <div>
                      <span className="camo">камуфляж</span>
                    </div>
                  )}
                  <p>{TANKS[item.id].name + " "}</p>
                </div>
                <div className="back-procents">
                  {item.probability + "%"}
                </div>
                <div className="line line-top"></div>
                <div className="line line-right"></div>
                <div className="line line-bottom"></div>
                <div className="line line-left"></div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
