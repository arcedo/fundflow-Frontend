import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import { render } from 'react-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="881197720936-bdil759nqiocbne2b6sd3i6k4ujicss1.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)
