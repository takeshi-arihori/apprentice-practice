import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/Hello';
import Name from './components/Name';
import Page from './components/ContextSample';
import Parent from './components/ContainerSample';
import Message from './components/Message';
import Counter from './components/Counter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <h1><App /></h1>
    <h2><Name /></h2>
    <h2><Page /></h2>
    <h2><Parent /></h2>
    <h2><Message /></h2>
  </>
);
