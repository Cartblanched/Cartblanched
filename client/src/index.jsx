import AppWithRouter from './components/App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Popup from 'react-popup';
import 'semantic-ui-css/semantic.min.css';


ReactDOM.render(<Router><AppWithRouter /></Router>, document.getElementById('app'));