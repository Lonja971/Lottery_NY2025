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
import { ModalStorage } from "./components/nav-bar/ui/modal-storage";
import { ModalExchange } from "./components/nav-bar/ui/modal-exchange";
import { CheckCases } from "./components/cases/check-cases";

export function Home() {

  //---Отримання-даних-гравця-з-бази-даних---

  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
  }

  const [isUpdated, setIsUpdated] = useState(true);
  const [playerData, setPlayerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdated) {
      const fetchData = async () => {
        try {
          const token = getCookie('t'); 
          if (!token) {
            navigate('/login');
            return;
          }
  
          const response = await axios.get(`http://NY2025/backend/api/getData.php?token=${token}`);
          setPlayerData(response.data);
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
  }, [isUpdated, navigate]);
  
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

  const handleToggleComments = () => {
    setIsComments(!isComments);
  };

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
          modalStorageActive={modalStorageActive}
          setActiveStorage={setModalStorageActive}
          modalExchangeActive={modalExchangeActive}
          setActiveExchange={setModalExchangeActive}
        />
      }
    >
      <BurgerMenuBtn isMenu={isMenu} setIsMenu={setIsMenu} />
      {modalStorageActive && (
        <Modal active={modalStorageActive}>
          <ModalStorage playerData={playerData} setActive={setModalStorageActive} />
        </Modal>
      )}
      {modalExchangeActive && (
        <Modal active={modalExchangeActive}>
          <ModalExchange setIsUpdated={setIsUpdated} playerData={playerData} setActive={setModalExchangeActive} addMessage={addMessage} />
        </Modal>
      )}
      {modalOpenCaseAnimation.isOpen && (
        <CheckCases
          playerId={playerData.id}
          addMessage={addMessage}
          setIsUpdated={setIsUpdated}
          active={modalOpenCaseAnimation}
          setActive={setModalOpenCaseAnimation}
          />
      )}

      <Comments
        isComments={isComments}
        setIsComments={handleToggleComments}
        messages={messages}
      />
      <Header />
      <Lottery
        playerData={playerData}
        addMessage={addMessage}
        setModalOpenCaseAnimation={setModalOpenCaseAnimation}
      />
      <Footer />
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
