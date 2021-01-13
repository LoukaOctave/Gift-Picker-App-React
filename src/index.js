import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

//#region TO-DO

  //TODO: Replace /src/logo.svg with image from https://pixabay.com/vectors/present-box-dole-favor-gift-150291/

  //TODO: Replace dev Firebase JS SDK with individual components when deploying prod

  //TODO: App: Write onClick function to toggle className="active" on <li/> elements to indicate which page is currently open.

  //TODO: CreateEvent: Don't add "start" and "end" to newly created event if "allDay = true"

  //TODO: ReadEvent: Make "Go Back" button actually go back, and not route to a predetermined path.

//#endregion TO-DO