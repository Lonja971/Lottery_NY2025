import "../../css/modal.css";

export const Modal = ({ active, children }) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__container">
        <div className="fake-nav"></div>
        {children}
      </div>
    </div>
  );
};
