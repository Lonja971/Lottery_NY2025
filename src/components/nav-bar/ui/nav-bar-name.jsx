export function NavBarName({ name }) {
  return (
    <li className="nav__menu-item item-full">
      <a href="#">{name}</a>
      <p className="info-text">Нік зареєстрованого користувача.</p>
    </li>
  );
}
