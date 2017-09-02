import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/App.jsx'
import reducers from './reducers/store.js';
import promise from 'redux-promise';
import styles from './styles.css';
// import { loadState, saveState } from './localStorage'
import { persistStore, autoRehydrate } from 'redux-persist'

// const persistedState = loadState()
const createStoreWithMiddleware = composeWithDevTools(autoRehydrate(), applyMiddleware(promise))(createStore);

const store = createStoreWithMiddleware(reducers)

// const store = createStore(
//   reducers,
//   undefined,
//   compose(
//     applyMiddleware(promise),
//     autoRehydrate
//   )
// )

persistStore(store)

render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'))
