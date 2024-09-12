export function NavBarDrawings({ drawings }) {
  return (
    <li className="nav__menu-item item-full">
      <img src="img/resources/drawings.png" alt="RES" />
      <p>{drawings}</p>
    </li>
  );
}
