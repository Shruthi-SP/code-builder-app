import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import { asyncGetAllCodes } from './actions/codesAction';

const store = configureStore()
console.log('store=', store)
console.log('state= ', store.getState())
store.subscribe(() => {
  console.log('updated state=', store.getState())
})
store.dispatch(asyncGetAllCodes())

ReactDOM.render(
  <BrowserRouter >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);