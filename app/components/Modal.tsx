interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`} role="dialog">
  <div className="modal-box relative">
    {children}
    <div className="modal-action justify-center">
      <label onClick={() => setModalOpen(false)} className="btn">Close!</label>
    </div>
  </div>
</div>
  )
}

export default Modal