import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";

function ModalTS(props) {
  let listaSimbolos = props.dataSimbolos
  if(listaSimbolos.length === 0){
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Symbols table
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Without Simbolos <BsFillEmojiSunglassesFill/></h3>
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
          <Modal.Title id="contained-modal-title-vcenter">
           Symbols table
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Identifier</th>
          <th>Type</th>
          <th>Type</th>
          <th>Around</th>
          <th>Line</th>
          <th>Column</th>
        </tr>
      </thead>
      <tbody>
      {listaSimbolos.map((simbolo, index) => (
              <tr key={index}>
                <td>{simbolo.id}</td>
                <td>{simbolo.tipo1}</td>
                <td>{simbolo.tipo2}</td>
                <td>{simbolo.ambito}</td>
                <td>{simbolo.linea}</td>
                <td>{simbolo.columna}</td>
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
    

  export default ModalTS;