import React, { Component } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import Navbar from "../Containers/Navbar";
import { auth, logout } from "./firebase";
import emergency from "../images/icons/emergencia.png";
import consultas from "../images/characters/consultas.svg";
import medicamentos from "../images/characters/medicamentos.svg";
import logotipo from "../images/probranca-cor.png";
import { Link, Navigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Navbar_platform_admin from '../Containers/Navbar_platform_admin';

const firebase = require('./firebase');
const firebaseConfig = {
  apiKey: "AIzaSyDPwM0HTu_Xa52irgMjUbWbfczplh_JO48",
  authDomain: "ativamenteprobranca.firebaseapp.com",
  projectId: "ativamenteprobranca",
  storageBucket: "ativamenteprobranca.appspot.com",
  messagingSenderId: "147788951852",
  appId: "1:147788951852:web:d019da8a750c193d4afc89",
  measurementId: "G-T350E5L1GS",
  databaseURL: "https://ativamenteprobranca-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      uuid: auth.currentUser.reloadUserInfo.localId,
      variavel_contactos: 0,
    };
  }

  openSponsors = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  logout = async () => {
    console.log("logout");
    await logout(auth);
    return (<Navigate to="/login" replace={true} />); /* THIS IS NOT WORKING */
  };

  getVariavelContactos = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `Newdata_${this.state.uuid}/variaveis_contact`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({
        variavel_contactos: data.var_contact
      })
      if (data.var_contact == null && data.var_contact == null) {
        const db = getDatabase();
        // const starCountRef = ref(db, `Newdata_${this.state.uuid}/variaveis_contact`);
        set(ref(db, `Newdata_${this.state.uuid}/variaveis`), {
          var_consulta: 0,
        })
          .catch(error => console.log(error));
        console.log('DATA SAVED_var_consult');
        //criação variáveis contactos
        set(ref(db, `Newdata_${this.state.uuid}/variaveis_contact`), {
          var_contact: 0,
        })
          .catch(error => console.log(error));

        console.log('DATA SAVED_var_contacts');
      } else if (data.var_contact == null) {
        const db = getDatabase();
        set(ref(db, `Newdata_${this.state.uuid}/variaveis`), {
          var_consulta: 0,
        })
          .catch(error => console.log(error));
        console.log('DATA SAVED_var_consult');
      } else if (data.var_contact == null) {
        const db = getDatabase();

        set(ref(db, `Newdata_${this.state.uuid}/variaveis_contact`), {
          var_contact: 0,
        })
          .catch(error => console.log(error));

        console.log('DATA SAVED_var_contacts');
      } else {
        console.log("Já tem dados")
      }
    });


  };

  componentDidMount() {
    this.getVariavelContactos();
  }

  render() {
    //console.log(this.constructor.name);

    return (
      <div>
        <div className="frame" id="home">
          <Row>
            <Col xs={8}>
              <h1 className="green">
                Bem-vindo <span className="blue">{auth.currentUser.email}</span>
              </h1>

              <p className="blue paragraphInfo">
                No painel abaixo veja as suas próximas consultas e os seus
                contactos mais recentes.
                <br />
                Do lado direito pode consultar páginas específicas.
              </p>
            </Col>

            <Col xs={4} className="btnsAjuda">
              <Button className="btnInfo blue" onClick={this.openSponsors}>
                i
              </Button>

              <Button className="btnBorderRed blue" id="emergency">
                <img src={emergency} alt="ícone de telefone" />
                Emergência
              </Button>
            </Col>
          </Row>

          <Row className="cards">
            <Card className="col-6 boxShadow">
              <h3 className="green">Próximas consultas:</h3>

              <Row>
                <Col xs={6}>
                  <p className="bold">29/06 às 14h30</p>
                  <p>Hospital de Aveiro</p>

                  <p className="bold">03/07 às 10h40</p>
                  <p>Hospital de Aveiro</p>
                </Col>

                <Col xs={6}>
                  <img src={consultas} />
                </Col>
              </Row>
            </Card>

            <Card className="col-6 boxShadow">
              <h3 className="red">Tome os seguintes medicamentos:</h3>

              <Row>
                <Col xs={6}>
                  <p className="bold">Pequeno-almoço</p>
                  <p>
                    1 cápsula de <span className="medium">Ferrum</span>
                  </p>

                  <p className="bold">Almoço</p>
                  <p>
                    1 saqueta de <span className="medium">Fosfoglutina</span>
                  </p>
                </Col>

                <Col xs={6} className="alignEnd">
                  <img src={medicamentos} />
                </Col>
              </Row>
            </Card>
          </Row>

          <Row className="otherSources">
            <Col className="outsideSource">
              <iframe
                src="https://www.youtube.com/embed/_cVNCuvz8qI?controls=0"
                title="Canal de Fátima"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="boxShadow"
              ></iframe>

              <Button className="btnFill">
                <a href="https://youtu.be/_cVNCuvz8qI" target="_blank">
                  Ver “Fátima” em direto
                </a>
              </Button>
            </Col>

            <Col className="outsideSource">
              <iframe
                src="https://www.youtube.com/embed/_cVNCuvz8qI?controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="boxShadow"
              ></iframe>

              <Button className="btnFill">Ver vídeos da ProBranca</Button>
            </Col>
          </Row>

          <Row className="otherSources">
            <Col className="outsideSource">
              <div className="imgSource boxShadow" id="facebook"></div>

              <Button className="btnFill">
                <a href="fb://facewebmodal/">Consultar Facebook</a>
              </Button>
            </Col>

            <Col className="outsideSource">
              <div className="imgSource boxShadow" id="google"></div>

              <Button className="btnFill">
                <a href="https://www.google.pt/" target="_blank">
                  Pesquisar
                </a>
              </Button>
            </Col>
          </Row>

          <Row className="otherSources">
            <Col className="outsideSource">
              <p>Para adicionar contactos, novas consultas e a medicação do utilizador: {this.state.email} Peça ajuda a uma colaboradora da ProBranca</p>
              <Link to="/mostrarcontactos"><Button className="btnFill">
                Ir para a ferramenta de administração
              </Button></Link>
            </Col>
          </Row>
        </div>


        <Navbar ativo={"home"} />

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="blue">
              Este projeto foi desenvolvido por:
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img src={logotipo} />
          </Modal.Body>

          <Modal.Footer>
            <Button className="btnFill" onClick={this.logout}>
              Sair da conta
            </Button>

            <Button className="btnFill" onClick={this.handleClose}>
              Fechar janela
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}
