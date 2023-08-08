import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Routes from './Routes';

import './App.css';

function App() {
  ReactGA.initialize('G-5FJ3RXPCKB');

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
