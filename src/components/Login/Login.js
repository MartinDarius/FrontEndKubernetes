import React from "react";
import { setCookie } from "../../cookieHandler";
//import _ from 'lodash';
import "./Login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loginImg from "../../assets/images/kubernetes.png";
import ErrorModal from "./ErrorModal/ErrorModal";
import Backdrop from "./ErrorModal/Backdrop";

import axios from "axios";

class Login extends React.Component {
  state = {
    email: "testemail2@yahoo.com",
    password: "parola",
    error: false,
    registered: false,
  };

  validateData = () => {
    let ok = true;
    if (this.state.email.length === 0 || this.state.password.length < 6)
      ok = false;
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return ok && re.test(String(this.state.email).toLowerCase());
  };

  onLogin = (event) => {
    const authData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/api/auth/login", authData)
      .then((response) => {
        console.log(response);
        setCookie("userSession", response.data.token);
        document.location.reload();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });

    event.preventDefault();
  };

  onRegister = (event) => {
    const authData = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(
        "http://localhost:5000/api/auth/signup",
        authData
      )
      .then((response) => {
        console.log(response);
        this.setState({...this.state,registered:true})
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });

    event.preventDefault();
  };

  closeModal = () => {
    this.setState({ error: false });
    this.setState({registered: false});
  };

  render() {
    return (
      <div className="Login">
        <div className="content">
          <div className="header">Login</div>
          <div className="image">
            <img src={loginImg} alt="" />
          </div>
          <Form className="form">
            <Form.Group className="formGroup" size="lg" controlId="email">
              <Form.Label className="label">Email</Form.Label>
              <Form.Control
                className="input"
                autoFocus
                placeholder="Mail address"
                type="email"
                value={this.state.email}
                onChange={(e) =>
                  this.setState({
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="formGroup" size="lg" controlId="password">
              <Form.Label className="label">Password</Form.Label>
              <Form.Control
                className="input"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Group>
            <div className="buttons">
              <Button
                className="button"
                block
                size="lg"
                type="submit"
                disabled={!this.validateData()}
                onClick={this.onLogin}
              >
                Login
              </Button>
              <Button
                className="button"
                block
                size="lg"
                type="submit"
                disabled={!this.validateData()}
                onClick={this.onRegister}
              >
                Register
              </Button>
            </div>
          </Form>
        </div>
        {this.state.error && <ErrorModal message="Your credentials are not correct" onConfirm={this.closeModal} />}
        {this.state.registered && <ErrorModal  message="Successfully registered!" onConfirm={this.closeModal} />}
        {(this.state.error || this.state.registered) && <Backdrop onClick={this.closeModal} />}
      </div>
    );
  }
}

export default Login;
