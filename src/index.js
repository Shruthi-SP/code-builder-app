import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import { asyncGetAllCodes } from './actions/codesAction';

const store = configureStore()
store.dispatch(asyncGetAllCodes())

console.log('store=', store)
console.log('state= ', store.getState())

store.subscribe(() => {
  console.log('updated state=', store.getState())
})

ReactDOM.render(
  <BrowserRouter >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);