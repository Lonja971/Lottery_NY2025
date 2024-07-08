import React, { useState, useEffect } from "react";
import axios from "axios";

import { Comments } from "./components/comments/comments";
import { Header } from "./components/header/header";
import { Lottery } from "./components/lottery/lottery";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Modal } from "./components/uikit/modal";
import { BurgerMenuBtn } from "./components/uikit/burger-menu-btn";
import { ModalStorage } from "./components/nav-bar/ui/modal-storage";
import { ModalExchange } from "./components/nav-bar/ui/modal-exchange";
import { ModalOpenCaseAnimation } from "./components/cases/ui/modal-open-case-animation";

export function Home() {
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

  const addMessage = (value, resource) => {
    const messageObject = {
      value: value,
      resource: resource,
      id: Date.now(),
      seconds: 10,
    };

    setMessages([...messages, messageObject]);
  };

  //---Відстежувати-відкриття-модального-вікна-Складу---

  const [modalStorageActive, setModalStorageActive] = useState(false);

  //---Відстежувати-відкриття-модального-вікна-Обміну---

  const [modalExchangeActive, setModalExchangeActive] = useState(false);

  //---Відстежувати-відкриття-модального-вікна-анімації-випадіння---

  const [modalOpenCaseAnimation, setModalOpenCaseAnimation] = useState({
    isOpen: false,
    type: null,
  });

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

  //---Отримання-даних-гравця-з-бази-даних---

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    axios
      .get("http://ny2025/backend/api/getData.php")
      .then((response) => {
        setPlayer(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <HomeLayout
      navBar={
        <NavBar
          player={player}
          isMenu={isMenu}
          setActiveStorage={setModalStorageActive}
          setActiveExchange={setModalExchangeActive}
        />
      }
      player={player}
    >
      <BurgerMenuBtn isMenu={isMenu} setIsMenu={setIsMenu} />
      {modalStorageActive && (
        <Modal active={modalStorageActive}>
          <ModalStorage player={player} setActive={setModalStorageActive} />
        </Modal>
      )}
      {modalExchangeActive && (
        <Modal active={modalExchangeActive}>
          <ModalExchange setActive={setModalExchangeActive} />
        </Modal>
      )}
      {modalOpenCaseAnimation.isOpen && (
        <Modal active={modalOpenCaseAnimation}>
          <ModalOpenCaseAnimation
            active={modalOpenCaseAnimation}
            setActive={setModalOpenCaseAnimation}
          />
        </Modal>
      )}

      <Comments
        isComments={isComments}
        setIsComments={handleToggleComments}
        messages={messages}
      />
      <Header />
      <Lottery
        addMessage={addMessage}
        setModalOpenCaseAnimation={setModalOpenCaseAnimation}
      />
    </HomeLayout>
  );
}

function HomeLayout({ player, userData, navBar, children }) {
  return (
    <>
      <div className="wrapper">
        {navBar}
        <div className="content">
          <div>{userData}</div>
          {children}
        </div>
      </div>
    </>
  );
}
