import { TANKS } from "../constants";

export function TankBlock({ tankInfo }) {
  const fullTankInfo = TANKS[tankInfo];

  return (
    <div className="tankblock">
      <div className="tankblock__container">
        <div className={"tankblock__img " + (fullTankInfo.land !== undefined ? fullTankInfo.land : "default")}>
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
              <img src={"img/flags/" + fullTankInfo.land + "_big.png"} alt="TYPE" />
            </>
          )}
        </div>
        <p>{fullTankInfo.name}</p>
      </div>
    </div>
  );
}