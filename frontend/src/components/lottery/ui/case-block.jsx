import { useState } from "react";
import { InfoBlock } from "./info-block";

export function CaseBlock({ caseData, playerData, setModalOpenCaseAnimation }) {
  const [isBack, setIsBack] = useState(false);
  let amount = caseData.transcription;

  return (
    <div className="caseblock-container">
      <div className={"caseblock" + (isBack ? " back-open" : "")}>
        <div className="_glass caseblock-side caseblock-front">
          <div className="caseblock__main">
            {caseData.isManu && (
              <div className="caseblock__main-amount absolute-left">x{playerData && (+playerData[amount])}</div>
            )}
            <button className="caseblock__main-moreinfo absolute absolute-right" onClick={() => setIsBack(true)}>
              <img src="img/background/info.png" alt="INFO_IMG" />
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
          <div className="caseblock__back-infoblock">
            <h3 className="caseblock__main-amount absolute-left">
              <img src={`img/cases/${caseData.transcription}.png`} alt="CASE_IMG" /> Шанси:
            </h3>
            <button className="caseblock__main-moreinfo absolute absolute-right" onClick={() => setIsBack(false)}>
              <img src="img/background/info.png" alt="INFO_IMG" />
            </button>
          </div>
          {caseData.type.map((item, index) => {
              if (item.items && Array.isArray(item.items)) {

                const arrayProbability = item.probability;
                const totalProbability = item.items.reduce((acc, subItem) => acc + subItem.probability, 0);
            
                return item.items.map((subItem, subIndex) => {
                  const modifiedSubItem = {
                    ...subItem,
                    probability: arrayProbability / totalProbability * subItem.probability
                  };
            
                  return (
                    <InfoBlock 
                      item={modifiedSubItem} 
                      index={`${index}-${subIndex}`} 
                      key={`${index}-${subIndex}`} 
                    />
                  );
                });
              } else {
              return (
                <InfoBlock item={item} index={index} key={index} />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
