import React, { Component } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import logotipo from "../images/probranca-cor.png";
import bpi from "../images/bpi.png";
import Navbar from "../Containers/Navbar";
import { logout } from "./firebase";
import emergency from "../images/icons/emergencia.png";
import { useNavigate, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Data_Extensa from "./Data_Extensa";
import desligar from "../images/icons/logout.png";

const firebase = require("./firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDPwM0HTu_Xa52irgMjUbWbfczplh_JO48",
  authDomain: "ativamenteprobranca.firebaseapp.com",
  projectId: "ativamenteprobranca",
  storageBucket: "ativamenteprobranca.appspot.com",
  messagingSenderId: "147788951852",
  appId: "1:147788951852:web:d019da8a750c193d4afc89",
  measurementId: "G-T350E5L1GS",
  databaseURL:
    "https://ativamenteprobranca-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
var listItems,
  listItems_2 = [];

export default class Chamadas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      show2: false,
      uuid: auth.currentUser.reloadUserInfo.localId,
      email: auth.currentUser.reloadUserInfo.email,
      datas: [],
      pesquisa: "",
      resultado: [],
      estado: false,
    };
  }

  openSponsors = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  openEmergency = () => this.setState({ show2: true });
  closeEmergency = () => this.setState({ show2: false });

  logout = async () => {
    //console.log("logout");
    await logout(auth);
    window.location.reload();
  };

  componentDidMount() {
    const db = getDatabase();
    const starCountRef = ref(db, `Newdata_${this.state.uuid}/contactos`);
    onValue(starCountRef, (snapshot) => {
      var data = snapshot.val();

      this.setState({
        datas: Object.values(snapshot.val()),
      });

      //console.log(data);
    });
  }

  textoPesquisa = (event) => {
    listItems_2 = [];
    this.setState({ pesquisa: event.target.value });

    if (event.target.value != "") {
      let searchQuery = event.target.value.toLowerCase();

      //console.log(this.state.datas);

      for (const key in this.state.datas) {
        let nomeExiste = this.state.datas[key].contacto_Nome.toLowerCase();
        let contactoTlmv = this.state.datas[key].contacto_telPesso;

        if (nomeExiste.startsWith(searchQuery)) {
          /* console.log({
            thisstatedatas: this.state.datas[key].contacto_Nome.toLowerCase()
          }); */

          /* Esconde lista de todos os contactos */
          listItems = "";
          document.getElementById("div_content").style.display = "none";
          document.getElementById("div_content_v2").style.display = "flex";

          listItems_2.push(
            <Col className="contact" key={key}>
              <h3> {this.state.datas[key].contacto_Nome} </h3>
              <a
                className="none_a_link"
                href={`https://api.whatsapp.com/send?phone=${contactoTlmv}`}
                target="_blank"
              >
                <Button className="btnFillWhite blue">Ligar</Button>
              </a>
            </Col>
          );
        }
      }
    } else {
      listItems_2 = [];

      if (this.state.datas.length > 0) {
        document.getElementById("div_content").style.display = "flex";
        document.getElementById("div_content_v2").style.display = "none";

        listItems = this.state.datas.map((data, i) => (
          <Col className="contact" key={i}>
            <h3> {data.contacto_Nome} </h3>
            <a
              className="none_a_link"
              href={`https://api.whatsapp.com/send?phone=${data.contacto_telPesso}`}
              target="_blank"
            >
              <Button className="btnFillWhite blue">Ligar</Button>
            </a>
          </Col>
        ));
      }
    }
  };

  render() {
    if (this.state.datas.length > 0) {
      listItems = this.state.datas.map((data, i) => (
        <Col className="contact" key={i}>
          <h3> {data.contacto_Nome} </h3>
          <a
            className="none_a_link"
            href={`https://api.whatsapp.com/send?phone=${data.contacto_telPesso}`}
            target="_blank"
          >
            <Button className="btnFillWhite blue">Ligar</Button>
          </a>
        </Col>
      ));
    } else {
      listItems = (
        <p className="blue medium">
          Não tem contactos adicionados pela Probranca.
        </p>
      );
    }

    return (
      <div>
        <div className="frame" id="chamadas">
          <Row>
            <Col xs={9}>
              <h1 className="green">Chamadas</h1>
              <Data_Extensa />
            </Col>

            <Col xs={3} className="btnsAjuda">
              <Row>
                <Button
                  className="btnInfo blue"
                  id="desligar"
                  onClick={this.logout}
                >
                  <img src={desligar} />
                </Button>

                <Button className="btnInfo blue" onClick={this.openSponsors}>
                  i
                </Button>
              </Row>

              <Button
                className="btnBorderRed blue"
                id="emergency"
                onClick={this.openEmergency}
              >
                <img src={emergency} alt="ícone de telefone" />
                Emergência
              </Button>
            </Col>

            <Row>
              <p className="blue paragraphInfo">
                Ligue para os seus contactos preferidos. Para fazer uma chamada
                WhatsApp, carregue no nome da pessoa com quem pretende falar.
                <br />
                Para aceder a outros espaços da plataforma, navegue nos botões
                da barra à direita.
              </p>
            </Row>
          </Row>

          <Row>
            <Form.Control
              type="text"
              placeholder="Pesquise pelo nome da pessoa a quem pretende ligar"
              id="searchContact"
              onChange={this.textoPesquisa}
            />

            <Row className="contacts" id="div_content">
              {
                listItems
                /* dados.map((fruit) => ) */
              }
            </Row>

            <Row className="contacts" id="div_content_v2">
              {listItems_2}
            </Row>

            {/* <Row className="contacts">
              <Col className="contact">
                <h3>Pessoa 1</h3>
                <p className="white">Filho</p>
              </Col>
              <Col className="contact">
                <h3>Pessoa 2</h3>
                <p className="white">Filho</p>
              </Col>
              <Col className="contact">
                <h3>Pessoa 3</h3>
                <p className="white">Filho</p>
              </Col>
            </Row> */}

            {/* <Row className="contacts">
              <Col className="contact">
                <h3>Pessoa 4</h3>
                <p className="white">Filho</p>
              </Col>
              <Col className="contact">
                <h3>Pessoa 5</h3>
                <p className="white">Filho</p>
              </Col>
              <Col className="contact">
                <h3>Pessoa 6</h3>
                <p className="white">Filho</p>
              </Col>
            </Row> */}
          </Row>

          <Navbar ativo={"chamadas"} />

          {/* Modal informações */}
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="blue">
                Este projeto foi desenvolvido por:
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <img src={logotipo} />
              <img src={bpi} />
            </Modal.Body>

            <Modal.Footer>
              <Link to="/mostrarcontactos">
                <Button className="btnFill">
                  Ir para a ferramenta de administração
                </Button>
              </Link>

              <Button className="btnFill" onClick={this.logout}>
                Sair da conta
              </Button>

              <Button
                className="btnBorderBlue blue btnSmaller"
                onClick={this.handleClose}
              >
                Fechar janela
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal contactos de emergência */}
          <Modal show={this.state.show2} onHide={this.closeEmergency}>
            <Modal.Header closeButton>
              <Modal.Title className="blue">
                Contactos de emergência
              </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ margin: "5px 40px", fontSize: "2rem" }}>
              <p className="blue">
                <b>
                  <span className="green">INEM: </span>
                </b>
                <a href="tel:112">112</a>
              </p>

              <p className="blue">
                <b>
                  <span className="green">GNR Albergaria-a-Velha: </span>
                </b>
                <a href="tel:234521237">234 521 237</a>
              </p>

              <p className="blue">
                <b>
                  <span className="green">Bombeiros Albergaria-a-Velha: </span>
                </b>
                <a href="tel:234529112">234 529 112</a>
              </p>

              <p className="blue">
                <b>
                  <span className="green">PROBRANCA: </span>
                </b>
                <a href="tel:234540220">234 540 220</a>
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                className="btnBorderBlue blue"
                onClick={this.closeEmergency}
              >
                Fechar janela
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
