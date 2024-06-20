import { ItemBlock } from "../../uikit/item-block";
import "../../../css/storage.css";
import { TankBlock } from "../../uikit/tank-block";

export function ModalStorage({ player }) {

  return (
    <>
      {player && (
        <ModalStorageLayout
          goldItem={ <ItemBlock  resource="gold" value={player.gold} /> }
          silverItem={ <ItemBlock  resource="silver" value={player.silver} /> }
          tokensItem={ <ItemBlock  resource="tokens" value={player.tokens} /> }
          redTokensItem={ <ItemBlock  resource="red_tokens" value={player.red_tokens} /> }
          tanksItem={ <ItemBlock  resource="tanks" value={player.tanks} /> }
          premiumAkkItem={ <ItemBlock  resource="premium_akk" value={player.premium_akk} /> }
          drawingsItem={ <ItemBlock  resource="drawings" value={player.drawings} /> }

          Obj_490Item={ <TankBlock  tank="obj_490" /> }
          MausItem={ <TankBlock  tank="maus" /> }
          Pz_b2Item={ <TankBlock  tank="pz_b2" /> }
        >
          {player.name}
        </ModalStorageLayout>
      )}
    </>
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
