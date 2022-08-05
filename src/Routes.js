import { Route, Routes } from 'react-router-dom';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy'

const routes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<h1>Página Principal</h1>} /> */}
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
    </Routes>
  )
}

export default routes;