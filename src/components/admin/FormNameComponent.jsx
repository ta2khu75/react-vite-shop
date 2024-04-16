import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
const FormNameComponent = ({
  show,
  setShow,
  name,
  setName,
  title,
  handleSubmit,
}) => {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
FormNameComponent.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setName: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
  handleSubmit: PropTypes.func,
};
export default FormNameComponent;
{/* <Form.Group controlId="formBasic">
  <Form.Check
    type="radio"
    className="btn btn-outline-primary "
    hidden
    label="Check me out"
  />
</Form.Group>; */}
