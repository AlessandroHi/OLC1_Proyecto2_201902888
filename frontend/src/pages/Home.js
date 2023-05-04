import React, { useState, useEffect } from "react"; //ESTADO EN REACT
import { Col, Container, Row } from "react-bootstrap";
import Editor from "../components/Editor";
import Consola from "../components/Consola";
import axios from "axios"; //PETICIONES AL BACKEND
import Navbar from "react-bootstrap/Navbar";
import DropdownButton from "react-bootstrap/DropdownButton"; //MENU DESPLEGABLE
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import LoadingButton from "../components/Button";
import Image from "react-bootstrap/Image";
import ModalE from "../components/ModalE";
import ModalTree from "../components/ModalTree";
import ModalTS from "../components/ModalTS";

function Home() {
  const [codigo, setCodigo] = useState(""); //mostrar editor
  const [consola, setConsola] = useState(""); // mostrar consola
  const [dataErrores, setErrores] = useState(""); // mostrar errores
  const [dataAST, setAST] = useState(""); // RECIBIR  AST
  const [dataSimbolos, setSimbolos] = useState(""); // RECIBIR  SIMBOLOS
  
  //------ CARGA DE ARCHIVO
  const cargarArchivo = (event) => {
    const cadenita = event.target.files[0];
    uploadDocument(cadenita);
  };

  function uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      setCodigo(fileReader.result);
    };
    fileReader.readAsText(file);
  }

  function onChange(newValue) {
    setCodigo(newValue);
  }
  //-----------------------------------

  //------------ INTERPRETE--------------
  const interpretar = async () => {
    try {
      if (codigo == "") {
        setConsola("Aun no ha ingresado codigo");
      } else {
        console.log(codigo);
        const response = await axios.post(
          "http://localhost:5000/interpreter/interpretar",
          { code: codigo }
        );
        //console.log(response.data);  VER QUE DATOS SE ENVIAN
      
        const { consola, errores, AST, simbolos } = response.data; //RECOLETA PRINT, ERRORES, AST , TABLA SIMBOLOS
        setErrores(errores) //se guardan errores
        setConsola(consola); // se muestra los prints
        setAST(AST)  //SE GUARDAR EL GRAFO AST
        setSimbolos(simbolos) // SE GUARDA SIMBOLOS
      }
    } catch (error) {
      console.log(error);
      setConsola("Error en el servidor");
      
    }
  };

  //---------------------------------------------------------------
  //---------------------- MODAL ERRORS  --------------------------
  const [modalShow, setModalShow] = useState(false);

  //---------------------------------------------------------------
  //---------------------- MODAL AST TREE  --------------------------
  const [modalShow1, setModalShow1] = useState(false);

  //---------------------------------------------------------------
  //---------------------- MODAL TS  --------------------------
  const [modalShow2, setModalShow2] = useState(false);

  //---------------------------------------------------------------
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <div className="img_logo">
          <Image
            src="https://codespaceacademy.com/wp-content/uploads/2021/09/codespace.png"
            width="60px"
            roundedCircle
          />
        </div>
        <div className="name_py">
          <h2>TypeWise</h2>
        </div>
        <div className="nav-btn">
          <DropdownButton
            as={ButtonGroup}
            variant="light"
            title="File"
            id="bg-nested-dropdown"
          >
            <Dropdown.Item eventKey="1" as="label" htmlFor="file" type="button">
              Open File
            </Dropdown.Item>
            <input type="file" id="file" hidden onChange={cargarArchivo} />
            <Dropdown.Item eventKey="2">Save File</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="nav-btn">
          <DropdownButton
            as={ButtonGroup}
            variant="light"
            title="Reports"
            id="bg-nested-dropdown"
          >
            <Dropdown.Item eventKey="1" onClick={() => setModalShow(true)}>
              Report Errors
            </Dropdown.Item>
            <ModalE show={modalShow} dataErrores={dataErrores} onHide={() => setModalShow(false)} />
            <Dropdown.Item eventKey="2" onClick={() => setModalShow1(true)}>
              AST Tree
            </Dropdown.Item>
            <ModalTree show={modalShow1}   dataAST={dataAST} onHide={() => setModalShow1(false)} />

            <Dropdown.Item eventKey="3"  onClick={() => setModalShow2(true)}>
              Symbols table
            </Dropdown.Item>
            <ModalTS show={modalShow2} dataSimbolos={dataSimbolos} onHide={() => setModalShow2(false)} />
          </DropdownButton>
        </div>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <h1>Editor</h1>
          </Col>
          <Col>
            <h1>Console</h1>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "left" }}>
            <Editor codigo={codigo} onChange={onChange} />
          </Col>

          <Col style={{ textAlign: "left" }}>
            <Consola consola={consola} />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <LoadingButton interpretar={interpretar} />
          </Col>
        </Row>
      </Container>
      <footer>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          Proyecto 2 Compiladores © 2023 Copyright:
          <a className="text-reset fw-bold">
            <br />
            Ivan Hilario - 201902888
          </a>
        </div>
      </footer>
    </>
  );
}

export default Home;
