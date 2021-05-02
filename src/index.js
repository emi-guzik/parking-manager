import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles.scss';
import ParkingGarageApp from './ParkingGarageApp';
import store from './redux/store';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <ParkingGarageApp />
  </Provider>,
  rootElement
);
