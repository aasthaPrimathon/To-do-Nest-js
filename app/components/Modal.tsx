interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode
}

const Modal = (props: ModalProps) => {
  const { modalOpen, setModalOpen, children } = props;

  const closeModelHandler = () => {
    setModalOpen(false);
  }

  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`} role="dialog">
  <div className="modal-box relative">
    {children}
    <div className="modal-action justify-center">
      <label onClick={closeModelHandler} className="btn">Close!</label>
    </div>
  </div>
</div>
  )
}

export default Modal;
