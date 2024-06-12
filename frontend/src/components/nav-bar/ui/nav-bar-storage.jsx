export function NavBarStorage({ setActiveStorage }) {
  return (
    <>
      <li
        className="nav__menu-item item-squard"
        onClick={() => setActiveStorage(true)}
      >
        <img src="img/servise/storage.png" alt="Storage" />
        <p>Склад</p>
      </li>
    </>
  );
}
