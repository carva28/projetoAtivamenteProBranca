import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

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
import { getDatabase, ref, set, onValue, update } from "firebase/database";
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
export default function UserSpeciConsulta() {

    const location = useLocation();

    const [uuid, setuuid] = useState(auth.currentUser.reloadUserInfo.localId,);
    const [email, setemail] = useState(auth.currentUser.reloadUserInfo.email);
    const [nomeConsulta, setnomeConsulta] = useState(location.state.nome);
    const [dataConsulta, setdataConsulta] = useState(location.state.dataConsulta);
    const [time_consulta, settime_consulta] = useState(location.state.horaConsulta);
    const [variavel, setvariavel] = useState(location.state.id_consulta);
    
    var [estado, setEstado] = useState(true)
    var [displaySate, setdisplaySate] = useState("none")


    function inputName(event) {

        setnomeConsulta(event.target.value);

    }

    function inputDataNumber(event) {

        setdataConsulta(event.target.value);
    }

    function inputTimeNumber(event){

        settime_consulta(event.target.value)
    }


    function updateData_Fire() {
        if (nomeConsulta != "" && dataConsulta != "" && time_consulta != "") {

            const db = getDatabase();
            set(ref(db, `Newdata_${uuid}/consultas/consulta_ID_${variavel}`), {
                data_consulta: dataConsulta,
                contacto_Nome: nomeConsulta,
                time_consulta: time_consulta,
            })
                .catch(error => console.log(error));
            console.log('DATA SAVED');

            setdisplaySate("block")
            var timer = setTimeout(() => {
                setdisplaySate("none")
                toContactos();
            }, 5000);

        }
    }

    const navigate = useNavigate();

    const toContactos = () => {
        navigate('/mostrarconsultas');
    }

    return (

        <>

            <div>
                <Col xs={{ order: 1 }} id="noBgMain" className='new_bg_contactos'>

                    <h1 className="green">Plataforma Ativ@mente</h1>
                    <p className="blue">
                        Nas caixas abaixo, atualize as informações da consulta do utilizador {email}
                    </p>

                    <Form.Label id="label_p" className="green">
                    Atualize o nome da consulta
                    </Form.Label>

                    <Form.Control
                        type="text"
                        value={nomeConsulta}
                        placeholder="Introduza o nome do contacto a guardar"
                        className="blue"
                        onChange={inputName}
                    />

                    <Form.Label id="label_p" className="green" value="tessx">
                        Atualize a data da consulta
                    </Form.Label>

                    <Form.Control
                        type="date"
                        value={dataConsulta}
                        onChange={inputDataNumber}
                        placeholder="Escreva o contacto telefónico"
                        className="blue"
                    />

                    <Form.Label id="label_p" className="green" value="tessx">
                        Atualize a hora da consulta
                    </Form.Label>

                    <Form.Control
                        type="time"
                        value={time_consulta}
                        onChange={inputTimeNumber}
                        placeholder="Escreva o contacto telefónico"
                        className="blue"
                    />

                    <Row className="alignBtns">
                        <Button className="btnFill" id="register_btn" onClick={updateData_Fire}>
                            Atualizar consulta
                        </Button>
                    </Row>
                    <p id="timer_Feedback" style={{ display: displaySate }}>Dados guardados com sucesso</p>
                </Col>


                {/* {location.state.numeroTel} {location.state.nome} */}

            </div>

        </>
    )
}

