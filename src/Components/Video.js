import React, { Component } from "react";

export default class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="frame" id="calendario">
          <Row>
            <Col xs={8}>
              <h1 className="green">Calendário</h1>

              <p className="blue paragraphInfo">
                No painel abaixo veja as suas próximas consultas, os
                medicamentos que deve tomar e as suas consultas anteriores.
              </p>
            </Col>

            <Col xs={4} className="btnsAjuda">
              <Button className="btnInfo blue">i</Button>

              <Button className="btnBorderRed blue" id="emergency">
                <img src={emergency} alt="ícone de telefone" />
                Emergência
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
