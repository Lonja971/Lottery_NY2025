import "../../../../css/storage.css";

import { ItemBlock } from "../../../uikit/storage-item-block";
import { ModalStorageTanks } from "./modal-storage-tanks";
import { useNavigate } from "react-router-dom";
import { CASES, TANKS } from "../../../constants";
import { DraggableWindow } from "../../../uikit/draggable-window";

import { useState } from "react";
import axios from "axios";

export function ModalStorage({ backendPath, setIsUpdated, playerData, addMessage, isComments, tokenTimeLeft }) {

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
          backendPath={backendPath}
          setIsUpdated={setIsUpdated}
          playerId={playerId}
          addMessage={addMessage}
          playerTanks={playerTanks}
          playerCamos={playerCamos}
          goldItem={
            <ItemBlock
              isComments={isComments}
              type="resource"
              resource="gold"
              value={playerData.gold}
              text='Золото <img src="img/resources/gold.png" alt="RES" /> - головний ресурс. За його допомогою можно покупати танкита скіни. Його можна отримати в спеціальних івентах та в подарунках чи за допомогою преміум аккаунтів. Також в розділі "Обмін" <img src="img/servise/exchange.png" alt="EXCHANGE" /> ви можете отримати більше Золота, обмінявши інші ресурси.'
            />
          }
          silverItem={
            <ItemBlock
              isComments={isComments}
              type="resource"
              resource="silver"
              value={playerData.silver}
              text='Срібло <img src="img/resources/silver.png" alt="RES" /> - використовується на розхідники, такі як покупка єдениць техніки в бій (щоб вийти в бій мало лише мати танки, треба заплатити за кожну єденицю сріблом). В Бойових Пропусках за срібло можно було купити преміум набор. Заробляється в битвах.'
            />
          }
          tokensItem={
            <ItemBlock
              isComments={isComments}
              type="resource"
              resource="tokens"
              value={playerData.tokens}
              text='Токени <img src="img/resources/tokens.png" alt="RES" /> - можно забрати раз на годину. За Токени можно покупати контейнери під час події "Новорічна Лотерея 2025".'
            />
          }
          redTokensItem={
            <ItemBlock
              isComments={isComments}
              type="resource"
              resource="red_tokens"
              value={playerData.red_tokens}
              text='Червоні Токени <img src="img/resources/red_tokens.png" alt="RES" /> - аналог звичайних Токенів <img src="img/resources/tokens.png" alt="RES" />, але на відміну від звичайних Токенів за них можно покупати ексклюзивні контейнери під час події "Новорічна Лотерея 2025".'
            />
          }
          tanksItem={
            <ItemBlock
              isComments={isComments}
              type="resource"
              resource="counters"
              value={playerData.counters}
              text='Танкові жетони <img src="img/resources/counters.png" alt="RES" /> - випадають в івентах. Якщо ви не хочете витрачати срібло на покупку єдениць техніки, ви можете використовувати цей ресурс. Його можно обміняти на золото.'
            />
          }
          premiumAkkItem={
            <ItemBlock
              isComments={isComments}
              type="resource"
              resource="premium_akk"
              value={playerData.premium_akk}
              text='Преміум аккаунт <img src="img/resources/premium_akk.png" alt="RES" /> - допомогає гравцю заробляти Золото <img src="img/resources/gold.png" alt="RES" />, дайчи його за гру в боях. Здобувається в івентах.'
            />
          }
          drawingsItem={
            <ItemBlock
              isComments={isComments}
              type="resource"
              resource="drawings"
              value={playerData.drawings}
              text='Креслення <img src="img/resources/drawings.png" alt="RES" /> - їх можно обміняти на танки та камуфляжі в "Магазині" під час події "Новорічна Лотерея 2025".'
            />
          }
          regularCasesItem={
            <ItemBlock
              isComments={isComments}
              type="case"
              resource="regular_cases"
              value={playerData.regular_cases}
              text={'Звичайний Контейнер <img src="img/resources/regular_cases.png" alt="RES" /> - може випасти з "' + CASES.main_cases.name + '"'}
            />
          }
          specialCasesItem={
            <ItemBlock
              isComments={isComments}
              type="case"
              resource="special_cases"
              value={playerData.special_cases}
              text={'Особовий Контейнер <img src="img/resources/special_cases.png" alt="RES" /> - може випасти з "' + CASES.main_cases.name + '"'}
            />
          }
          rareCasesItem={
            <ItemBlock
              isComments={isComments}
              type="case"
              resource="rare_cases"
              value={playerData.rare_cases}
              text={'Рідкісний Контейнер <img src="img/resources/rare_cases.png" alt="RES" /> - може випасти з "' + CASES.main_cases.name + '"'}
            />
          }
          mythicalCasesItem={
            <ItemBlock
              isComments={isComments}
              type="case"
              resource="mythical_cases"
              value={playerData.mythical_cases}
              text={'Міфічний Контейнер <img src="img/resources/mythical_cases.png" alt="RES" /> - може випасти з "' + CASES.main_cases.name + '"'}
            />
          }
          legendaryCasesItem={
            <ItemBlock
              isComments={isComments}
              type="case"
              resource="legendary_cases"
              value={playerData.legendary_cases}
              text={'Легендарний Контейнер <img src="img/resources/legendary_cases.png" alt="RES" /> - може випасти з "' + CASES.main_cases.name + '"'}
            />
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
  backendPath,
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
  const [isPromoModal, setIsPromoModal] = useState(false);
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
      .post(`${backendPath}/api/changePlayerName.php`, {
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
        } else if (response.data.status === "the_same") {
          addMessage("the_same_name");
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

    axios.post(`${backendPath}/api/promoCode.php`, {
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
  function logout() {
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
            {openConfimModal ? (
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
            <h2>Контейнери</h2>
            <div className="srb-block resources-block">
              {regularCasesItem}
              {specialCasesItem}
              {rareCasesItem}
              {mythicalCasesItem}
              {legendaryCasesItem}
            </div>
          </div>
          {playerTanks.length !== 0 ? (
            <div className="storage__resources-block">
              <h2>Танки</h2>
              <div className="srb-block tanks-block">
                {userTanksItem}
              </div>
            </div>
          ) : ""}
          {playerCamos.length !== 0 ? (
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