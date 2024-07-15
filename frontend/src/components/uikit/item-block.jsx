import { CASES, RESOURCES } from "../constants";

export function ItemBlock({ type, resource, value }) {
  return (
    <div className="item__block">
      <img src={"img/resources/" + resource + ".png"} alt="RES" />
      <div className="item__block-text">
        <div>
          <p className="_glass res-item-value">{Number(value).toLocaleString()}</p>
        </div>
        { type === "case" ? <p>{CASES[resource].name}</p> : <p>{RESOURCES[resource]}</p>}
      </div>
    </div>
  );
}