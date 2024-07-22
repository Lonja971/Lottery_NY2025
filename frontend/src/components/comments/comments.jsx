import React from "react";
import "../../css/comments.css";
import { RESOURCES, TANKS } from "../constants";

export function Comments({ isComments, setIsComments, messages }) {
  const imgUrl = isComments ? "on" : "off";

  return (
    <div className="comments">
      <div id="commentsBlock" className="comments__block">
      {messages.map((message, index) => {
        if (message.type === "not_enough_v2") {

          return (
            <div className="error" key={message.id || index}>
              У вас недостатньо ресурсів!
            </div>
          );
        }else if (message.type === "not_enough") {
        
          return (
            <div key={message.id || index}>
              У вас немає {message.value} {RESOURCES[message.resource]} <img src={"img/resources/" + message.resource + ".png"} alt="RES_IMG" />
            </div>
          );
        }else if (message.type === "added") {
          let tankName = null;
        
          if (message.valueType === "tank" && TANKS[message.resource]) {
            tankName = TANKS[message.resource].name;
          }
        
          return (
            <div key={message.id || index}>
              {message.valueType === "tank" ? (
                <>
                  {TANKS[message.resource] && (
                  <React.Fragment>
                    {TANKS[message.resource].type !== "camo" ? (
                      <>
                        Додано танк
                        <img
                          className="tanksimg-height"
                          src={"img/flags/" + TANKS[message.resource].land + "_big.png"}
                          alt="RES_IMG"
                        />
                        <img
                          className="tanksimg-height"
                          src={"img/icons/" + TANKS[message.resource].type + ".png"}
                          alt="RES_IMG"
                        />
                      </>
                    ) : (
                      "Додано камуфляж "
                    )}
                  </React.Fragment>
                  )}
                  {tankName && <span>{tankName}</span>}
                </>
              ) : (
                <>
                  + {message.value?.toLocaleString()} {RESOURCES[message.resource]}
                  <img
                    src={"img/resources/" + message.resource + ".png"}
                    alt="RES_IMG"
                  />
                </>
              )}
            </div>
          );
        } else if (message.type === "converted") {
          let convertedBlock = null;
          if (message.convertedType === "tank") {
            convertedBlock = TANKS[message.convertedItem].name;
          }else if(message.convertedType === "resource"){
            convertedBlock = RESOURCES[message.convertedItem];
          }
          return (
            <div key={message.id || index}>
              Отримано {message.value?.toLocaleString()}{" "}
              <img src={"img/resources/" + message.resource + ".png"} alt="RES_IMG" />
              {" за  повторку "}
              {message.convertedType === "tank" ? (
                <React.Fragment>
                  {TANKS[message.convertedItem].type !== "camo" ? (
                    <>
                      <img
                        className="tanksimg-height"
                        src={"img/flags/" + TANKS[message.convertedItem].land + "_big.png"}
                        alt="RES_IMG"
                      />
                      <img
                        className="tanksimg-height"
                        src={"img/icons/" + TANKS[message.convertedItem].type + ".png"}
                        alt="RES_IMG"
                      />
                    </>
                  ) : (
                    "камуфляж"
                  )}
                  {" " + convertedBlock}
                </React.Fragment>
              ) : (
                message.convertedValue + " " + convertedBlock
              )}
            </div>
          );
        } else {
          return (
            <div key={message.id || index}>
              Unknown message type
            </div>
          );
        }
      })}
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
