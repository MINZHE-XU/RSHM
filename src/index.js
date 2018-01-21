import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import storeReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

let store = createStore(storeReducer) // this is store

store.subscribe(function(){
  //console.log('current state is: ',store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
	document.getElementById('root')
);
registerServiceWorker();
