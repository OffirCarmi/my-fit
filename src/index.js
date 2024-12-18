import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import "./assets/style/main.scss";
import { App } from './App';
import { Header } from './cmps/header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Header />
    <App />
  </HashRouter>
);


