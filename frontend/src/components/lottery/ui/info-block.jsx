import { RESOURCES, TANKS } from "../../constants";

export function InfoBlock({ item, index, userTanks }){

   const formatNumber = (number) => {
      return number >= 1000 ? (number / 1000) + 'k' : number;
    };

   return(
      item.type !== 'tank' ? (
        <div className="info-block" key={item.type + index}>
          <div className="back-info" title={ RESOURCES[item.type] }>
            {Array.isArray(item.amounts) && (
              <div>
                <p>
                  {item.amounts.length === 1 ? (
                    formatNumber(item.amounts[0])
                  ) : (
                    "" + formatNumber(Math.min(...item.amounts)) + " - " + formatNumber(Math.max(...item.amounts)) + ""
                  )}
                </p>
              </div>
            )}
            <p>
               { item.type !== "case" ? (
                  <img src={"img/resources/" + item.type + ".png"} alt="RES" />
               ) : (
                  <img src={"img/resources/" + item.name + ".png"} alt="RES" />
               )}
            </p>
          </div>
          <div className="back-line"></div>
          <div className="back-procents">
            {item.probability + "%"}
          </div>
        </div>
      ) : (
        
        <a title={TANKS[item.id].name + " "} target="_blank" rel="noopener noreferrer" href={TANKS[item.id].link} className={`info-block info-block-tank ${userTanks?.includes(item.id.toString()) ? "received" : ""}`} key={item.type + index}>
          <div className={"back-info " + ( TANKS[item.id].land ? TANKS[item.id].land : "default" )}>
            {TANKS[item.id].type !== "camo" ? (
              <div>
                <img className="tank-img" src={"img/icons/" + TANKS[item.id].type + ".png"} alt="TYPE" />
              </div>
            ) : (
              <div>
                <span className="camo">камуфляж</span>
              </div>
            )}
            <p>{TANKS[item.id].smallName !==undefined ? TANKS[item.id].smallName : TANKS[item.id].name }</p>
          </div>
          <div className="back-procents">
            {item.probability + "%"}
          </div>
          <div className="line line-top"></div>
          <div className="line line-right"></div>
          <div className="line line-bottom"></div>
          <div className="line line-left"></div>
        </a>
      )
   )
}