export function CaseBlock({ caseData, playerData, setModalOpenCaseAnimation }){

  let amount = caseData.transcription;

  return (
    <div className="caseblock">
      <div className="caseblock__main">
        {caseData.isManu && (
          <div className="_glass caseblock__main-amount">x{playerData && (+playerData[amount])}</div>
        )}
        <button className="btn _glass caseblock__main-moreinfo">
          <img src="img/background/info.png" alt="INFO_IMG" />
          <div className="line line-top"></div>
          <div className="line line-right"></div>
          <div className="line line-bottom"></div>
          <div className="line line-left"></div>
        </button>
        <img className="case-img" src={`img/cases/${caseData.transcription}.png`} alt="CASE_IMG" />
      </div>
      <div className="caseblock__info">
        <h3 className="caseblock__text">{caseData.name}</h3>
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
  );
}