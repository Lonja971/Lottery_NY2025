import { TANKS } from "../constants";

export function TankBlock({ tank }) {
  const tankInfo = TANKS[tank];

  return (
    <div className="item__block tank-block">
      <div className={"tank__img-block " + tankInfo.land}>
        <img
          className="tank-icon"
          src={"img/icons/" + tankInfo.type + ".png"}
          alt="SYMBOL_IMG"
        />
        <img src={"img/tanks/" + tank + ".png"} alt="TANK_IMG" />
      </div>
      <p>{tankInfo.name}</p>
    </div>
  );
}
