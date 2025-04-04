import { useState } from "react";

export function NavBarExchange({ modalExchangeActive, handleModalOpen}) {
  const [exchangeRotateNum, setExchangeRotateNum] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  return (
    <li
      onMouseEnter={exchangeRotateAnima}
      className={`nav__menu-item item-squard exchange-anima ${modalExchangeActive ? "active" : ""}`}
      onClick={() => handleModalOpen("echangeModal")}
    >
      <img
        style={{ transform: `rotateZ(${exchangeRotateNum}deg)` }}
        src="img/servise/exchange.png"
        alt="RES"
      />
      <p>Exchange</p>
    </li>
  );
}
