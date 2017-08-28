import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import App from './components/App.jsx'
import reducers from './reducers/store.js';
import promise from 'redux-promise';
import styles from './styles.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

render((
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'))