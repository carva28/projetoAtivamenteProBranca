import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "../Containers/Navbar";
import emergency from "../images/icons/emergencia.png";

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

import { useState, useEffect } from "react";
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
const auth = getAuth(app);
var listItems, listItems_2;
export default class Chamadas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: auth.currentUser.reloadUserInfo.localId,
      email: auth.currentUser.reloadUserInfo.email,
      datas: [],
      pesquisa: "",
      resultado: [],
      estado: false
    };
  }

  componentDidMount() {

    const db = getDatabase();
    const starCountRef = ref(db, `Newdata_${this.state.uuid}/contactos`);
    onValue(starCountRef, (snapshot) => {
      var data = snapshot.val();

      this.setState({
        datas: Object.values(snapshot.val())
      })


      console.log(data)

    });

  }

  textoPesquisa = (event) => {
    this.setState({ pesquisa: event.target.value });
    if (event.target.value != "") {


      let searchQuery = event.target.value.toLowerCase();
      for (const key in this.state.datas) {
        let respost = this.state.datas[key].contacto_Nome.toLowerCase();
        console.log(respost.slice(0, searchQuery.length).indexOf(searchQuery))
        if (respost.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {

          console.log(this.state.datas[key].contacto_Nome)
          listItems = "";
          document.getElementById('div_content').style.display = "none";
          document.getElementById('div_content_v2').style.display = "block";
          listItems_2 = <Col className='contact' key={key}>
            <h3> {this.state.datas[key].contacto_Nome} </h3>
            <a class='none_a_link' href={`https://api.whatsapp.com/send?phone=${this.state.datas[key].contacto_telPesso}`} target='_blank' >
              <Button  >   Ligar por WhatsApp </Button>
            </a></Col>;

        }
      }
    } else {
      listItems_2 = "";

      if (this.state.datas.length > 0) {
        document.getElementById('div_content').style.display = "block";
        document.getElementById('div_content_v2').style.display = "none";
        listItems = this.state.datas.map((data, i) =>
          <Col className="contact" key={i}>
            <h3> {data.contacto_Nome} </h3>
            <a class="none_a_link" href={`https://api.whatsapp.com/send?phone=${data.contacto_telPesso}`} target="_blank"><Button  >   Ligar por WhatsApp </Button></a>
          </Col>

        );
      }
    }

  }

  render() {

    if (this.state.datas.length > 0) {

      listItems = this.state.datas.map((data, i) =>
        <Col className="contact" key={i}>
          <h3> {data.contacto_Nome} </h3>
          <a class="none_a_link" href={`https://api.whatsapp.com/send?phone=${data.contacto_telPesso}`} target="_blank"><Button  >   Ligar por WhatsApp </Button></a>
        </Col>

      );
    }

    return (
      <div>
        <div className="frame" id="chamadas">
          <Row>
            <Col xs={8}>
              <h1 className="green">Chamadas</h1>

              <p className="blue paragraphInfo">
                Pode ligar para qualquer um dos contactos abaixo, basta clicar
                no nome da pessoa que pretende contactar.
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

              {
                listItems_2
              }
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
        </div>
      </div>
    );
  }
}
