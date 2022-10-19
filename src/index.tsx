import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CustomRouter from './Components/CustomRouter/CustomRouter';
import { createBrowserHistory } from "history";
// import store from "./store/store";

const history=createBrowserHistory()
ReactDOM.render(
  <React.StrictMode>
    <CustomRouter history={history}>
      <App />
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
