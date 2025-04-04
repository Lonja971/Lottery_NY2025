import "../../../css/open-animation.css";
import "../../../css/dropping-animation.css";
import { OpeningCasesLogic } from "../opening-cases-logic";
import { useState, useEffect } from "react";
import { CASES, TANKS } from "../../constants";

export function ModalOpenCaseAnimation({backendPath, playerId, addMessage, setIsUpdated, active, setActive }) {
  const [droppedItems, setDroppedItems] = useState([]);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [compensatedItems, setCompensatedItems] = useState(null);
  const [newDroppedTanks, setNewDroppedTanks] = useState(null);
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const buttonTimer = 1000;


  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const handleClick = () => {
    if (compensatedItems && compensatedItems.length > 0) {
      compensatedItems.forEach(item => {
        addMessage("converted", "resource", item.conversion_value, "gold", "tank", null, item.id);
      });
    }
    if(newDroppedTanks && newDroppedTanks.length > 0){
      newDroppedTanks.forEach(item => {
        addMessage("added", "tank", null, item.id);
      });
    }
    setActive({ isOpen: false, type: null, caseName: null, openValue: null, openResource: null});
  };

  const caseResourcesInfo = active.type;
  const limit = 4;
  
  useEffect(() => {
    OpeningCasesLogic( backendPath, playerId, setIsUpdated, limit, caseResourcesInfo, setDroppedItems, setCompensatedItems, setNewDroppedTanks, active);
  }, [backendPath, caseResourcesInfo, playerId, setIsUpdated, active]);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonOpen(true)
    }, buttonTimer);

    return () => clearTimeout(timer);
  }, [buttonTimer])

  //console.log("---");
  //if (droppedItems.length !== 0){
  //  console.log("");
  //  console.log(droppedItems);
  //  console.log(droppedItems.length);
  //}

  return (
    <div className="opening-cases-block">
      <button
        className={`btn _glass anima-btn${ !isButtonOpen ? " btn-closed" : ""}`}
        onClick={handleClick}
      >
        Collect
        <div className="line line-top"></div>
        <div className="line line-right"></div>
        <div className="line line-bottom"></div>
        <div className="line line-left"></div>
      </button>
      <div className="opening">
        <video
          muted
          id="video"
          className="video opening__video"
          src={CASES[active.caseName].animation === undefined || CASES[active.caseName].animation === "default" ? 
            "video/default.mp4" : 
            "video/" + CASES[active.caseName].animation + ".mp4"}
          autoPlay
          onLoadedData={handleVideoLoaded}
        ></video>
        {videoLoaded && (
          <div
            className={
              "opening__container anima" + droppedItems.length + " _container"
            }
          >
            {droppedItems.map((item, index) => (
              <div
                key={index}
                className={"obj obj" + (index + 1) + " " + item.type}
              >
                <div
                  className={`obj__container ${
                    item.type !== "tank" ? "_obj-tank" : ""
                  }`}
                  //className="obj__container _obj-tank"
                >
                  <div
                    className="obj__img"
                    style={
                      item.type === "tank"
                        ? {
                            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0) 0%, #424142 70px)${TANKS[item.id]?.bg !== undefined ? `, url('img/tanks/${TANKS[item.id].bg}.png')` : ''}, url("img/flags/${TANKS[item.id].land !== undefined ? TANKS[item.id].land : "default"}.png")`,
                            backgroundPosition: '0 0',
                            backgroundSize: '100% auto',
                            backgroundRepeat: 'no-repeat',
                          }
                        : {}
                    }
                  >
                    {item.type === "tank" ? (
                      <>
                        <img
                          src={
                            "img/tanks/" + TANKS[item.id].transcription + ".png"
                          }
                          alt={item.name + "_photo"}
                        />
                      </>
                    ) : (
                      <img
                        src={"img/resources/" + item.type + ".png"}
                        alt={item.name + "_photo"}
                      />
                    )}
                  </div>
                  <div className="obj__text">
                    <div className="obj__text-price">
                      {item.type === "tank" && TANKS[item.id].type === "camo" ? (
                        <span className="fz12 camo">Камуфляж</span>
                      ) : item.type === "tank" ? (
                        <>
                          <img
                            src={`img/flags/${TANKS[item.id].land}_big.png`}
                            alt="tank-img"
                          />
                          <img
                            src={`img/icons/${TANKS[item.id].type}.png`}
                            alt="tank-type"
                          />
                        </>
                      ) : (
                        <span>{item.amount}</span>
                      )}
                    </div>
                    <p className="obj__text-name">
                      {item.type === "tank" ? TANKS[item.id].name : item.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
