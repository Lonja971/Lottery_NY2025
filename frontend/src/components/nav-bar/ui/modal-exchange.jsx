import { useState } from "react";
import "../../../css/exchange.css";
import { ItemBlock } from "../../uikit/item-block";
import { EXCHANGE } from "../../constants";
import axios from "axios";

export function ModalExchange({ setIsUpdated, setActive, playerData, addMessage }) {
  const [exchangeResources, setExchangeResources] = useState({
    exchangeRes: null,
    getRes: null,
  });
  const [rangeValue, setRangeValue] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const handleSetIsUpdated = () => {
    setIsUpdated(true);
  }

  function handleSendExchange() {
    if (rangeValue <= 0) {
      addMessage('not_enough_v2');
    } else {
      axios.post('http://NY2025/backend/api/exchangeResources.php', {
        playerId: playerData.id,
        exchange_res: exchangeResources.exchangeRes,
        get_res: exchangeResources.getRes,
        range_value: rangeValue,
      })
      .then(response => {
        if (response.data.status === 'success') {
          addMessage("added", "resource", response.data.added_amount, response.data.added_resource);
        } else {
          addMessage('not_enough_v2');
        }
        handleSetIsUpdated();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }
  }

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
      const minExchangeValue = EXCHANGE[exchangeResources.getRes][resource].exchangeValue;
      const playerResourceAmount = playerData[resource];
      setRangeValue(playerResourceAmount >= minExchangeValue ? minExchangeValue : 0);
    }
  };

  const handleGetResClick = (resource) => {
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

  return (
    <div className="exchange">
      <div className="_glass exchange__container _container">
        <div className={`exchange__resources ${ exchangeResources.exchangeRes === null || exchangeResources.getRes === null ? "settings" : "" }`}>
          <div
            className={`exchange__resources-exchangeRes exch-item ${
              exchangeResources.getRes === null ? "not-active" : ""
            }`}
          >
            {exchangeResources.exchangeRes !== null ? (
              <ItemBlock
                type="resource"
                resource={exchangeResources.exchangeRes}
                value={playerData[exchangeResources.exchangeRes]}
              />
            ) : (
              <button className="btn exchange-item">+</button>
            )}
            {exchangeResources.getRes !== null && (
              <div className="exch-menu exch-exchangeblock-allitems">
                {Object.keys(EXCHANGE[exchangeResources.getRes]).map(
                  (key, index) => (
                    <button
                      key={index}
                      className="exchange-btn"
                      onClick={() => handleExchangeResClick(key)}
                    >
                      <ItemBlock
                        type="resource"
                        resource={EXCHANGE[exchangeResources.getRes][key].exchange}
                        value={playerData[EXCHANGE[exchangeResources.getRes][key].exchange]}
                      />
                    </button>
                  )
                )}
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
          <div className="exchange__resources-getRes exch-item">
            {exchangeResources.getRes !== null ? (
              <ItemBlock
                type="resource"
                resource={exchangeResources.getRes}
                value={playerData[exchangeResources.getRes]}
              />
            ) : (
              <button className="btn exchange-item">+</button>
            )}
            <div className="exch-menu exch-getblock-allitems">
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
          <div className="exchange__range">
            <div className="exchange__range-comment">
              <div>
                Співвідношення: ( { EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].exchangeValue } : { EXCHANGE[exchangeResources.getRes][exchangeResources.exchangeRes].getValue } )
              </div>
              <div>
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
                <button className="btn _glass" onClick={handleSendExchange}>
                  Обміняти
                  <div className="line line-top"></div>
                  <div className="line line-right"></div>
                  <div className="line line-bottom"></div>
                  <div className="line line-left"></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
