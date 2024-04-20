import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
const ModalComponent = ({ show, setShow, component }) => {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{component}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};
ModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  component: PropTypes.node.isRequired,
};
export default ModalComponent;
