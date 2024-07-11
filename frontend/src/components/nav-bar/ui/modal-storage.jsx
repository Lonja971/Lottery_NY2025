import { ItemBlock } from "../../uikit/item-block";
import "../../../css/storage.css";
import { ModalStorageTanks } from "./modal-storage-tanks";

export function ModalStorage({ setActive, playerData }) {

  const userTanks = playerData.userTanks;

  return (
    <>
      <div className="modal__close" onClick={() => setActive(false)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {playerData && (
        <ModalStorageLayout
          goldItem={
            <ItemBlock resource="gold" value={playerData.gold} />
          }
          silverItem={
            <ItemBlock resource="silver" value={playerData.silver} />
          }
          tokensItem={
            <ItemBlock resource="tokens" value={playerData.tokens} />
          }
          redTokensItem={
            <ItemBlock resource="red_tokens" value={playerData.red_tokens} />
          }
          tanksItem={
            <ItemBlock resource="tanks" value={playerData.tanks} />
          }
          premiumAkkItem={
            <ItemBlock resource="premium_akk" value={playerData.premium_akk} />
          }
          drawingsItem={
            <ItemBlock resource="drawings" value={playerData.drawings} />
          }
          regularCasesItem={
            <ItemBlock resource="regular_cases" value={playerData.regular_cases} />
          }
          specialCasesItem={
            <ItemBlock resource="special_cases" value={playerData.special_cases} />
          }
          rareCasesItem={
            <ItemBlock resource="rare_cases" value={playerData.rare_cases} />
          }
          mythicalCasesItem={
            <ItemBlock resource="mythical_cases" value={playerData.mythical_cases} />
          }
          legendaryCasesItem={
            <ItemBlock resource="legendary_cases" value={playerData.legendary_cases} />
          }
          userTanksItem={<ModalStorageTanks userTanks={userTanks} />}
        >
          {playerData.name}
        </ModalStorageLayout>
      )}
    </>
  );
}

function ModalStorageLayout({
  children,
  goldItem,
  silverItem,
  tokensItem,
  redTokensItem,
  tanksItem,
  premiumAkkItem,
  drawingsItem,
  regularCasesItem,
  specialCasesItem,
  rareCasesItem,
  mythicalCasesItem,
  legendaryCasesItem,
  userTanksItem,
}) {
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
          {regularCasesItem}
          {specialCasesItem}
          {rareCasesItem}
          {mythicalCasesItem}
          {legendaryCasesItem}
        </div>
        <div className="storage__resources-block">
          {userTanksItem}
        </div>
      </div>
    </div>
  );
}