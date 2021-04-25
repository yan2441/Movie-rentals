import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import App from './App';





ReactDOM.render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  ,document.getElementById('root')
)