import { TANKS } from "../constants";

export function TankBlock({ tankInfo }) {
  const fullTankInfo = TANKS[tankInfo];

  return (
    <div className="item__block tank-block">
      <div className={"tank__img-block " + (fullTankInfo.land !== undefined ? fullTankInfo.land : "default")}>
        { fullTankInfo.type !== "camo" ? (
          <img
            className="tank-icon"
            src={"img/icons/" + fullTankInfo.type + ".png"}
            alt="SYMBOL_IMG"
          />
        ) : ( "" )}
        <img src={"img/tanks/" + fullTankInfo.transcription + ".png"} alt="TANK_IMG" />
      </div>
      <p>{fullTankInfo.name}</p>
    </div>
  );
}