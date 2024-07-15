import { ItemBlock } from "../../uikit/item-block";
import "../../../css/storage.css";
import { ModalStorageTanks } from "./modal-storage-tanks";
import { useNavigate } from "react-router-dom";

export function ModalStorage({ setActive, playerData }) {

  const navigate = useNavigate();
  const userTanks = playerData.userTanks;

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=${new Date(0).toUTCString()}; path=/`;
  }

  function logout(){
    deleteCookie('t');
    navigate('/login');
  }

  return (
    <>
      {
      /*<div className="modal__close" onClick={() => setActive(false)}>
        <span></span>
        <span></span>
        <span></span>
      </div>*/
      }
      {playerData && (
        <ModalStorageLayout
          logout={logout}
          goldItem={
            <ItemBlock type="resource" resource="gold" value={playerData.gold} />
          }
          silverItem={
            <ItemBlock type="resource" resource="silver" value={playerData.silver} />
          }
          tokensItem={
            <ItemBlock type="resource" resource="tokens" value={playerData.tokens} />
          }
          redTokensItem={
            <ItemBlock type="resource" resource="red_tokens" value={playerData.red_tokens} />
          }
          tanksItem={
            <ItemBlock type="resource" resource="tanks" value={playerData.tanks} />
          }
          premiumAkkItem={
            <ItemBlock type="resource" resource="premium_akk" value={playerData.premium_akk} />
          }
          drawingsItem={
            <ItemBlock type="resource" resource="drawings" value={playerData.drawings} />
          }
          regularCasesItem={
            <ItemBlock type="case" resource="regular_cases" value={playerData.regular_cases} />
          }
          specialCasesItem={
            <ItemBlock type="case" resource="special_cases" value={playerData.special_cases} />
          }
          rareCasesItem={
            <ItemBlock type="case" resource="rare_cases" value={playerData.rare_cases} />
          }
          mythicalCasesItem={
            <ItemBlock type="case" resource="mythical_cases" value={playerData.mythical_cases} />
          }
          legendaryCasesItem={
            <ItemBlock type="case" resource="legendary_cases" value={playerData.legendary_cases} />
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
  logout,
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
      <div className="storage__container _container">
        <div className="storage__user">
          <div className="storage__user-block">
            <img className="storage__user-vignette" src="img/background/vignette.png" alt="VIGNETTE_IMG" />
            <div className="storage__user-nickname">
              <h1 className="_glass">{children}</h1>
            </div>
          </div>
          <div className="storage__user-settings">
            <button className="btn _glass" onClick={logout}>
              Вийти з аккаунту
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
            <button className="btn _glass">
              Text
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
            <button className="btn _glass">
              Text
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
          </div>
        </div>
        <div className="storage__resources">
          <div className="storage__resources-block">
            <h2>Ресурси</h2>
            <div className="srb-block">
              {goldItem}
              {silverItem}
              {tokensItem}
              {redTokensItem}
              {tanksItem}
              {premiumAkkItem}
              {drawingsItem}
            </div>
          </div>
          <div className="storage__resources-block">
            <h2>Кейси</h2>
            <div className="srb-block cases-block">
              {regularCasesItem}
              {specialCasesItem}
              {rareCasesItem}
              {mythicalCasesItem}
              {legendaryCasesItem}
            </div>
          </div>
          <div className="storage__resources-block">
            <h2>Танки</h2>
            <div className="srb-block tanks-block">
              {userTanksItem}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}