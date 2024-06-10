export function NavBarTokens({ tokens }) {
  return (
    <li className="nav__menu-item item-full">
      <img src="img/resurses/token.png" alt="RES" />
      <p>{tokens}</p>
    </li>
  );
}
