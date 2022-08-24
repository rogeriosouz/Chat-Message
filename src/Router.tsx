import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthGoogle } from './context/AuthGoogle';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

export function Router() {
  return (
    <BrowserRouter>
      <AuthGoogle>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthGoogle>
    </BrowserRouter>
  );
}
