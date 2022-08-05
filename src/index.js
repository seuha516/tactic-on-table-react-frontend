import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { rootSaga } from 'modules';
import { changeField, check } from 'modules/users';

import App from './App';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
function loadUser() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    store.dispatch(changeField({ key: 'user', value: user }));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working.', e);
  }
}
sagaMiddleware.run(rootSaga);
loadUser();
document.getElementById('root').setAttribute('spellcheck', 'false');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
