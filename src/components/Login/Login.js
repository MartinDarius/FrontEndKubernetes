import React from 'react';
import {setCookie} from '../../cookieHandler';
//import _ from 'lodash';
import "./Login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loginImg from '../../assets/images/kubernetes.png';
import { Alert } from 'react-bootstrap';


class Login extends React.Component {
  
  
  state={
    email: '',
    password: ''
  }

  validateData = () => {
    let ok=true;
    if (this.state.email.length === 0 || this.state.password.length === 0)
      ok=false;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return ok && re.test(String(this.state.email).toLowerCase());
  }


  onLogin = () => {
    //   _.ajax({
    //       url: '',
    //       method: 'POST',
    //       data: JSON.stringify({username: '', password: ''}),
    //       success: (data) => {
    //         setCookie('userSession', data);
    //         document.location.reload();
    //       }
    //   })
    if(this.state.email==='martin.darius@yahoo.com' && this.state.password=== 'darius'){
      setTimeout(() => {
          setCookie('userSession','a');

          document.location.reload();
      },1000 );
    }
    else{
      <Alert color="danger">
          This is a danger alert — check it out!
      </Alert>
    }
  }

  onRegister = () => {
    console.log(this.state.email);
    console.log(this.state.password);
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render(){	 
    return(
      <div className="Login">
        <div className="content">
          <div className="header">Login</div>
            <div className="image">
              <img src={loginImg} alt="" />
            </div>
            <Form className="form" onSubmit={this.handleSubmit}>
              <Form.Group className="formGroup" size="lg" controlId="email">
                <Form.Label className="label">Email</Form.Label>
                <Form.Control className="input"
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.setState({
                                  email: e.target.value
                                  })}
                />
              </Form.Group>
              <Form.Group className="formGroup" size="lg" controlId="password">
                <Form.Label className="label">Password</Form.Label>
                <Form.Control className="input"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({password: e.target.value})}
                />
              </Form.Group>
              <div className="buttons">
              <Button  className="button" block size="lg" type="submit" disabled={!this.validateData()} onClick={this.onLogin}>
                Login
              </Button>
              <Button className="button" block size="lg" type="submit" disabled={!this.validateData()} onClick={this.onRegister}>
                Register 
              </Button>
              </div>
            </Form>
      </div>
      </div>
    )
  }
}

export default Login;

