import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { configure } from "mobx";
import { UnlayerOptions } from 'react-email-editor';

import App from './App';
import UserStore from './store/UserStore';
import ContactsStore from './store/ContactsStore';
import ListsStore from './store/ListsStore';
import TemplatesStore from './store/TemplatesStore';
import MailingsStore from './store/MailingsStore';

// configure({
//     useProxies: "never"
// })
// UnlayerOptions.init({
//   locale: 'en-US'
// })

const user = new UserStore();
const contacts = new ContactsStore();
const lists = new ListsStore();
const templates = new TemplatesStore()
const mailings = new MailingsStore()

export const Context = createContext({ user, contacts, lists, templates, mailings })

ReactDOM.render(
  <Context.Provider value={{ user, contacts, lists, templates, mailings }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,
  document.getElementById('root')
);

