import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import  App  from './App';
import {getCookie} from './cookieHandler';
import Login from './components/Login/Login';


window.onload = () => {
  
  let session=getCookie("userSession");
  const rootEl = document.getElementById('root');
  if(session){  
    const render = Component => {
      ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        rootEl
      );
    };

    render(App);
  }
  else {
    ReactDOM.render(<Login/>, rootEl);
  }
};

reportWebVitals();
