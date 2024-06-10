import React from "react";
import "../../css/comments.css";
import { RESOURCES } from "../constants";

export function Comments({ isComments, setIsComments, commentsBlockRef }) {
  const imgUrl = isComments ? "on" : "off";

  return (
    <div className="comments">
      <div id="commentsBlock" className="comments__block" ref={commentsBlockRef}></div>
      <div className="comments__panel">
        <span>
          Наст. <img src="img/resurses/token.png" alt="токен" /> : 12:12:12
        </span>
        <div className="_glass comment-button" onClick={() => setIsComments(!isComments)}>
          <img src={'img/background/'+ imgUrl +'.png'} alt="Messages_on_img" />
        </div>
      </div>
    </div>
  );
}

//---Функція-яка-додає-повідомлення---

/**
 *  @param {HTMLElement} commentsBlock - The block where comments are added
 *  @param {string} resource - The type of resource ('gold' | 'token' | 'red_token')
 *  @param {string} number - The number of resources
 */

export function AddComment(commentsBlock, resource, number) {
  if (!commentsBlock) return;

  const messageText = document.createElement('div');
  messageText.innerHTML = `
    + ${number.toLocaleString()} ${RESOURCES[resource]} <img src="img/resurses/${resource}.png"/>
  `;
  commentsBlock.appendChild(messageText);
  setTimeout(function () {
    messageText.remove();
  }, 9000);
}
