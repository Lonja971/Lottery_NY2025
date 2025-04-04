import React from "react";
import "../../css/comments.css";
import { RESOURCES, TANKS } from "../constants";
import axios from "axios";

export function Comments({ backendPath, setIsUpdated, newToken, setNewToken, addMessage, playerData, tokenTimeLeft, isComments, setIsComments, messages }) {
  const imgUrl = isComments ? "on" : "off";

  function handleNewToken() {
    if (newToken === true) {
      axios
        .post(`${backendPath}/api/getToken.php`, {
          userId: playerData.id,
        })
        .then((response) => {
          if (response.data.status === "success") {
            addMessage("added", "resource", 1, "tokens");
            setNewToken(false);
            setIsUpdated(true)
          } else {
            console.log("Error:", response.data.message);
            addMessage("new_token_not_available");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }

  return (
    <div className="comments">
      <div id="commentsBlock" className="comments__block">
        {messages.map((message, index) => {
          switch (message.type) {
            case "not_enough":
              return (
                <div className="error" key={message.id || index}>
                  You don't have enough resources!
                </div>
              );
            case "name_changet_successfully":
              return (
                <div key={message.id || index}>
                  Your nickname has been successfully changed!
                </div>
              );
            case "new_token_not_available":
              return (
                <div key={message.id || index}>
                  The new token is not ready yet!
                </div>
              );
            case "promo_already_activated":
              return (
                <div key={message.id || index}>
                  Promo code is already activated!
                </div>
              );
            case "the_same_name":
              return (
                <div key={message.id || index}>
                  Nick is already busy!
                </div>
              );
            case "not_found_promo":
              return (
                <div className="error" key={message.id || index}>
                  Such a promo code does not exist!
                </div>
              );
            case "added":
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
                              Added a tank
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
                            "Added camouflage "
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
            case "converted":
              let convertedBlock = null;
              if (message.convertedType === "tank") {
                convertedBlock = TANKS[message.convertedItem].name;
              } else if (message.convertedType === "resource") {
                convertedBlock = RESOURCES[message.convertedItem];
              }

              return (
                <div key={message.id || index}>
                  Отримано {message.value?.toLocaleString()}{" "}
                  <img src={"img/resources/" + message.resource + ".png"} alt="RES_IMG" />
                  {" for repetition"}
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
                        "camouflage"
                      )}
                      {" " + convertedBlock}
                    </React.Fragment>
                  ) : (
                    message.convertedValue + " " + convertedBlock
                  )}
                </div>
              );
            default:
              return (
                <div key={message.id || index}>
                  Unknown message type
                </div>
              );
          }
        })}
        {newToken ? (
          <button className="btn _glass commentsblock-newtoken" onClick={handleNewToken}>
            <span className="token-button__text">Get 1 Token<img src="img/resources/tokens.png" alt="TOKENS" /> </span>
            <span className="line line-top"></span>
            <span className="line line-right"></span>
            <span className="line line-bottom"></span>
            <span className="line line-left"></span>
          </button>
        ) : null}
      </div>
      <div className="_glass comments__panel">
        <div className="comments-nexttoken">
          <span>Next <img src="img/resources/tokens.png" alt="токен" /> :</span> <span className="comments-tokenstimer">{tokenTimeLeft}</span>
        </div>
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
