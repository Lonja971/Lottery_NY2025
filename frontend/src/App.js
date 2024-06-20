import React, { useState, useEffect } from "react";
import { Comments } from "./components/comments/comments";
import { Header } from "./components/header/header";
import { Lottery } from "./components/lottery/lottery";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Modal } from "./components/uikit/modal";
import { BurgerMenuBtn } from "./components/uikit/burger-menu-btn";
import { ModalStorage } from "./components/nav-bar/ui/modal-storage";
import { ModalExchange } from "./components/nav-bar/ui/modal-exchange";

function App() {

  //---Бургер-меню---

  const [isMenu, setIsMenu] = useState(false)

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

  if (modalStorageActive === true || modalExchangeActive === true || isMenu === true) {
    document.body.classList.add("lock");
  } else {
    document.body.classList.remove("lock");
  }

  function clickHandler() {
    fetch("http://ny2025/backend/index.php", {
      method : 'POST',
      header : {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : JSON.stringify({action : 1})
    })
    .then (response => response.text())
    .then (response => {
      console.log(response);
    })
  }

  return (
    <AppLayout
      navBar={
        <NavBar
          isMenu={isMenu}
          setActiveStorage={setModalStorageActive}
          setActiveExchange={setModalExchangeActive}
        />
      }
      clickHandler={clickHandler}
    >
      <BurgerMenuBtn isMenu={isMenu} setIsMenu={setIsMenu}/>
      {modalStorageActive && (
        <Modal active={modalStorageActive} setActive={setModalStorageActive}>
          <ModalStorage />
        </Modal>
      )}
      {modalExchangeActive && (
        <Modal active={modalExchangeActive} setActive={setModalExchangeActive}>
          <ModalExchange />
        </Modal>
      )}

      <Comments
        isComments={isComments}
        setIsComments={handleToggleComments}
        messages={messages}
      />
      <Header />
      <Lottery addMessage={addMessage} />
    </AppLayout>
  );
}

function AppLayout({ navBar, children, clickHandler }) {
  return (
    <>
      <div className="wrapper">
        {navBar}
        <div className="content">
          <button onClick={clickHandler}>Click</button>
          {children}
          </div>
      </div>
    </>
  );
}

export default App;
