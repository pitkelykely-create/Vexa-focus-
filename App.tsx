import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Dashboard from './Dashboard';
import Chat from './Chat';
import Dieta from './Dieta';
import Treino from './Treino';
import Holografico from './Holografico';
import ComoFunciona from './ComoFunciona';
import Assinatura from './Assinatura';

const AppContent = () => {
  const location = useLocation();
  const getPageName = (pathname: string) => {
    if (pathname === '/') return 'Home';
    return pathname.substring(1).charAt(0).toUpperCase() + pathname.slice(2);
  };

  // Simple mapping for the Layout prop, removing the leading slash
  const currentPageName = location.pathname === '/' ? 'Home' : location.pathname.substring(1);

  return (
    <Layout currentPageName={currentPageName}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Dieta" element={<Dieta />} />
        <Route path="/Treino" element={<Treino />} />
        <Route path="/Holografico" element={<Holografico />} />
        <Route path="/ComoFunciona" element={<ComoFunciona />} />
        <Route path="/Assinatura" element={<Assinatura />} />
      </Routes>
    </Layout>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}