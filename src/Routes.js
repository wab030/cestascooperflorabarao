import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';

const routes = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/privacypolicy' element={<PrivacyPolicy />} />
    </Routes>
  );
};

export default routes;
