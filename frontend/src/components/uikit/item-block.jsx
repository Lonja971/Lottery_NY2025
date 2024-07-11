export function ItemBlock({ resource, value }) {
  return (
    <div className="item__block">
      <img src={"img/resources/" + resource + ".png"} alt="RES" />
      <p>{Number(value).toLocaleString()}</p>
    </div>
  );
}
