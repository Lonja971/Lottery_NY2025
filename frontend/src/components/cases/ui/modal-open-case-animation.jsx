import "../../../css/open-animation.css";
import "../../../css/dropping-animation.css";
import { OpeningCasesLogic } from "../opening-cases-logic";
import { useState, useEffect } from "react";
import { LEGENDARY_CASE, REGULAR_CASE } from "../../constants";

export function ModalOpenCaseAnimation({ setActive }) {

  const [droppedItems, setDroppedItems] = useState([]);

  const caseResourcesInfo = REGULAR_CASE;

  useEffect(() => {
    console.log('yes');
    OpeningCasesLogic(caseResourcesInfo, setDroppedItems);
  }, []);

  return (
    <>
      <button className="btn _glass anima-btn" onClick={() => setActive(false)}>
        Забрати
        <div className="line line-top"></div>
        <div className="line line-right"></div>
        <div className="line line-bottom"></div>
        <div className="line line-left"></div>
      </button>
      <div className="opening">
        <video muted id="video" className="video opening__video" src="video/Відео без назви — зроблено у Clipchamp (2).mp4" autoPlay></video>
        <div className={"opening__container anima"+ droppedItems.length +" _container"}>
          {droppedItems.map((item, index) => (
            <div key={index} className={"obj obj"+ (index + 1) + " " + item.type}>
              <div className={`obj__container ${item.type === "tank" ? "_obj-tank" : ""}`}>
                <div className={`obj__img ${item.type === "tank" ? item.tankInfo.land : ""}`}>
                  {item.type === "tank" ? (
                    <>
                      <img src={"img/tanks/" + item.tankInfo.transcription + ".png"} alt={ item.name + "_photo" } />
                    </>
                  ) : (
                    <img src={"img/resources/" + item.type + ".png"} alt={ item.name + "_photo" } />
                  )}
                </div>
                <div className="obj__text">
                  <div className="obj__text-price">
                    {item.type === "tank" && item.tankInfo.type === "camo" ? (
                      <span className="fz12">Камуфляж</span>
                    ) : item.type === "tank" ? (
                      <>
                        <img src={`img/flags/${item.tankInfo.land}-big.png`} alt="tank-img" />
                        <img src={`img/icons/${item.tankInfo.type}.png`} alt="tank-type" />
                      </>
                    ) : (
                      <span>{item.amount}</span>
                    )}
                  </div>
                  <p className="obj__text-name">{ item.type === "tank" ? item.tankInfo.name : item.name }</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}