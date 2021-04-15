import React from 'react';
import {setCookie} from '../../cookieHandler';
import _ from 'lodash';

class Login extends React.Component {
  
  onLogin = () => {
      setTimeout(() => {
          setCookie('userSession','a');
          document.location.reload();
      },5000 );
  }



  render(){	 

  	return (
    	<div onClick={this.onLogin}>Aici logam!</div>
  );
  }
}

export default Login;

