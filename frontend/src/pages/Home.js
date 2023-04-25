import React, { useState, useEffect } from "react"; //ESTADO EN REACT
import { Col, Container, Row } from "react-bootstrap";
import Editor from "../components/Editor";
import Consola from "../components/Consola";
import axios from "axios"; //PETICIONES AL BACKEND
import Navbar from "react-bootstrap/Navbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import LoadingButton from "../components/Button";
import Image from 'react-bootstrap/Image';

function Home() {
  const [codigo, setCodigo] = useState("");
  const [consola, setConsola] = useState("");

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
  /*  const interpretar = async () => {
        console.log("ejecutando")
        try {
            setConsola("ejecutando...");
            if(editor ==""){
                setConsola("No hay codigo para interpretar");
                console.log("No hay codigo para interpretar");
            }else {
                console.log(editor)
                const response = await axios.post('http://localhost:5000/interpreter/interpretar', {code:editor});
                console.log(response.data);
                const {consola,errores} = response.data;   
                console.log(consola);
                setConsola(consola);
            }
        } catch (error) {
            console.log(error);
            setConsola("Error en el servidor");
        }
    }; */

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <div className="img_logo">
        <Image src="https://codespaceacademy.com/wp-content/uploads/2021/09/codespace.png" width="60px" roundedCircle />
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
        <div  className="nav-btn">
        <DropdownButton
            as={ButtonGroup}
            variant="light"
            title="Reports"
            id="bg-nested-dropdown"
            
          >
            <Dropdown.Item eventKey="1">Report Errors</Dropdown.Item>
            <Dropdown.Item eventKey="2">AST tree</Dropdown.Item>
            <Dropdown.Item eventKey="3">Symbols table</Dropdown.Item>
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
        {/*seccion de botones */}
        <Row>
          <Col>
            <br />
            <LoadingButton />
          </Col>
        </Row>
      </Container>
      <footer>
      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        Proyecto 2 Compiladores © 2023 Copyright:  
        <a className='text-reset fw-bold'><br/>
          Ivan Hilario - 201902888
        </a>
      </div>
      </footer>
     
    </>
  );
}

export default Home;
