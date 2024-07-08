export function ModalExchange({ setActive }) {
  return (
    <>
      <div className="modal__close" onClick={() => setActive(false)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div>Text from Modal Exchange</div>
    </>
  )
}
