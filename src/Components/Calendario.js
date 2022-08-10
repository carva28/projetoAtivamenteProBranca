import React, { Component } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import logotipo from "../images/probranca-cor.png";
import bpi from "../images/bpi.png";
import Navbar from "../Containers/Navbar";
import { auth, logout } from "./firebase";
import emergency from "../images/icons/emergencia.png";
import { useNavigate, Link } from "react-router-dom";
import consultas from "../images/characters/consultas.svg";
import medicamentos from "../images/characters/medicamentos.svg";
import consultasIcone from "../images/icons/consultas.svg";
import { getDatabase, ref, set, onValue } from "firebase/database";
import moment from "moment";

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

var listMedicamentos,
  listConsultas,
  listConsultasPassadas,
  consultasPassadas = [];
export default class Calendario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      show2: false,
      uuid: auth.currentUser.reloadUserInfo.localId,
      variavel_contactos: 0,
      variavel_consulta: 0,
      medicamentos: [],
      consultas: [],
    };
  }

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

  openSponsors = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  openEmergency = () => this.setState({ show2: true });
  closeEmergency = () => this.setState({ show2: false });

  logout = async () => {
    console.log("logout");
    await logout(auth);
    window.location.reload();
  };

  componentDidMount() {
    this.getVariavelConsulta();
    this.getVariavelMedicamentos();
    this.getMedicamentosList();
    this.getConsultasList();
  }

  render() {
    var dateMaquina = new Date();
    let dia = dateMaquina.getDate();
    let mes = dateMaquina.getMonth();
    let ano = dateMaquina.getFullYear();

    if (mes > 1) {
      mes = mes + 1;
    }

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

    if (this.state.consultas.length > 0) {
      consultasPassadas = [];
      listConsultas = this.state.consultas.map((data, i) => {
        var dataConsulta = new Date(data.data_consulta);
        let mesConsulta = dataConsulta.getMonth();
        if (mesConsulta > 1) {
          mesConsulta = mesConsulta + 1;
        }

        let diaConsulta = dataConsulta.getDate();
        let dif_Ano = moment(ano.toString()).isSame(
          dataConsulta.getFullYear().toString()
        );
        let dif_Mes = moment(mes.toString()).isSame(mesConsulta.toString());

        //se o mês o ano são iguais
        if (dif_Ano && dif_Mes) {
          if (diaConsulta >= dia) {
            return (
              <>
                <p className="bold" key={i}>
                  {data.contacto_Nome}
                </p>
                <p>
                  Dia <span className="medium">{data.data_consulta}</span> às{" "}
                  <span className="medium">{data.time_consulta}</span>
                </p>
              </>
            );
          } else {
            consultasPassadas.push([
              data.contacto_Nome,
              data.data_consulta,
              data.time_consulta,
            ]);
          }
        } else {
          consultasPassadas.push([
            data.contacto_Nome,
            data.data_consulta,
            data.time_consulta,
          ]);
        }
      });
    } else {
      listConsultas = <p className="bold">Não tem consultas agendadas</p>;
    }

    if (consultasPassadas.length > 0) {
      listConsultasPassadas = consultasPassadas.map((dataPassada, i) => {
        return (
          <>
            <p className="bold" key={i}>
              {dataPassada[0]}
            </p>
            <p>
              Dia <span className="medium">{dataPassada[1]}</span> às{" "}
              <span className="medium">{dataPassada[2]}</span>
            </p>
          </>
        );
      });
    }
    // else {

    // }

    return (
      <div>
        <div className="frame" id="calendario">
          <Row>
            <Col xs={8}>
              <h1 className="green">Calendário</h1>

              <p className="blue paragraphInfo">
                Aqui pode ver as suas próximas consultas, os medicamento que está a tomar e as consultas anteriores.
                Para aceder a outros espaços da plataforma, navegue nos botões da barra à direita
              </p>
            </Col>

            <Col xs={4} className="btnsAjuda">
              <Button className="btnInfo blue" onClick={this.openSponsors}>
                i
              </Button>

              <Button
                className="btnBorderRed blue"
                id="emergency"
                onClick={this.openEmergency}
              >
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

          <Row className="cards">
            <Card className="col-12 boxShadow" id="consultasAnt">
              <h3 className="green">Consultas passadas</h3>

              <Row>
                <Col xs={6}>
                  {listConsultasPassadas}

                  {/* <p className="bold">03/07 às 10h40</p>
                  <p>Hospital de Aveiro</p> */}
                </Col>

                <img src={consultasIcone} />
              </Row>
            </Card>
          </Row>

          <Navbar ativo={"calendario"} />

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
