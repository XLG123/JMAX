import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './components/store/store';
import {ModalProvider} from "./components/context/model"
let store = configureStore({});

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

// const renderApplication = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <ModalProvider>
    <React.StrictMode>
      <Root />
    </React.StrictMode>
    </ModalProvider>
  );
// }

// if (
//   sessionStorage.getItem("currentUser") === null ||
//   sessionStorage.getItem("X-CSRF-Token") === null
// ) {
//   // store.dispatch(sessionActions.restoreSession()).then(renderApplication);
// } else {
//   renderApplication();
// }