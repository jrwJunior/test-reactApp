import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core';
import { AppProvider } from './context';
import App from './containers/app/App'
import reportWebVitals from './utils/statistics/reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals();
