import "../../css/modal.css";

export const Modal = ({ active, children, handleModalOpen }) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__container">
        <div className="fake-nav"></div>
        <div className="_glass modal-close-block">
          <div className="modal-close-kruist" onClick={() => handleModalOpen("close")}>
            HOME
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
