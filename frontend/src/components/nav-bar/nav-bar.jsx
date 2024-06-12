import React from "react";
import "../../css/nav-bar.css";
import { PLAYER } from ".././constants";
import { NavBarLayout } from "./ui/nav-bar-layout";

import { NavBarStorage } from "./ui/nav-bar-storage";
import { NavBarExchange } from "./ui/nav-bar-exchange";
import { NavBarName } from "./ui/nav-bar-name";
import { NavBarGold } from "./ui/nav-bar-gold";
import { NavBarTokens } from "./ui/nav-bar-tokens";
import { NavBarRedTokens } from "./ui/nav-bar-red-tokens";

export function NavBar({ setActiveStorage, setActiveExchange, addComment }) {
  return (
    <NavBarLayout
      storageBlock={<NavBarStorage setActiveStorage={setActiveStorage} />}
      exchangeBlock={<NavBarExchange setActiveExchange={setActiveExchange} />}
      nameBlock={<NavBarName name={PLAYER.name} />}
      goldBlock={<NavBarGold gold={PLAYER.gold} />}
      tokensBlock={<NavBarTokens tokens={PLAYER.tokens} addComment={addComment} />}
      redTokensBlock={<NavBarRedTokens redTokens={PLAYER.redTokens} />}
    />
  );
}
