import { TANKS } from "../constants";

export function TankBlock({ tankInfo }) {
  const fullTankInfo = TANKS[tankInfo];

  return (
    <a target="_blank" rel="noopener noreferrer" href={fullTankInfo.link} className="tankblock">
      <div className="tankblock__container">
        <div
          className="tankblock__img"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0) 0%, #424142 70px)${TANKS[tankInfo]?.bg !== undefined ? `, url('img/tanks/${TANKS[tankInfo].bg}.png')` : ''}, url("img/flags/${fullTankInfo.land !== undefined ? fullTankInfo.land : "default"}.png")`,
            backgroundPosition: '0 0',
            backgroundSize: '100% auto',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <img src={"img/tanks/" + fullTankInfo.transcription + ".png"} alt="TANK_IMG" />
        </div>
      </div>
      <div className="tankblock__text">
        <div className="tankblock-info">
          { fullTankInfo.type === "camo" ? (
            <p className="camo-text">Камуфляж</p>
          ) :(
            <>
              <img src={"img/icons/" + fullTankInfo.type + ".png"} alt="TYPE" />
              <img src={"img/flags/" + fullTankInfo.land + "_big.png"} alt="FLAG" />
            </>
          )}
        </div>
        <p>{fullTankInfo.name}</p>
      </div>
    </a>
  );
}