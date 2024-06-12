import React, { useState, useEffect } from "react";
import { Comments } from "./components/comments/comments";
import { Header } from "./components/header/header";
import { Lottery } from "./components/lottery/lottery";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Modal } from "./components/uikit/modal";
import { ModalStorage } from "./components/nav-bar/ui/modal-storage";
import { ModalExchange } from "./components/nav-bar/ui/modal-exchange";

function App() {

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
          .filter((message) => message.seconds > 0)
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

  const handleToggleComments = () => {
    setIsComments(!isComments);
  };

  const [modalStorageActive, setModalStorageActive] = useState(false);

    //---Відстежувати-відкриття-модального-вікна-Обміну---

  const [modalExchangeActive, setModalExchangeActive] = useState(false);

  if (modalStorageActive === true || modalExchangeActive === true) {
    document.body.classList.add("lock");
  } else {
    document.body.classList.remove("lock");
  }

  return (
    <AppLayout
      navBar={
        <NavBar
          setActiveStorage={setModalStorageActive}
          setActiveExchange={setModalExchangeActive}
        />
      }
    >
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

      <Comments isComments={isComments} setIsComments={handleToggleComments} messages={messages}/>
      <Header />
      <Lottery addMessage={addMessage}/>
    </AppLayout>
  );
}

function AppLayout({ navBar, children }) {
  return (
    <>
      <div className="wrapper">
        {navBar}
        <div className="content">{children}</div>
      </div>
    </>
  );
}

export default App;
