export function NavBarRedTokens({ redTokens }) {
  return (
    <li className="nav__menu-item item-full">
      <img src="img/resources/red_token.png" alt="RES" />
      <p>{redTokens}</p>
    </li>
  );
}
