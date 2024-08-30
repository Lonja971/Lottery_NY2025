import { CASES, TANKS } from "../constants";

export function TankBlock({ tankInfo }) {
  const fullTankInfo = TANKS[tankInfo];

  return (
    <a target="_blank" rel="noopener noreferrer" href={fullTankInfo.link} className="tankblock">
      <div className="tankblock__container">
        <div className={"tankblock__img " + (fullTankInfo.land !== undefined ? fullTankInfo.land : "default")}>
        { TANKS[tankInfo].bg !== undefined ? (
          <div
            className="tank-bg"
            style={{
              background: "url('img/tanks/" + TANKS[tankInfo].bg + ".png') 0 0/100% auto no-repeat"
            }}
          ></div>
        ) : ""}
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