import React, { Component } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import Navbar from "../Containers/Navbar";
import { auth, logout } from "./firebase";
import emergency from "../images/icons/emergencia.png";
import consultas from "../images/characters/consultas.svg";
import medicamentos from "../images/characters/medicamentos.svg";
import logotipo from "../images/probranca-cor.png";
import { useNavigate, Link } from "react-router-dom";
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
import Navbar_platform_admin from "../Containers/Navbar_platform_admin";

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

var listMedicamentos, listConsultas;
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      uuid: auth.currentUser.reloadUserInfo.localId,
      variavel_contactos: 0,
      variavel_consulta: 0,
      medicamentos: [],
      consultas: [],
    };
  }

  openSponsors = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  logout = async () => {
    console.log("logout");
    await logout(auth);
    window.location.reload();
  };

  getVariavelContactos = () => {
    const db = getDatabase();
    const starCountRef = ref(
      db,
      `Newdata_${this.state.uuid}/variaveis_contact`
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (data == null) {
        const db = getDatabase();

        set(ref(db, `Newdata_${this.state.uuid}/variaveis_contact`), {
          var_contact: 0,
        }).catch((error) => console.log(error));

        // console.log('DATA SAVED_var_contacts');
      } else {
        this.setState({
          variavel_contactos: data.var_contact,
        });
        console.log("Já tem dados");
      }
    });
  };

  getVariavelConsulta = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `Newdata_${this.state.uuid}/variaveis`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      console.log(data.var_consulta);
      if (data == null) {
        const db = getDatabase();

        set(ref(db, `Newdata_${this.state.uuid}/variaveis`), {
          var_consulta: 0,
        }).catch((error) => console.log(error));
      } else {
        this.setState({
          variavel_consulta: data.var_consulta,
        });
        console.log("Já tem dados");
      }
    });
  };

  getVariavelMedicamentos = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `Newdata_${this.state.uuid}/variavel_Med`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      console.log(data);

      if (data == null) {
        const db = getDatabase();

        set(ref(db, `Newdata_${this.state.uuid}/variavel_Med`), {
          variavel_medicame: 0,
        }).catch((error) => console.log(error));

        // console.log('DATA SAVED_var_med');
      } else {
        this.setState({
          variavel_medicame: data.variavel_medicame,
        });
        console.log("Já tem dados");
      }
    });
  };

  getMedicamentosList = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `Newdata_${this.state.uuid}/medicamentos`);
    onValue(starCountRef, (snapshot) => {
      var data = snapshot.val();
      this.setState({
        medicamentos: Object.values(snapshot.val()),
      });
      // console.log(Object.values(snapshot.val()))
    });
  };

  getConsultasList = () => {
    const db = getDatabase();
    const starCountRef = ref(db, `Newdata_${this.state.uuid}/consultas`);
    onValue(starCountRef, (snapshot) => {
      var data = snapshot.val();
      this.setState({
        consultas: Object.values(snapshot.val()),
      });
      console.log(Object.values(snapshot.val()));
    });
  };

  componentDidMount() {
    this.getVariavelContactos();
    this.getVariavelConsulta();
    this.getVariavelMedicamentos();
    this.getMedicamentosList();
    this.getConsultasList();
  }

  render() {
    //console.log(this.constructor.name);

    if (this.state.medicamentos.length > 0) {
      listMedicamentos = this.state.medicamentos.map((data, i) => (
        <>
          <p className="bold" key={i}>
            {data.momento_tomar}
          </p>
          <p>
            1 cápsula de <span className="medium">{data.medicamento}</span>
          </p>
        </>
      ));
    } else {
      <p className="bold">Não tem medicamentos para tomar</p>;
    }

    if (this.state.consultas.length > 1) {
      listConsultas = (
        <>
          <p className="bold">
            {
              this.state.consultas[this.state.consultas.length - 1]
                .contacto_Nome
            }
          </p>
          <p>
            Dia{" "}
            {
              this.state.consultas[this.state.consultas.length - 1]
                .data_consulta
            }{" "}
            às{" "}
            {
              this.state.consultas[this.state.consultas.length - 1]
                .time_consulta
            }
          </p>

          <p className="bold">
            {
              this.state.consultas[this.state.consultas.length - 2]
                .contacto_Nome
            }
          </p>
          <p>
            Dia{" "}
            {
              this.state.consultas[this.state.consultas.length - 2]
                .data_consulta
            }{" "}
            às{" "}
            {
              this.state.consultas[this.state.consultas.length - 2]
                .time_consulta
            }
          </p>
        </>
      );
    } else if (
      this.state.consultas.length > 0 &&
      this.state.consultas.length <= 1
    ) {
      listConsultas = (
        <>
          <p className="bold">
            {
              this.state.consultas[this.state.consultas.length - 1]
                .contacto_Nome
            }
          </p>
          <p>
            Dia{" "}
            {
              this.state.consultas[this.state.consultas.length - 1]
                .data_consulta
            }{" "}
            às{" "}
            {
              this.state.consultas[this.state.consultas.length - 1]
                .time_consulta
            }
          </p>
        </>
      );
    } else {
      listConsultas = <p className="bold">Não tem consultas agendadas</p>;
    }

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
                  {listConsultas}

                  {/* <p className="bold">03/07 às 10h40</p>
                  <p>Hospital de Aveiro</p> */}
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
                  {listMedicamentos}

                  {/* <p className="bold">Almoço</p>
                  <p>
                    1 saqueta de <span className="medium">Fosfoglutina</span>
                  </p> */}
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
                src="https://www.youtube.com/embed/-ZXSzD1Dlis"
                title="Canal de Fátima"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="boxShadow"
              ></iframe>

              <Button className="btnFill">
                <a
                  href="https://www.youtube.com/embed/-ZXSzD1Dlis"
                  target="_blank"
                >
                  Ver “Fátima” em direto
                </a>
              </Button>
            </Col>

            <Col className="outsideSource">
              <iframe
                src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FPROBRANCA%2Fvideos%2F706988213638447%2F&show_text=false&width=560&t=0"
                className="boxShadow"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen="true"
              ></iframe>

              <Button className="btnFill">
                <a
                  href="https://www.youtube.com/user/Probranca"
                  target="_blank"
                >
                  Ver vídeos da ProBranca
                </a>
              </Button>
            </Col>
          </Row>

          <Row className="otherSources">
            <Col className="outsideSource">
              <div className="imgSource boxShadow" id="facebook"></div>

              <Button className="btnFill">
                <a href="https://play.google.com/store/apps/details?id=com.facebook.katana">
                  Ver Facebook
                </a>
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
            <Col className="outsideSource"></Col>
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
            <Link to="/mostrarcontactos">
              <Button className="btnFill">
                Ir para a ferramenta de administração
              </Button>
            </Link>

            <Button className="btnFill" onClick={this.logout}>
              Sair da conta
            </Button>

            <Button className="btnBorderBlue blue" onClick={this.handleClose}>
              Fechar janela
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
