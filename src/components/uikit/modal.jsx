import "../../css/modal.css";

export const Modal = ({ active, setActive, children }) => {
  return (
    <div className={active ? "_glass modal active" : "_glass modal"}>
      <div className="_container modal__container">{children}</div>
      <div className="modal__close" onClick={() => setActive(false)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
