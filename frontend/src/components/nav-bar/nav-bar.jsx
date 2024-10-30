import React, { useState, useEffect } from "react";
import "../../css/nav-bar.css";
import { NavBarLayout } from "./ui/nav-bar-layout";

import { NavBarStorage } from "./ui/nav-bar-storage";
import { NavBarExchange } from "./ui/nav-bar-exchange";
import { NavBarName } from "./ui/nav-bar-name";
import { NavBarGold } from "./ui/nav-bar-gold";
import { NavBarTokens } from "./ui/nav-bar-tokens";
import { NavBarRedTokens } from "./ui/nav-bar-red-tokens";
import { NavBarDrawings } from "./ui/nav-bar-drawings";

export function NavBar({
  playerData,
  newToken,
  setNewToken,
  setActiveStorage,
  setActiveExchange,
  addComment,
  isMenu,
  setIsMenu,
  modalStorageActive,
  modalExchangeActive,
  addMessage,
  setIsUpdated,
})  {
  const [height, setHeight] = useState(window.innerHeight);

  //---Контроль-height-nav-блоку
  const setDynamicHeight = () => {
      console.log("Yes")
      setHeight(window.innerHeight);
  };
  useEffect(() => {
      setDynamicHeight();
      window.addEventListener('resize', setDynamicHeight);
      return () => window.removeEventListener('resize', setDynamicHeight);
  }, []);


  if (playerData !== null && playerData.userData !== undefined) {
    console.log(playerData.userData[0].id);
  }
  function handleModalOpen(name) {
    if (isMenu) {
      setIsMenu(false);
    }
    switch (name){
      case "storageModal":
        if (modalExchangeActive){
          setActiveExchange(false);
        }
        setActiveStorage(!modalStorageActive);
				break;
      case "echangeModal":
        if (modalStorageActive){
          setActiveStorage(false);
        }
        setActiveExchange(!modalExchangeActive);
        break;
      default:
        break;
    }

  }

  return (
    <>
      <nav style={{ height: `${height}px` }} className={`nav _glass ${isMenu ? "active" : ""}`}>
        {playerData && (
          <NavBarLayout
            storageBlock={<NavBarStorage handleModalOpen={handleModalOpen} setActiveStorage={setActiveStorage} modalStorageActive={modalStorageActive}/>}
            exchangeBlock={
              <NavBarExchange handleModalOpen={handleModalOpen} setActiveExchange={setActiveExchange} modalExchangeActive={modalExchangeActive}/>
            }
            nameBlock={<NavBarName name={playerData.name} />}
            goldBlock={<NavBarGold gold={playerData.gold} />}
            tokensBlock={
              <NavBarTokens setIsUpdated={setIsUpdated} playerData={playerData} tokens={playerData.tokens} newToken={newToken} setNewToken={setNewToken} addMessage={addMessage} />
            }
            redTokensBlock={<NavBarRedTokens redTokens={playerData.red_tokens} />}
            drawingsBlock={<NavBarDrawings drawings={playerData.drawings} />}
          />
        )}
      </nav>
    </>
  );
}
