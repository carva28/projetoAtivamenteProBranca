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
export default function UserSpeciMedicamento() {

    const location = useLocation();

    const [uuid, setuuid] = useState(auth.currentUser.reloadUserInfo.localId,);
    const [email, setemail] = useState(auth.currentUser.reloadUserInfo.email);
    const [medicamento, setmedicamen] = useState(location.state.medicamen);
    const [alturamedicar, setalturamedicar] = useState(location.state.altura_Tomar);
    var [estado, setEstado] = useState(true)
    var [displaySate, setdisplaySate] = useState("none")
    const [variavel, setvariavel] = useState(location.state.id_medicamento);


    function inputName(event) {

        setmedicamen(event.target.value);

    }

    function inputDataNumber(event) {

        setalturamedicar(event.target.value);
    }

    function updateData_Fire() {
        if (medicamento != "" && alturamedicar != "") {

            const db = getDatabase();
            set(ref(db, `Newdata_${uuid}/medicamentos/medicamento_${variavel}`), {
                medicamento: medicamento,
                momento_tomar: alturamedicar,
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
        navigate('/mostrarmedicamentos');
    }

    console.log(alturamedicar)

    return (

        <>

            <div>
                <Col xs={{ order: 1 }} id="noBgMain" className='new_bg_contactos'>

                    <h1 className="green">Plataforma Ativ@mente</h1>
                    <p className="blue">
                        Nas caixas abaixo, atualize o medicamento do utilizador <span className='darkgreen'> {email}</span>
                    </p>


                    <Form.Label id="label_p" className="green">
                        Nome do medicamento e dose
                    </Form.Label>

                    <Form.Control
                        type="text"
                        value={medicamento}
                        placeholder="Introduza o nome do medicamento e dose"
                        className="blue"
                        onChange={inputName}
                    />

                    <Form.Label id="label_p" className="green" value="tessx">
                    Refeições 
                    </Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Escreva o momento da toma do medicamento"
                        value={alturamedicar}
                        onChange={inputDataNumber}
                        className="blue"
                    />

                    <Row className="alignBtns">
                        <Button className="btnFill" id="register_btn" onClick={updateData_Fire}>
                            Atualizar medicamento
                        </Button>
                    </Row>
                    <p id="timer_Feedback" style={{ display: displaySate }}>Dados guardados com sucesso</p>
                </Col>


                {/* {location.state.numeroTel} {location.state.nome} */}

            </div>

        </>
    )
}

