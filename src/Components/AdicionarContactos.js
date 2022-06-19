import React, { Component } from 'react'

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
                <p id="timer_Feedback" style={{ display: this.state.display_feedback }}>Dados guardados com sucesso</p>
                <input type="text" onChange={this.inputName} />
                <input type="number" onChange={this.inputDataNumber} />
                <button type="button" onClick={this.submitData}>Submit</button>

                <button onClick={this.getUserData}>Mostrar dados </button>
                <h1>ola {this.state.uuid}</h1>
            </div>
        )
    }
}
