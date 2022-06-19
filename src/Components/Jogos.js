import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "../Containers/Navbar";
import tic_image from "../images/characters/tic_toe.svg";
import solitaire_img from "../images/characters/carta_solitaire.svg";
import { Link } from "react-router-dom";
export class Jogos extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="frame" id="jogos">
          <h1 className="green">Jogos</h1>

          <p className="blue paragraphInfo">
            No painel abaixo veja as suas próximas consultas e os seus contactos
            mais recentes.
            <br />
            Do lado direito pode consultar páginas específicas.
          </p>

          <Row className="cards">
            <Card className="col-6 boxShadow">
              <h3 className="green">Jogo 1</h3>

              <Row>
                <Col xs={6}>
                  <p className="bold">Jogo Solitário</p>
                  <p >Jogo de cartas para um jogador. Utiliza o baralho completo, 52 cartas, com o objetivo de fazer um monte dos quatro naipes. </p>
                </Col>

                <Col xs={6}>
                  <img src={solitaire_img} />
                  

                </Col>
              </Row>

              <Row>
                <Button
                  className="btnFill alignCenter"
                  style={{ margin: "40px auto 50px" }}
                >
                  <Link to="/solitario">Jogar Solitário</Link>
                </Button>
              </Row>
            </Card>

            <Card className="col-6 boxShadow">
              <h3 className="red">Jogo 2</h3>

              <Row>
                <Col xs={6}>
                  <p className="bold">Jogo do Galo</p>
                  <p>
                    O jogo do galo consiste em alinhar os três símbolos escolhidos (cruz ou bola) na vertical, na horizontal ou na diagonal. Ganha o jogador que primeiro conseguir alinhar esses três símbolos.
                  </p>
                </Col>

                <Col xs={6} className="alignEnd">
                  <img src={tic_image} />
                </Col>
                <Button
                  className="btnFill alignCenter"
                  style={{ margin: "40px auto 50px" }}
                >
                  <Link to="/jogogalo">Jogo do Galo</Link>
                </Button>
              </Row>
            </Card>
          </Row>
        </div>

        <Navbar ativo={"jogos"} />
      </div>
    );
  }
}

export default Jogos;
