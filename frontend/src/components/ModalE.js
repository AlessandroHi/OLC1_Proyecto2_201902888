import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";


function ModalE(props) {
  let listaErrors = props.dataErrores;
  if (listaErrors.length === 0) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Bug report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Without errors <BsFillEmojiSunglassesFill/></h3>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Bug report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Description</th>
              <th>Line</th>
              <th>Column</th>
            </tr>
          </thead>
          <tbody>
            {listaErrors.map((error, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{error.tipo}</td>
                <td>{error.description}</td>
                <td>{error.linea}</td>
                <td>{error.columna}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalE;
