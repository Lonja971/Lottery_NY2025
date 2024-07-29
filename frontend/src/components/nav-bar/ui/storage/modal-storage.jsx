import "../../../../css/storage.css";

import { ItemBlock } from "../../../uikit/item-block";
import { ModalStorageTanks } from "./modal-storage-tanks";
import { useNavigate } from "react-router-dom";
import { TANKS } from "../../../constants";
import { DraggableWindow } from "../../../uikit/draggable-window";

import { useState } from "react";
import axios from "axios";

export function ModalStorage({ setIsUpdated, playerData, addMessage }) {
  
  let playerTanks = [];
  let playerCamos = [];
  const playerId = playerData.id;

  if (Array.isArray(playerData.userTanks)) {
    playerData.userTanks.forEach(item => {
      if (TANKS[item].type === "camo") {
        playerCamos.push(item);
      } else {
        playerTanks.push(item);
      }
    });
  }

  return (
    <>
      {playerData && (
        <ModalStorageLayout
          setIsUpdated={setIsUpdated}
          playerId={playerId}
          addMessage={addMessage}
          playerTanks={playerTanks}
          playerCamos={playerCamos}
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
          userTanksItem={<ModalStorageTanks userTanks={playerTanks} />}
          userCamosItem={<ModalStorageTanks userTanks={playerCamos} />}
        >
          {playerData.name}
        </ModalStorageLayout>
      )}
    </>
  );
}

function ModalStorageLayout({
  setIsUpdated,
  playerId,
  addMessage,
  playerTanks,
  playerCamos,
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
  userCamosItem,
}) {

  const navigate = useNavigate();
  const [isChangeName, setIsChangeName] = useState(false);
  const[isPromoModal, setIsPromoModal] = useState(false);
  const [openConfimModal, setOpenConfimModal] = useState(false);
  const [changeNameFormData, setChangeNameFormData] = useState({ username: '' });
  const [promoFormData, setPromoFormData] = useState({ promo: '' });
  const [activeWindowId, setActiveWindowId] = useState(null);

  //---Зміна-ім'я-користувача---

  const handleChangeName = (e) => {
    const { name, value } = e.target;
    setChangeNameFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitChangeName = (e) => {
    e.preventDefault();

    axios
      .post("http://NY2025/backend/api/changePlayerName.php", {
        player_id: playerId,
        new_user_name: changeNameFormData.username,
      })
      .then((response) => {
        if (response.data.status === "success") {
          addMessage("name_changet_successfully");
          setIsUpdated(true);
          setChangeNameFormData((prevData) => ({
            ...prevData,
            username: "",
          }));
        } else {
          console.log("Login error:", response.data.message);
          addMessage("error");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        addMessage("error");
      });
  };

  //---Промо-коди---

  const handlePromo = (e) => {
    const { name, value } = e.target;
    setPromoFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitPromo = (e) => {
    e.preventDefault();
  
    axios.post("http://NY2025/backend/api/promoCode.php", {
      player_id: playerId,
      promo: promoFormData.promo,
    })
    .then((response) => {
      if (response.data.status === "success") {
        console.log("Success");
        if (response.data.already_activated) {
          console.log("Promo code already activated");
          addMessage("promo_already_activated");
        } else {
          if (response.data.type === 'resource') {
            console.log(`Resource updated: ${response.data.get_name} + ${response.data.get_value}`);
            addMessage("added", "resource", response.data.get_value, response.data.get_name);
          } else if (response.data.type === 'tank') {
            if (response.data.conversion_value) {
              console.log(`Tank already owned. Compensation added: ${response.data.conversion_value} gold`);
              addMessage("converted", "resource", response.data.conversion_value, "gold", "tank", null, response.data.get_name);
            } else {
              console.log(`Tank added: ${response.data.get_name}`);
              addMessage("added", "tank", null, response.data.get_name);
            }
          }
        }
        setIsUpdated(true);
      } else {
        addMessage("not_found_promo");
        console.log("Error:", response.data.message);
      }
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  };

  //---Вихід-з-аккаунту---

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=${new Date(0).toUTCString()}; path=/`;
  }
  function logout(){
    deleteCookie('t');
    localStorage.removeItem('welcomeWomT');
    navigate('/login');
  }

  //---Контроль-z-index-активного-dragged-вікна---

  const handleFocus = (id) => {
    setActiveWindowId(id);
  };

  const handleBlur = () => {
    setActiveWindowId(null);
  };

  return (
    <div className="storage">
      <div className="storage__container _container">
      {isChangeName && (
          <DraggableWindow
            id="changeName"
            title="Змінити нік"
            setCloseConst={setIsChangeName}
            isActive={activeWindowId === "changeName"}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <form onSubmit={handleSubmitChangeName}>
              <label>
                <input
                  className="center"
                  type="text"
                  name="username"
                  placeholder="Введіть новий нік"
                  maxLength={15}
                  minLength={1}
                  value={changeNameFormData.username}
                  onChange={handleChangeName}
                  required
                />
              </label>
              <div className="center">
                <button className="btn _glass">
                  <p>Змінити</p>
                  <div className="line line-top"></div>
                  <div className="line line-right"></div>
                  <div className="line line-bottom"></div>
                  <div className="line line-left"></div>
                </button>
              </div>
            </form>
          </DraggableWindow>
        )}
        {isPromoModal && (
          <DraggableWindow
            id="promoModal"
            title="Активувати промо-код"
            setCloseConst={setIsPromoModal}
            isActive={activeWindowId === "promoModal"}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <form onSubmit={handleSubmitPromo}>
              <div>
                <label>
                  <input
                    className="center"
                    type="text"
                    name="promo"
                    placeholder="Введіть промо-код"
                    maxLength={15}
                    minLength={1}
                    value={promoFormData.promo || ''}
                    onChange={handlePromo}
                    required
                  />
                </label>
              </div>
              <div className="center">
                <button className="btn _glass">
                  <p>Активувати</p>
                  <div className="line line-top"></div>
                  <div className="line line-right"></div>
                  <div className="line line-bottom"></div>
                  <div className="line line-left"></div>
                </button>
              </div>
            </form>
          </DraggableWindow>
        )}
        <div className="storage__user">
          <div className="storage__user-block">
            <img className="storage__user-vignette" src="img/background/vignette.png" alt="VIGNETTE_IMG" />
            <div className="storage__user-nickname">
              <h1 className="_glass">{children}</h1>
            </div>
          </div>
          <div className="storage__user-settings">
            { openConfimModal ? (
              <div className="storage-confim">
                <div></div>
                <div className="_container">
                  <div className="_glass storage-confim__form">
                    <div className="modal__close" onClick={() => setOpenConfimModal(false)}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    Ви впевненні що хочете вийти з аккаунту?
                    <div>
                      <button className="btn _glass" onClick={logout}>
                        Вийти
                        <div className="line line-top"></div>
                        <div className="line line-right"></div>
                        <div className="line line-bottom"></div>
                        <div className="line line-left"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : ""}
            <button className="btn _glass" onClick={() => setIsChangeName(!isChangeName)}>
              Змінити нік
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
            <button className="btn _glass" onClick={() => setIsPromoModal(!isPromoModal)}>
              Промо код
              <div className="line line-top"></div>
              <div className="line line-right"></div>
              <div className="line line-bottom"></div>
              <div className="line line-left"></div>
            </button>
            <button className="btn _glass" onClick={() => setOpenConfimModal(true)}>
              Вийти з аккаунту
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
            <div className="srb-block resources-block">
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
            <div className="srb-block resources-block">
              {regularCasesItem}
              {specialCasesItem}
              {rareCasesItem}
              {mythicalCasesItem}
              {legendaryCasesItem}
            </div>
          </div>
          { playerTanks.length !== 0 ? (
            <div className="storage__resources-block">
              <h2>Танки</h2>
              <div className="srb-block tanks-block">
                {userTanksItem}
              </div>
            </div>
          ) : ""}
          { playerCamos.length !== 0 ? (
            <div className="storage__resources-block">
              <h2>Камуфляжі</h2>
              <div className="srb-block tanks-block">
                {userCamosItem}
              </div>
            </div>
          ) : ""}
        </div>
      </div>
    </div>
  );
}