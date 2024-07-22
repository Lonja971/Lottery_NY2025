import { useState } from "react";
import "../../../css/exchange.css";
import { ItemBlock } from "../../uikit/item-block";
import { EXCHANGE, TANKS } from "../../constants";
import axios from "axios";
import { ExchangeTankBlock } from "../../uikit/exchange-tank-block";

export function ModalExchange({ setIsUpdated, setActive, playerData, addMessage }) {

  //---ALL-STATES---

  const [openExchangePannel, setOpenExchangePannel] = useState(false);
  const [openGetPannel, setOpenGetPannel] = useState(false);

  const [exchangeRotateNum, setExchangeRotateNum] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exchangeResources, setExchangeResources] = useState({
    exchangeType: null,
    exchangeRes: null,
    getType: null,
    getRes: null,
  });
  const [rangeValue, setRangeValue] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  //---ANIMATION-OF-EXCHANGE-ICON---

  function exchangeRotateAnima() {
    if (isAnimating) return;

    const newExchangeRotateNum = exchangeRotateNum + 180;
    setExchangeRotateNum(newExchangeRotateNum);
    setIsAnimating(true);
    setTimeout(() => {
      setExchangeRotateNum((prevNum) => prevNum + 180);
    }, 800);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1100);
  }

  //---UPDATE-USER-INFO-AFTER-EXCHANGING---

  const handleSetIsUpdated = () => {
    setIsUpdated(true);
  }

  //---EXCHANGE-FUNCTION---

  function handleSendExchange() {
    if (rangeValue > 0 || exchangeResources.exchangeType === "tank") {
      axios.post('http://NY2025/backend/api/exchangeResources.php', {
        playerId: playerData.id,
        exchange_type: exchangeResources.exchangeType,
        exchange_res: exchangeResources.exchangeRes,
        get_res: exchangeResources.getRes,
        range_value: rangeValue,
      })
        .then(response => {
          if (response.data.status === 'success') {
            addMessage("added", "resource", response.data.added_amount, response.data.added_resource);

            if (exchangeResources.exchangeType === "tank") {
              setExchangeResources(prevState => ({
                ...prevState,
                exchangeType: null,
                exchangeRes: null,
              }));
            }
          } else {
            addMessage('not_enough_v2');
          }
          handleSetIsUpdated();
        })
        .catch(error => {
          console.error('There was an error!', error);
      });
    } else {
      addMessage('not_enough_v2');
    }
  }

  //---SET-EXCHANGE-VALUES---

  const handleChange = (event) => {
    setRangeValue(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let exchangeRate = EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].exchangeValue;
    let value = Math.floor(inputValue / exchangeRate) * exchangeRate;

    if (value > playerData[exchangeResources.exchangeRes]) {
      value = playerData[exchangeResources.exchangeRes];
    }
    if (value < exchangeRate) {
      value = 0;
    }
    setRangeValue(value);
  };

  const handleExchangeResClick = (type, resource) => {
    setOpenExchangePannel(!openExchangePannel);
    setOpenGetPannel(false);
    setExchangeResources((prevState) => ({
      ...prevState,
      exchangeType: type,
      exchangeRes: resource,
    }));

    if (
      exchangeResources.getRes &&
      EXCHANGE[exchangeResources.getRes] &&
      EXCHANGE[exchangeResources.getRes][resource]
    ) {
      const minExchangeValue = EXCHANGE[exchangeResources.getRes][resource].exchangeValue;
      const playerResourceAmount = playerData[resource];
      setRangeValue(playerResourceAmount >= minExchangeValue ? minExchangeValue : 0);
    }
  };

  const handleGetResClick = (resource) => {
    setOpenGetPannel(!openGetPannel);
    setOpenExchangePannel(false);
    setExchangeResources((prevState) => ({
      ...prevState,
      getRes: resource,
      exchangeRes: null,
    }));
    if (
      resource &&
      exchangeResources.exchangeRes &&
      EXCHANGE[resource] &&
      EXCHANGE[resource][exchangeResources.exchangeRes]
    ) {
      const minExchangeValue = EXCHANGE[resource][exchangeResources.exchangeRes].exchangeValue;
      const playerResourceAmount = playerData[exchangeResources.exchangeRes];
      setRangeValue(playerResourceAmount >= minExchangeValue ? minExchangeValue : 0);
    }
  };

  function setOpenExchangeFunc() {
    setOpenExchangePannel(!openExchangePannel);
    setOpenGetPannel(false);
  };
  function setOpenGetFunc() {
    setOpenGetPannel(!openGetPannel);
    setOpenExchangePannel(false);
  };

  //---ARRANGE-ALL-ELEMENTS-AT-OUTPUT----

  let orderedKeys = ["silver", "premium_akk", "drawings", "tokens", "red_tokens", "tanks"];
  if ( exchangeResources.getRes === "gold" ){
    orderedKeys = ["silver", "premium_akk", "drawings", "tokens", "red_tokens", "tanks"];
  }else if ( exchangeResources.getRes === "red_tokens" ){
    orderedKeys = ["tokens", "gold"];
  }

  const renderExchangeItems = () => {
    return orderedKeys.map((key, index) => (
      key !== "tanks" ? (
        <button
          key={index}
          className="exchange-btn"
          onClick={() => handleExchangeResClick("resource", key)}
        >
          <ItemBlock
            type="resource"
            resource={EXCHANGE[exchangeResources.getRes][key].exchange}
            value={playerData[EXCHANGE[exchangeResources.getRes][key].exchange]}
          />
        </button>
      ) : (
        playerData.userTanks.map((tank, index) => (
          <button
            key={index}
            className="exchange-btn"
            onClick={() => handleExchangeResClick("tank", tank)}
          >
            <ExchangeTankBlock
              tankInfo={tank}
            />
          </button>
        ))
      )
    ));
  };

  return (
    <div className="exchange">
      <div className="_glass exchange__container _container">
        <div className={`exchange__resources ${exchangeResources.exchangeRes === null || exchangeResources.getRes === null ? "settings" : ""}`}>
          <div
            className={`exchange__resources-exchangeRes exch-item ${exchangeResources.getRes === null ? "not-active" : ""
              }`}
          >
            {exchangeResources.exchangeRes !== null ? (
              exchangeResources.exchangeType !== "tank" ? (
                <div onClick={setOpenExchangeFunc}>
                  <ItemBlock
                    type="resource"
                    resource={exchangeResources.exchangeRes}
                    value={playerData[exchangeResources.exchangeRes]}
                  />
                </div>
              ) : (
                <div onClick={setOpenExchangeFunc}>
                  <ExchangeTankBlock
                    tankInfo={exchangeResources.exchangeRes}
                  />
                </div>
              )
            ) : (
              <button className="btn exchange-item" onClick={setOpenExchangeFunc}>+</button>
            )}
            {exchangeResources.getRes !== null && (
              <div className={`exch-menu exch-exchangeblock-allitems ${ openExchangePannel ? "open" : "" }`}>
                {renderExchangeItems()}
              </div>
            )}
          </div>
          <div className="exchange-line">
            <img
              className="null-block"
              src="img/background/arrow.png"
              alt="ARROW"
            />
          </div>
          <div className="exchange__resources-getRes exch-item">
            {exchangeResources.getRes !== null ? (
              <div onClick={setOpenGetFunc}>
                <ItemBlock
                  type="resource"
                  resource={exchangeResources.getRes}
                  value={playerData[exchangeResources.getRes]}
                />
              </div>
            ) : (
              <button className="btn exchange-item" onClick={setOpenGetFunc}>+</button>
            )}
            <div className={`exch-menu exch-getblock-allitems ${ openGetPannel ? "open" : "" }`}>
              <button className="exchange-btn" onClick={() => handleGetResClick("gold")}>
                <ItemBlock type="resource" resource="gold" value={playerData.gold} />
              </button>
              <button className="exchange-btn" onClick={() => handleGetResClick("red_tokens")}>
                <ItemBlock
                  type="resource"
                  resource="red_tokens"
                  value={playerData.red_tokens}
                />
              </button>
            </div>
          </div>
        </div>
        {exchangeResources.exchangeRes !== null && exchangeResources.getRes !== null && (
          exchangeResources.exchangeType !== "tank" ? (
            <div className="exchange__range">
              <div className="exchange__range-comment">
                <div>
                  Співвідношення: ( {EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].exchangeValue} : {EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].getValue} )
                </div>
                <div>
                  <p>
                    {Number(rangeValue).toLocaleString()}{" "}
                    <img src={"img/resources/" + exchangeResources.exchangeRes + ".png"} alt="EXCH_RES" />
                  </p>
                  <img className="exchange-arrow" src={"img/background/arrow.png"} alt="EXCH_RES" />
                  <p>
                    {(rangeValue / EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].exchangeValue) * EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].getValue}{" "}
                    <img src={"img/resources/" + exchangeResources.getRes + ".png"} alt="EXCH_RES" />
                  </p>
                </div>
              </div>
              <div className="exchange__range-input">
                <input
                  className="exchanger-range"
                  type="range"
                  min="0"
                  step={
                    EXCHANGE[exchangeResources.getRes] &&
                      EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes]
                      ? EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes]
                        .exchangeValue
                      : 1
                  }
                  max={playerData[exchangeResources.exchangeRes] || 0}
                  value={rangeValue}
                  onChange={handleChange}
                />
                <form onSubmit={handleFormSubmit} className="usersnum">
                  <input
                    className="usersnum-input"
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    min="0"
                    max={playerData[exchangeResources.exchangeRes] || 0}
                  />
                  <div className="usernum-buttonblock">
                    <button className="btn _glass usersnum-button" type="submit">
                      Ввести
                      <div className="line line-top"></div>
                      <div className="line line-right"></div>
                      <div className="line line-bottom"></div>
                      <div className="line line-left"></div>
                    </button>
                  </div>
                </form>
                <div className="exchange-submit">
                  <button className="btn _glass" onClick={handleSendExchange} onMouseEnter={exchangeRotateAnima}>
                    Обміняти <img src="img/servise/exchange.png" alt="exchange" style={{ transform: `rotateZ(${exchangeRotateNum}deg)` }} />
                    <div className="line line-top"></div>
                    <div className="line line-right"></div>
                    <div className="line line-bottom"></div>
                    <div className="line line-left"></div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="exchange__range">
              <div className="exchange__range-comment">
                <div>
                  Обміняти:
                </div>
                <div>
                  <p>
                    { TANKS[exchangeResources.exchangeRes].type !== "camo" ? (
                      <img src={"img/icons/" + TANKS[exchangeResources.exchangeRes].type + ".png"} alt="TYPE" />
                    ) : (
                      <span className="camo-text">Камуфляж</span>
                    )}
                    { TANKS[exchangeResources.exchangeRes].land !== null ? (
                      <img src={"img/flags/" + TANKS[exchangeResources.exchangeRes].land + "_big.png"} alt="LAND" />
                    ) : ""}
                    { TANKS[exchangeResources.exchangeRes].name }
                  </p>
                  <img className="exchange-arrow" src={"img/background/arrow.png"} alt="ARROW" />
                  <p>
                    { TANKS[exchangeResources.exchangeRes].exchange }
                    <img src={"img/resources/gold.png"} alt="GOLD" />
                  </p>
                </div>
              </div>
              <div className="exchange__range-input">
                <div className="exchange-submit">
                  <button className="btn _glass" onClick={handleSendExchange} onMouseEnter={exchangeRotateAnima}>
                    Обміняти <img src="img/servise/exchange.png" alt="exchange" style={{ transform: `rotateZ(${exchangeRotateNum}deg)` }} />
                    <div className="line line-top"></div>
                    <div className="line line-right"></div>
                    <div className="line line-bottom"></div>
                    <div className="line line-left"></div>
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
