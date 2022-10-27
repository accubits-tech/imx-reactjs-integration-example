import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CustomRouter from './Components/CustomRouter/CustomRouter';
import { createBrowserHistory } from "history";

const history=createBrowserHistory()
ReactDOM.render(
  <React.StrictMode>
    <CustomRouter history={history}>
      <App />
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
