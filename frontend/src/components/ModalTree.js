import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalTre(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
         AST TREE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       {/*   IMAGEN DE ARBOL */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ModalTre;