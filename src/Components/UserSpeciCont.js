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
export default function UserSpeciCont() {

    const location = useLocation();

    const [uuid, setuuid] = useState(auth.currentUser.reloadUserInfo.localId,);
    const [email, setemail] = useState(auth.currentUser.reloadUserInfo.email);
    const [nomeUser, setnomeUser] = useState(location.state.nome);
    const [telfUser, settelfUser] = useState(location.state.numeroTel);
    var [estado, setEstado] = useState(true)
    var [displaySate, setdisplaySate] = useState("none")
    const [variavel, setvariavel] = useState(location.state.id_consulta);


    function inputName(event) {

        setnomeUser(event.target.value);

    }

    function inputDataNumber(event) {

        settelfUser(event.target.value);
    }

    function updateData_Fire() {
        if (nomeUser != "" && telfUser != "") {

            const db = getDatabase();
            set(ref(db, `Newdata_${uuid}/contactos/contacto_Contacto_${variavel}`), {
                contacto_Nome: nomeUser,
                contacto_telPesso: telfUser,
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
        navigate('/mostrarcontactos');
    }

    return (

        <>

            <div>
                <Col xs={{ order: 1 }} id="noBgMain" className='new_bg_contactos'>

                    <h1 className="green">Plataforma Ativ@mente</h1>
                    <p className="blue">
                        Nas caixas abaixo, insira um contacto da conta do utilizador {email}
                    </p>

                    <Form.Label id="label_p" className="green">
                        Nome do contacto telefónico
                    </Form.Label>

                    <Form.Control
                        type="text"
                        value={nomeUser}
                        placeholder="Introduza o nome do contacto a guardar"
                        className="blue"
                        onChange={inputName}
                    />

                    <Form.Label id="label_p" className="green" value="tessx">
                        Número do contacto telefónico
                    </Form.Label>

                    <Form.Control
                        type="number"
                        value={telfUser}
                        onChange={inputDataNumber}
                        placeholder="Escreva o contacto telefónico"
                        className="blue"
                    />

                    <Row className="alignBtns">
                        <Button className="btnFill" id="register_btn" onClick={updateData_Fire}>
                            Registar Contacto
                        </Button>
                    </Row>
                    <p id="timer_Feedback" style={{ display: displaySate }}>Dados guardados com sucesso</p>
                </Col>


                {/* {location.state.numeroTel} {location.state.nome} */}

            </div>

        </>
    )
}

