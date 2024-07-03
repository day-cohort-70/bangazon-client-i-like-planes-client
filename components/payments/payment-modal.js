import { useRef } from "react"
import { Input } from "../form-elements"
import Modal from "../modal"

export default function AddPaymentModal({ showModal, setShowModal, addNewPayment }) {
  const merchantNameInput = useRef()
  const acctNumInput = useRef()
  const expirationDateInput = useRef()

  const handleAddNewPayment = () => {
    addNewPayment({
      account_number: acctNumInput.current.value,
      merchant_name: merchantNameInput.current.value,
      expiration_date: expirationDateInput.current.value
    })
    merchantNameInput.current.value = ''
    acctNumInput.current.value = ''
    expirationDateInput.current.value = ''
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal} title="Add New Payment Method">
      <>
        <Input
          id="merchantName"
          type="text"
          label="Merchant Name"
          refEl={merchantNameInput}
        />
        <Input
          id="accNum"
          type="text"
          label="Account Number"
          refEl={acctNumInput}
        />
        <Input
          id="expirationDate"
          type="date"
          label="Expiration Date"
          refEl={expirationDateInput}
        />
      </>
      <>
        <button
          className="button is-success"
          onClick={handleAddNewPayment}
        >Add Payment Method</button>
        <button 
          className="button" 
          onClick={() => {
            setShowModal(false)

          }}
        >Cancel</button>
      </>
    </Modal>
  )
}
