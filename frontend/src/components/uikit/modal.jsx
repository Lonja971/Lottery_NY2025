import "../../css/modal.css";

export const Modal = ({ active, children }) => {
  return (
    <div className={active ? "_glass modal active" : "_glass modal"}>
      <div className="_container modal__container">{children}</div>
    </div>
  );
};
