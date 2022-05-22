import React, { Component } from "react";
import { Row, Button, Container, Col } from 'react-bootstrap';
import image_main from "./../images/login_character.png";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase";


class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            email: "",
            password: "",

        };
    }



    render() {
        return (

            <Row>
                <Col xs={{ order: 1 }} id="backgroundMain" >
                    <img src={image_main} />
                    <h1 class="main_h1">Bem-vindo!</h1>
                    <p class="main_p">Ligue aos seus amigos e familiares, veja vídeos que gosta e esteja a par do que os seus amigos andam a fazer!</p>
                </Col>
                <Col xs={{ order: 1 }} class="" >
                    <h1 class="main_h1_right green_color_text">Ativ@mente</h1>
                    <p class="main_p_right">Nas caixas abaixo, insira os dados que lhe foram dados pela ProBranca.</p>
                    <input
                        type="text"
                        className="login__textBox"
                        value={this.state.email}
                        onChange={(e) => this.setState({ "email": e.target.value })}
                        placeholder="E-mail Address"
                    />
                    <input
                        type="password"
                        className="login__textBox"
                        value={this.state.password}
                        onChange={(e) => this.setState({ "password": e.target.value })}
                        placeholder="Password"
                    />
                    <button
                        className="login__btn"
                        onClick={() => signInWithEmailAndPassword(this.state.email, this.state.password)}
                    >
                        Login
                    </button>
                    <button className="login__btn login__google" onClick={signInWithGoogle}>
                        Login with Google
                    </button>
                </Col>

            </Row>



        )
    }
}

export default NavBar;