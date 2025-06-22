import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaSaude from './pages/TelaSaude'
import TelaLogin from './pages/TelaLogin'
import TelaConfigHospitais from './pages/TelaConfigHospital'
import TelaAddHospitais from './pages/TelaAddHospitais';

export default function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<TelaSaude />} />
    <Route path="/login" element={<TelaLogin />} />
    <Route path="/config-hospitais" element={<TelaConfigHospitais />} />
    <Route path="/config-hospitais/adicionar" element={<TelaAddHospitais />} />
  </Routes>
</BrowserRouter>
  )
}
