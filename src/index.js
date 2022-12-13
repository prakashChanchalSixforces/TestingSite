import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { hydrate,render } from 'react-dom';
import './components/layouts/phonenumber/phonenostyles.css'
import store from './store/store'
import "./index.css";
const container = document.getElementById('root');
const root = createRoot(container);

const INTERCOM_APP_ID = 'cqome257';
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

if (container.hasChildNodes()) {
  hydrate(<App />, container);
} else {
  render(<App />, container);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
