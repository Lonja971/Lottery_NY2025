import "../../css/modal.css";

export const Modal = ({ active, children }) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="_container modal__container">{children}</div>
    </div>
  );
};
