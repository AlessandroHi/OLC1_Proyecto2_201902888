import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import { Graphviz } from 'graphviz-react';

function ModalTre(props) {
    const optionsgp = { fit: true, lenght: 900, width: 770, zoom: true }
    return (
      <Modal className="moda-ast"
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
        <Modal.Body className="modal-body">
        <Graphviz className="img-AST" options={optionsgp} dot={props.dataAST}></Graphviz>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ModalTre;