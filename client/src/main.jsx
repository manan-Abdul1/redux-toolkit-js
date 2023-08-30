import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux-toolkit/app/store.js'
import { BrowserRouter as Router } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="812493477023-14epritf3lf1qlgv2uil9m5qoe07v0s8.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>,
  </GoogleOAuthProvider>
)
