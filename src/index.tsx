import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CustomRouter from './Components/CustomRouter/CustomRouter';
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
// import store from "./store/store";

const history=createBrowserHistory()
ReactDOM.render(
  <React.StrictMode>
    <CustomRouter history={history}>
      {/* <Provider store={store}> */}
        <App />
      {/* </Provider> */}
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
