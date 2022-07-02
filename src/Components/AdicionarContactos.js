import React, { Component } from 'react'
import {
    Row,
    Button,
    Container,
    Col,
    Form,
    FormControl,
} from "react-bootstrap";
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
import Navbar from "../Containers/Navbar_platform_admin";
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
const auth = getAuth(app);
const db = getFirestore(app);
const db_v2 = getDatabase(app);
export default class componentName extends Component {

    //consultas e contactos

    constructor(props) {
        super(props)

        this.state = {
            uuid: auth.currentUser.reloadUserInfo.localId,
            email: auth.currentUser.reloadUserInfo.email,
            contacto_telPesso: "",
            contacto_Nome: "",
            dados: [],
            display_feedback: "none"
        }
        this.inputDataNumber = this.inputDataNumber.bind(this);
        this.inputName = this.inputName.bind(this);
    }

    getUserData = () => {

        const db = getDatabase();
        const starCountRef = ref(db, `Newdata_${this.state.uuid}`);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            this.setState({
                dados: data
            })
            console.log(data)
        });


    };

    submitData = (event) => {

        if (this.state.contacto_telPesso != "" && this.state.contacto_Nome != "") {

            const db = getDatabase();
            set(ref(db, `Newdata_${this.state.uuid}/contacto_telPesso_${this.state.contacto_Nome}`), {
                contacto_telPesso: this.state.contacto_telPesso,
                contacto_Nome: this.state.contacto_Nome,
            })
                .catch(error => console.log(error));
            console.log('DATA SAVED');

            this.setState({
                display_feedback: "block"
            })
            this.timer = setTimeout(() => {
                this.setState({
                    display_feedback: "none"
                })
            }, 5000);

        }

    }

    inputName = (event) => {

        this.setState({ contacto_Nome: event.target.value });

    }

    inputDataNumber = (event) => {

        this.setState({ contacto_telPesso: event.target.value });
    }

    render() {

        return (
            <div>

                {/* <input type="text" onChange={this.inputName} />
                <input type="number" onChange={this.inputDataNumber} />
                <button type="button" onClick={this.submitData}>Submit</button> */}

     

               

                    <Col xs={{ order: 1 }} id="noBgMain" className='new_bg_contactos'>

                        <h1 className="green">Plataforma Ativ@mente</h1>
                        <p className="blue">
                            Nas caixas abaixo, insira um contacto da conta do utilizador {this.state.uuid}
                        </p>

                        <Form.Label id="label_p" className="green">
                            Nome do contacto telefónico
                        </Form.Label>

                        <Form.Control
                            type="text"

                            placeholder="Introduza o nome do contacto a guardar"
                            className="blue"
                            onChange={this.inputName}
                        />

                        <Form.Label id="label_p" className="green">
                            Número do contacto telefónico
                        </Form.Label>

                        <Form.Control
                            type="number"

                            onChange={this.inputDataNumber}
                            placeholder="Escreva o contacto telefónico"
                            className="blue"
                        />

                        <Row className="alignBtns">
                            <Button className="btnFill" id="register_btn" onClick={this.submitData}>
                                Registar Contacto
                            </Button>
                        </Row>
                        <p id="timer_Feedback" style={{ display: this.state.display_feedback }}>Dados guardados com sucesso</p>
                    </Col>
                  

                    {/* <button onClick={this.getUserData} >Mostrar dados </button> */}

                    <Navbar_platform_admin ativo={"chamadas"} />
            </div>
        )
    }
}
