import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './components/store/store';
import  DiagramBuilder  from './DiagramBuilder';
import App from './App';
import {getCookie} from './cookieHandler';
import Login from './components/Login/Login';



window.onload = () => {
  
  let session=getCookie("userSession");
  const rootEl = document.getElementById('root');

  if(session){  
    ReactDOM.render(<Provider store={store}><App/></Provider>,rootEl);
  }
  else {
    ReactDOM.render(<Login/>, rootEl);
  }
};

reportWebVitals();
