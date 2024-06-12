import React from "react";
import "../../css/comments.css";
import { RESOURCES } from "../constants";

export function Comments({ isComments, setIsComments, comments }) {
  const imgUrl = isComments ? "on" : "off";

  return (
    <div className="comments">
      <div id="commentsBlock" className="comments__block">
        {comments.map((comment) => (
          <div key={comment.id}>
            + {comment.value.toLocaleString()} {RESOURCES[comment.resource]} <img src={'img/resources/' + comment.resource + '.png'} alt="RES_IMG" />
          </div>
        ))}
      </div>
      <div className="comments__panel">
        <span>
          Наст. <img src="img/resources/token.png" alt="токен" /> : 12:12:12
        </span>
        <div className="_glass comment-button" onClick={() => setIsComments(!isComments)}>
          <img src={'img/background/' + imgUrl + '.png'} alt="Messages_on_img" />
        </div>
      </div>
    </div>
  );
}