import React, { Component } from "react";
import { Row, Button, Container, Col, Form, FormControl } from 'react-bootstrap';
import { auth, createUserWithEmailAndPassword, signInWithGoogle } from "./firebase";
import image_main from "../images/characters/login_character.png";


class Registo extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            email: "",
            password: "",

        };
    }


    register = async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth,this.state.email,this.state.password);
            console.log(user)
        }catch (error){
            console.log("Register \n" + error);
        }
       
    }

    login =  async () => {
        
    }


    render() {
        return (

            <Row>
                <Col xs={{ order: 1 }} id="backgroundMain" >
                    <img src={image_main} />
                    <h1 class="main_h1">Página registo!</h1>
                    <p class="main_p">Ligue aos seus amigos e familiares, veja vídeos que gosta e esteja a par do que os seus amigos andam a fazer!</p>
                </Col>
                <Col xs={{ order: 1 }} class="" >
                    <h1 class="main_h1_right green_color_text">Ativ@mente</h1>
                    <p class="main_p_right">Nas caixas abaixo, insira os dados que lhe foram dados pela ProBranca.</p>

                    <div className="inputs_form_login">
                        <Col xs={{ order: 1 }} class="inputs_label" >
                            <Form.Label id="label_p" className="green_color_text">Email address</Form.Label>

                            <Form.Control type="email"
                                value={this.state.email}
                                onChange={(e) => this.setState({ "email": e.target.value })}
                                placeholder="E-mail Address" />

                        </Col>
                        <Col xs={{ order: 1 }} class="inputs_label" >

                            <Form.Label id="label_p" className="green_color_text">Password </Form.Label>

                            <Form.Control type="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ "password": e.target.value })}
                                placeholder="Password" />


                        </Col>
                    </div>

                    <div className="conjun_btns_login">
                        <Col xs={{ order: 1 }} class="_btns_boot" >
                            <Button
                                className="login__btn"
                                onClick={this.register}
                            >
                                Login
                            </Button>
                        </Col>
                        <Col xs={{ order: 1 }} class="_btns_boot" >
                            <Button className="login__btn login__google" onClick={signInWithGoogle}>
                                Login with Google
                            </Button>
                        </Col>
                    </div>
                    <Col xs={{ order: 1 }} id="info_help" >
                        <Row>
                            <Col xs={{ order: 12 }}  >
                                <h1>Precisa de ajuda?</h1>
                                <p>Se precisar de ajuda, clica no botão ao lado direito.</p>
                            </Col>

                            <Col xs={{ order: 12 }}  >
                                <Button className="login_help" >
                                    Login with Google
                                </Button>
                            </Col>
                        </Row>


                    </Col>
                </Col>


            </Row>



        )
    }
}

export default Registo;