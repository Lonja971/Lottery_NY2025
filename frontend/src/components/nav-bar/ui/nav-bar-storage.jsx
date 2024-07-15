export function NavBarStorage({ setActiveStorage, modalStorageActive }) {
  
  return (
    <>
      <li
        className={`nav__menu-item item-squard ${modalStorageActive ? "active" : ""}`}
        onClick={() => setActiveStorage(!modalStorageActive)}
      >
        <img src="img/servise/storage.png" alt="Storage" />
        <p>Склад</p>
      </li>
    </>
  );
}
