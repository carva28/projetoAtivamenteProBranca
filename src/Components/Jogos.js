import React, { Component } from "react";
import tic_image from "../images/characters/tic_toe.svg";
import solitaire_img from "../images/characters/carta_solitaire.svg";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import logotipo from "../images/probranca-cor.png";
import bpi from "../images/bpi.png";
import Navbar from "../Containers/Navbar";
import emergency from "../images/icons/emergencia.png";
import { useNavigate, Link } from "react-router-dom";

export class Jogos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      show2: false,
    };
  }

  openSponsors = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  openEmergency = () => this.setState({ show2: true });
  closeEmergency = () => this.setState({ show2: false });

  render() {
    return (
      <div>
        <div className="frame" id="jogos">
          <Row>
            <Col xs={8}>
              <h1 className="green">Jogos</h1>
              <p className="blue paragraphInfo">
                Divirta-se com os jogos que temos para si! Jogo do galo,
                Solitário ou até Tetris e Candy Crush!
                <br />
                Do lado direito pode consultar páginas específicas.
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
              <Row>
                <Col xs={5}>
                  <img src={solitaire_img} />
                </Col>

                <Col xs={7}>
                  <h3 className="green">Jogo Solitário</h3>
                  <p>
                    Jogo de cartas para um jogador. Utiliza o baralho completo,
                    52 cartas, com o objetivo de fazer um monte dos quatro
                    naipes.
                  </p>
                </Col>
              </Row>

              <Button className="btnGames btnFill alignCenter">
                <Link to="/solitario">Jogar Solitário</Link>
              </Button>
            </Card>

            <Card className="col-6 boxShadow">
              <Row>
                <Col xs={5}>
                  <img src={tic_image} />
                </Col>

                <Col xs={7}>
                  <h3 className="green">Jogo do Galo</h3>
                  <p>
                    O jogo do galo consiste em alinhar os três símbolos
                    escolhidos (cruz ou bola) na vertical, na horizontal ou na
                    diagonal. Ganha o jogador que primeiro conseguir alinhar
                    esses três símbolos.
                  </p>
                </Col>
              </Row>

              <Button className="btnGames btnFill alignCenter">
                <Link to="/jogogalo">Jogo do Galo</Link>
              </Button>
            </Card>

            <Card className="col-12 boxShadow" style={{ width: "100%" }}>
              <h3 className="red">Outros jogos</h3>

              <Row>
                <p>
                  Pode jogar outros jogos que se encontram disponíveis neste
                  dispositivo, gratuitamente. Para isso basta clicar num dos
                  botões abaixo e será redirecionado para uma nova página, na
                  qual basta clicar no botão verde "ABRIR".
                </p>

                <Row className="btn_other">
                  <Col>
                    <a href="https://play.google.com/store/apps/details?id=com.n3twork.tetris">
                      <Button className="btnGames btnFill alignCenter">
                        Jogar "Tetris"
                      </Button>
                    </a>
                  </Col>

                  <Col>
                    <a href="https://play.google.com/store/apps/details?id=com.king.candycrushsaga">
                      <Button className="btnGames btnFill alignCenter">
                        Jogar "Candy Crush"
                      </Button>
                    </a>
                  </Col>
                </Row>
              </Row>
            </Card>
          </Row>
        </div>

        <Navbar ativo={"jogos"} />

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
            <Modal.Title className="blue">Contactos de emergência</Modal.Title>
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
    );
  }
}

export default Jogos;
