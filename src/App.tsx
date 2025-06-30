import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaSaude from './pages/TelaSaude/Saude'

import TelaLocHosp from './pages/TelaLocHosp'
import TelaSobreNos from './pages/TelaSobreNos/SobreNos';
import TelaBuscaUnidades from './pages/TelaBuscaUnidades/BuscaUnidades';
import TelaLogin from './pages/TelaLogin'
import TelaConfigHospitais from './pages/TelaConfigHospital'
import TelaAddHospitais from './pages/TelaAddHospitais';
import TelaContatos from './pages/TelaContatos/Contatos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaSaude />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/config-hospitais" element={<TelaConfigHospitais />} />
        <Route path="/config-hospitais/adicionar" element={<TelaAddHospitais />} />
        <Route path="/TelaLocHosp" element={<TelaLocHosp />} />
        <Route path="/sobre" element={<TelaSobreNos/>} />
        <Route path="/busca" element={<TelaBuscaUnidades/>} />
        <Route path="/contatos" element={<TelaContatos/>} />
      </Routes>
    </BrowserRouter>
  )
}
