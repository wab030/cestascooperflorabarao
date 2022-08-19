import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import MainPage from './components/MainPage/MainPage';
import './App.css';
// import { data } from './data/cooperflorabarao-mock';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <MainPage />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
