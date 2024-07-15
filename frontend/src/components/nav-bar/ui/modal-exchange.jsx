import { useState, useEffect } from "react";
import "../../../css/exchange.css";
import { ItemBlock } from "../../uikit/item-block";
import { EXCHANGE } from "../../constants";

export function ModalExchange({ setActive, playerData, addMessage }) {
  const [exchangeResources, setExchangeResources] = useState({
    exchangeRes: null,
    getRes: null,
  });
  const [rangeValue, setRangeValue] = useState(0);

  const handleChange = (event) => {
    setRangeValue(event.target.value);
  };

  const handleExchangeResClick = (resource) => {
    setExchangeResources((prevState) => ({
      ...prevState,
      exchangeRes: resource,
    }));
    if (
      exchangeResources.getRes &&
      EXCHANGE[exchangeResources.getRes] &&
      EXCHANGE[exchangeResources.getRes][resource]
    ) {
      setRangeValue(EXCHANGE[exchangeResources.getRes][resource].exchangeValue);
    }
  };

  const handleGetResClick = (resource) => {
    setExchangeResources((prevState) => ({
      ...prevState,
      getRes: resource,
      exchangeRes: null,
    }));
    if (resource && exchangeResources.exchangeRes && EXCHANGE[resource][exchangeResources.exchangeRes]) {
      setRangeValue(EXCHANGE[resource][exchangeResources.exchangeRes].exchangeValue);
    }
  };

  useEffect(() => {
    if (
      exchangeResources.exchangeRes &&
      exchangeResources.getRes &&
      EXCHANGE[exchangeResources.getRes] &&
      EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes]
    ) {
      const minExchangeValue = EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].exchangeValue;
      const userResource = playerData[exchangeResources.exchangeRes];
      if (userResource < minExchangeValue) {
        setRangeValue(0); // Встановлюємо на 0, якщо ресурсів менше ніж потрібно
      } else {
        setRangeValue(minExchangeValue);
      }
    }
  }, [exchangeResources.exchangeRes, exchangeResources.getRes, playerData]);

  function getData() {
    console.log(exchangeResources.exchangeRes);
    console.log(exchangeResources.getRes);
    console.log(rangeValue);

    if(rangeValue === 0){
      addMessage("not_enough_v2");
    }
  }

  return (
    <div className="exchange">
      <div className="exchange__container _container">
        <div className="_glass exchange__exchange">
          {exchangeResources.exchangeRes === null ? (
            <>
              <div
                className={`exchange-exchblock ${
                  exchangeResources.getRes === null ? "not-active" : ""
                }`}
              >
                <button className="add-block _glass">+</button>
                {exchangeResources.getRes !== null && (
                  <div className="_glass exchange__resources exch-exchblock-allitems">
                    {Object.keys(EXCHANGE[exchangeResources.getRes]).map((key, index) => (
                      <button
                        key={index}
                        className="exchange-btn"
                        onClick={() => handleExchangeResClick(key)}
                      >
                        <ItemBlock type="resource" resource={EXCHANGE[exchangeResources.getRes][key].exchange} value={playerData[EXCHANGE[exchangeResources.getRes][key].exchange]} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="exchange-line">
                <img
                  className="null-block"
                  src="img/background/exchange-arrow.png"
                  alt="ARROW"
                />
              </div>
              <div className="exchange-getblock">
                {exchangeResources.getRes !== null ? (
                  <ItemBlock type="resource" resource={exchangeResources.getRes} value={playerData[exchangeResources.getRes]} />
                ) : (
                  <button className="add-block _glass">+</button>
                )}
                <div className="_glass exchange__resources exch-getblock-allitems">
                  <button className="exchange-btn" onClick={() => handleGetResClick("gold")}>
                    <ItemBlock type="resource" resource="gold" value={playerData.gold} />
                  </button>
                  <button className="exchange-btn" onClick={() => handleGetResClick("red_tokens")}>
                    <ItemBlock type="resource" resource="red_tokens" value={playerData.red_tokens} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="exchange-exchblock">
                <ItemBlock type="resource" resource={exchangeResources.exchangeRes} value={playerData[exchangeResources.exchangeRes]} />
                <div className="_glass exchange__resources exch-exchblock-allitems">
                    {Object.keys(EXCHANGE[exchangeResources.getRes]).map((key, index) => (
                      <button
                        key={index}
                        className="exchange-btn"
                        onClick={() => handleExchangeResClick(key)}
                      >
                        <ItemBlock type="resource" resource={EXCHANGE[exchangeResources.getRes][key].exchange} value={playerData[EXCHANGE[exchangeResources.getRes][key].exchange]} />
                      </button>
                    ))}
                  </div>
              </div>
              <div className="exchange-line">
                <div className="exchange-line__comment">
                  <p>
                    {Number(rangeValue).toLocaleString()}{" "}
                    <img src={"img/resources/" + exchangeResources.exchangeRes + ".png"} alt="EXCH_RES" />
                  </p>
                  <img className="exchange-arrow" src={"img/background/exchange-arrow.png"} alt="EXCH_RES" />
                  <p>
                    { (rangeValue / EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].exchangeValue) * EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].getValue }{" "}
                    <img src={"img/resources/" + exchangeResources.getRes + ".png"} alt="EXCH_RES" />
                  </p>
                </div>
                <input
                  className="exchanger-range"
                  type="range"
                  min={EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].exchangeValue} 
                  step={EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].exchangeValue}
                  max={playerData[exchangeResources.exchangeRes]}
                  value={rangeValue}
                  onChange={handleChange}
                />
              </div>
              <div className="exchange-getblock">
                <ItemBlock type="resource" resource={exchangeResources.getRes} value={playerData[exchangeResources.getRes]} />
                <div className="_glass exchange__resources exch-getblock-allitems">
                  <button className="exchange-btn" onClick={() => handleGetResClick("gold")}>
                    <ItemBlock type="resource" resource="gold" value={playerData.gold} />
                  </button>
                  <button className="exchange-btn" onClick={() => handleGetResClick("red_tokens")}>
                    <ItemBlock type="resource" resource="red_tokens" value={playerData.red_tokens} />
                  </button>
                </div>
              </div>
              <button className="btn _glass" onClick={getData}>Обміняти</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}