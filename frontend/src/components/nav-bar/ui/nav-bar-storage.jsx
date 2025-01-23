export function NavBarStorage({ modalStorageActive, handleModalOpen }) {
  
  return (
    <>
      <li
        className={`nav__menu-item item-squard ${modalStorageActive ? "active" : ""}`}
        onClick={() => handleModalOpen("storageModal")}
      >
        <img src="img/servise/storage.png" alt="Storage" />
        <p>Storage</p>
      </li>
    </>
  );
}
