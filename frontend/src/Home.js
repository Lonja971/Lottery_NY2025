import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Comments } from "./components/comments/comments";
import { Header } from "./components/header/header";
import { Lottery } from "./components/lottery/lottery";
import { Footer } from "./components/footer/footer";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Modal } from "./components/uikit/modal";
import { BurgerMenuBtn } from "./components/uikit/burger-menu-btn";
import { ModalStorage } from "./components/nav-bar/ui/storage/modal-storage";
import { ModalExchange } from "./components/nav-bar/ui/exchange/modal-exchange";
import { CheckCases } from "./components/cases/check-cases";
import { Shop } from "./components/shop/shop";
import { EventCases } from "./components/event-cases/event-cases";



export function Home({ backendPath, timeLeft }) {

  //---Отримання-даних-гравця-з-бази-даних---

  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
  }

  const [isUpdated, setIsUpdated] = useState(true);
  const [playerData, setPlayerData] = useState(null);
  const [playerGuarantors, setPlayerGuarantors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    //---Отримати-дані-гравця---

    if (isUpdated) {
      const fetchData = async () => {
        try {
          const token = getCookie('t');
          if (!token) {
            navigate('/login');
            return;
          }

          const response = await axios.get(`${backendPath}/api/getData.php?token=${token}`);
          setPlayerData(response.data.user);
          setPlayerGuarantors(response.data.playerGuarantors);
        } catch (error) {
          if (error.response) {
            if (error.response.status === 400 || error.response.status === 401) {
              navigate('/login');
            } else if (error.response.status === 404) {
              console.error("User not found!");
            }
          } else {
            console.error("There was an error!", error);
          }
        }
      };

      fetchData();
      setIsUpdated(false);
    }
  }, [backendPath, isUpdated, navigate]);

  //---Обробка-TokensTimer---

  const [newToken, setNewToken] = useState(false);
  const [tokenTimeLeft, setTokenTimeLeft] = useState(null);
  const [serverTime, setServerTime] = useState(null);
  

  useEffect(() => {
    if (playerData !== null) {
      const fetchServerTime = async () => {
        try {
          const response = await axios.get(`${backendPath}/api/getServerTime.php`);
          setServerTime(Math.floor(response.data.server_time));
        } catch (error) {
          console.error("Error fetching server time", error);
        }
      };

      const checkTime = () => {
        if (!serverTime) return;

        const currentTime = serverTime + Math.floor((Date.now() - fetchTime) / 1000);  // поточний серверний час + різниця часу від запиту
        const tokensTimer = playerData.tokens_timer;
        const timeDifference = tokensTimer - currentTime;

        if (currentTime >= tokensTimer || tokensTimer == null) {
          setNewToken(true);
          setTokenTimeLeft("Заберіть!");
        } else {
          const hours = Math.floor(timeDifference / 3600);
          const minutes = Math.floor((timeDifference % 3600) / 60);
          const seconds = timeDifference % 60;
          setTokenTimeLeft(
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          );
        }
      };

      let fetchTime = Date.now(); // час, коли серверний час був отриманий
      fetchServerTime();
      const intervalId = setInterval(checkTime, 1000);

      return () => clearInterval(intervalId);
    }
  }, [playerData, serverTime, backendPath]);

  //---Бургер-меню---

  const [isMenu, setIsMenu] = useState(false);

  //---Відстежувати-дозвіл-на-коментарі---

  const getInitialCommentsState = () => {
    const savedState = localStorage.getItem("isComments");
    return savedState !== null ? JSON.parse(savedState) : true;
  };

  const [isComments, setIsComments] = useState(getInitialCommentsState);

  useEffect(() => {
    localStorage.setItem("isComments", JSON.stringify(isComments));
  }, [isComments]);

  //---Додавання-повідомлень---

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prevMessages) =>
        prevMessages
          .map((message) => ({
            ...message,
            seconds: message.seconds > 0 ? message.seconds - 1 : 0,
          }))
          .filter((message) => message.seconds > 0),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addMessage = (type, valueType, value, resource = "", convertedType = "", convertedValue = "", convertedItem = "") => {
    const messageObject = {
      type: type,
      valueType: valueType,
      value: value,
      resource: resource,
      convertedType: convertedType,
      convertedValue: convertedValue,
      convertedItem: convertedItem,
      seconds: 10,
    };

    setMessages(prevMessages => [...prevMessages, messageObject]);
  };

  //---Відстежувати-відкриття-модального-вікна-Складу---

  const [modalStorageActive, setModalStorageActive] = useState(false);

  //---Відстежувати-відкриття-модального-вікна-Обміну---

  const [modalExchangeActive, setModalExchangeActive] = useState(false);

  //---Відстежування-відкриття-всіх-modal---

  function handleModalOpen(name) {
    if (isMenu) {
      setIsMenu(false);
    }
    switch (name){
      case "storageModal":
        if (modalExchangeActive){
          setModalExchangeActive(false);
        }
        setModalStorageActive(!modalStorageActive);
        break;
      case "echangeModal":
        if (modalStorageActive){
          setModalStorageActive(false);
        }
        setModalExchangeActive(!modalExchangeActive);
        break;
      case "close":
        setModalStorageActive(false);
        setModalExchangeActive(false);
        break;
      default:
        break;
    }
  }

  //---Відстежувати-відкриття-модального-вікна-анімації-випадіння---

  const [modalOpenCaseAnimation, setModalOpenCaseAnimation] = useState({
    isOpen: false,
    type: null,
    caseName: null,
    //openValue: null,
    openResource: null,
  });

  //---Забороняємо-скролл-якщо-відкрите-модальне-вікно---

  if (
    modalStorageActive === true ||
    modalExchangeActive === true ||
    modalOpenCaseAnimation.isOpen === true ||
    isMenu === true
  ) {
    document.body.classList.add("lock");
  } else {
    document.body.classList.remove("lock");
  }

  return (
    <HomeLayout
      navBar={
        <NavBar
          isMenu={isMenu}
          setIsMenu={setIsMenu}
          playerData={playerData}
          setNewToken={setNewToken}
          newToken={newToken}
          modalStorageActive={modalStorageActive}
          modalExchangeActive={modalExchangeActive}
          addMessage={addMessage}
          setIsUpdated={setIsUpdated}
          handleModalOpen={handleModalOpen}
        />
      }
    >
      <BurgerMenuBtn isMenu={isMenu} setIsMenu={setIsMenu} />
      {modalStorageActive && (
        <Modal active={modalStorageActive} handleModalOpen={handleModalOpen}>
          <ModalStorage backendPath={backendPath} setIsUpdated={setIsUpdated} playerData={playerData} addMessage={addMessage} isComments={isComments} tokenTimeLeft={tokenTimeLeft} />
        </Modal>
      )}
      {modalExchangeActive && (
        <Modal active={modalExchangeActive} handleModalOpen={handleModalOpen}>
          <ModalExchange backendPath={backendPath} setIsUpdated={setIsUpdated} playerData={playerData} addMessage={addMessage} />
        </Modal>
      )}
      {modalOpenCaseAnimation.isOpen && (
        <CheckCases
          backendPath={backendPath}
          playerId={playerData.id}
          addMessage={addMessage}
          setIsUpdated={setIsUpdated}
          active={modalOpenCaseAnimation}
          setActive={setModalOpenCaseAnimation}
        />
      )}

      <Comments
        backendPath={backendPath}
        setIsUpdated={setIsUpdated}
        newToken={newToken}
        setNewToken={setNewToken}
        addMessage={addMessage}
        playerData={playerData}

        tokenTimeLeft={tokenTimeLeft}
        isComments={isComments}
        setIsComments={setIsComments}
        messages={messages}
      />
      <Header/>
      <Lottery
        playerData={playerData}
        addMessage={addMessage}
        setModalOpenCaseAnimation={setModalOpenCaseAnimation}
        playerGuarantors={playerGuarantors}
      />
      <EventCases
        playerData={playerData}
        setModalOpenCaseAnimation={setModalOpenCaseAnimation}
        playerGuarantors={playerGuarantors}
      />
      <Shop
        playerData={playerData}
        setModalOpenCaseAnimation={setModalOpenCaseAnimation}
        playerGuarantors={playerGuarantors}
      />
      <Footer timeLeft={timeLeft}/>
    </HomeLayout>
  );
}

function HomeLayout({ navBar, children }) {
  return (
    <>
      <div className="wrapper">
        {navBar}
        <div className="content">
          {children}
        </div>
      </div>
    </>
  );
}
