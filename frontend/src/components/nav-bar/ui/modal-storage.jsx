import { ItemBlock } from "../../uikit/item-block";
import { PLAYER } from "../../constants";
import "../../../css/storage.css";
import { TankBlock } from "../../uikit/tank-block";

export function ModalStorage() {

  return (
    <ModalStorageLayout
      goldItem={ <ItemBlock  resource="gold" value={PLAYER.gold} /> }
      silverItem={ <ItemBlock  resource="silver" value={PLAYER.silver} /> }
      tokensItem={ <ItemBlock  resource="tokens" value={PLAYER.tokens} /> }
      redTokensItem={ <ItemBlock  resource="red_tokens" value={PLAYER.red_tokens} /> }
      tanksItem={ <ItemBlock  resource="tanks" value={PLAYER.tanks} /> }
      premiumAkkItem={ <ItemBlock  resource="premium_akk" value={PLAYER.premium_akk} /> }
      drawingsItem={ <ItemBlock  resource="drawings" value={PLAYER.drawings} /> }

      Obj_490Item={ <TankBlock  tank="obj_490" /> }
      MausItem={ <TankBlock  tank="maus" /> }
      Pz_b2Item={ <TankBlock  tank="pz_b2" /> }
    >
      {PLAYER.name}
    </ModalStorageLayout>
  )
}

function ModalStorageLayout({ children, goldItem, silverItem, tokensItem, redTokensItem, tanksItem, premiumAkkItem, drawingsItem, Obj_490Item, MausItem, Pz_b2Item }) {

  return (
    <div className="storage">
      <div className="storage__user">
        <h1 className="_glass">{children}</h1>
      </div>
      <div className="storage__resources">
        <div className="storage__resources-block">
          {goldItem}
          {silverItem}
          {tokensItem}
          {redTokensItem}
          {tanksItem}
          {premiumAkkItem}
          {drawingsItem}
        </div>
        <div className="storage__resources-block">
          {Obj_490Item}
          {MausItem}
          {Pz_b2Item}
        </div>
      </div>
    </div>
  )
}
