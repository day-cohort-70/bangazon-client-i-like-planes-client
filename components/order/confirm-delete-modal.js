import Modal from "../modal"

export default function ConfirmDeleteModal({ showModal, setShowModal, deleteCurrentOrder }) {

  return (
    <Modal showModal={showModal} setShowModal={setShowModal} title="Delete Order">
        <p>Are you sure you would like to delete this order?</p>
        <button className="button is-danger" onClick={() => deleteCurrentOrder()}>Delete Order</button>
        <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
    </Modal>

  )
}