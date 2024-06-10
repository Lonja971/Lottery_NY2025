import React, { useRef, useState } from "react";
import "../../css/lottery.css";
import { Comments, AddComment } from "../comments/comments";

export function Lottery() {
  const [isComments, setIsComments] = useState(true);
  const commentsBlockRef = useRef(null);

  const handleAddComment = () => {
    AddComment(commentsBlockRef.current, "gold", 12345);
  };

  return (
    <div className="lottery">
      <div className="lottery__container _container">
        <div className="caseblock">
          <div className="caseblock__text">Кейс</div>
          <img src="img/cases/main_case.png" alt="" />
          <button className="btn _glass" onClick={handleAddComment}>
            Відкрий
            <div className="line line-top"></div>
            <div className="line line-right"></div>
            <div className="line line-bottom"></div>
            <div className="line line-left"></div>
          </button>
        </div>
        <Comments
          isComments={isComments}
          setIsComments={setIsComments}
          commentsBlockRef={commentsBlockRef}
        />
      </div>
    </div>
  );
}