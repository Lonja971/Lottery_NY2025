import React from "react";
import "../../css/comments.css";
import { RESOURCES } from "../constants";

export function Comments({ isComments, setIsComments, messages }) {
  const imgUrl = isComments ? "on" : "off";

  return (
    <div className="comments">
      <div id="commentsBlock" className="comments__block">
        {messages.map((message) => (
          <div key={message.id}>
            + {message.value.toLocaleString()} {RESOURCES[message.resource]}{" "}
            <img
              src={"img/resources/" + message.resource + ".png"}
              alt="RES_IMG"
            />
          </div>
        ))}
      </div>
      <div className="comments__panel">
        <span>
          Наст. <img src="img/resources/tokens.png" alt="токен" /> : 12:12:12
        </span>
        <div
          className="_glass comment-button"
          onClick={() => setIsComments(!isComments)}
        >
          <img
            src={"img/background/" + imgUrl + ".png"}
            alt="Messages_on_img"
          />
        </div>
      </div>
    </div>
  );
}
