import { Button, Modal } from "react-bootstrap"
import PropTypes from "prop-types"
const ConfirmComponent =({show, setShow, message, title, handleConfirm})=>{
    const handleClose = () => setShow(false);
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
ConfirmComponent.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  message: PropTypes.string,
  title: PropTypes.string,
  handleConfirm: PropTypes.func,
}
export default ConfirmComponent