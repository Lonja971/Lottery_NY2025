export function NavBarGold({ gold }) {
  return (
    <li
      className="nav__menu-item item-full"
    >
      <img src="img/resources/gold.png" alt="RES" />
      <p id="gold">{gold.toLocaleString()}</p>
    </li>
  );
}
