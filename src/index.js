import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ThemeProvider from './context/ThemeProvider';
import './styles/styles.css'
import { store } from './store/store';
import { Suspense } from 'react';
import './i18n';
import MainLoader from './components/MainLoader/MainLoader';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='/introduce-project'>
      {/* <BrowserRouter> */}
        <ThemeProvider>
          <Suspense fallback={<MainLoader />}>
            <App />
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

