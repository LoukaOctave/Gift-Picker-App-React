import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

reportWebVitals();

//#region TO-DO

  //TODO: Login
  //TODO: Profile (with user URLs)
  //TODO: Settings
  //TODO: Make UI more attractive
  //TODO: Indicate when app is offline
  //TODO: Wishlists
  //TODO: Make use of an API that retrieves gift suggestions
  //TODO: Make use of an API that retrieves holiday data

  //TODO: Replace /src/logo.svg with image from https://pixabay.com/vectors/present-box-dole-favor-gift-150291/

  //TODO: Replace dev Firebase JS SDK with individual components when deploying prod

  //TODO: Home: Add a calendar to select a date from

  //TODO: DateInfoCard: Convert date to human language
  //TODO: DateInfoCard: Fix issue that prevents the display of multiple links in the card content

  //TODO: ReadEvent: Make "Go Back" button actually go back, and not route to a predetermined path.

//#endregion TO-DO