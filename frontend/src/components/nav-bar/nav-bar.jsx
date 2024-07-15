import React from "react";
import "../../css/nav-bar.css";
import { NavBarLayout } from "./ui/nav-bar-layout";

import { NavBarStorage } from "./ui/nav-bar-storage";
import { NavBarExchange } from "./ui/nav-bar-exchange";
import { NavBarName } from "./ui/nav-bar-name";
import { NavBarGold } from "./ui/nav-bar-gold";
import { NavBarTokens } from "./ui/nav-bar-tokens";
import { NavBarRedTokens } from "./ui/nav-bar-red-tokens";

export function NavBar({
  playerData,
  setActiveStorage,
  setActiveExchange,
  addComment,
  isMenu,
  modalStorageActive,
  modalExchangeActive,
})  {
  if (playerData !== null && playerData.userData !== undefined) {
    console.log(playerData.userData[0].id);
  }

  return (
    <>
      <nav className={`nav _glass ${isMenu ? "active" : ""}`}>
        {playerData && (
          <NavBarLayout
            storageBlock={<NavBarStorage setActiveStorage={setActiveStorage} modalStorageActive={modalStorageActive} />}
            exchangeBlock={
              <NavBarExchange setActiveExchange={setActiveExchange} modalExchangeActive={modalExchangeActive} />
            }
            nameBlock={<NavBarName name={playerData.name} />}
            goldBlock={<NavBarGold gold={playerData.gold} />}
            tokensBlock={
              <NavBarTokens tokens={playerData.tokens} addComment={addComment} />
            }
            redTokensBlock={<NavBarRedTokens redTokens={playerData.red_tokens} />}
          />
        )}
      </nav>
    </>
  );
}
