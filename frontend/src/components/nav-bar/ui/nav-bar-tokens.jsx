export function NavBarTokens({ tokens }) {

  return (
    <li className="nav__menu-item item-full">
      <img src="img/resources/tokens.png" alt="RES" />
      <p>{tokens}</p>
    </li>
  );
}
