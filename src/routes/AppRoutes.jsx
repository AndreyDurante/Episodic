import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout.jsx';
import Home from '../pages/Home/Home.jsx';
import Discover from '../pages/Discover/Discover.jsx';
import Results from '../pages/Results/Results.jsx';
import Details from '../pages/Details/Details.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/descobrir" element={<Discover />} />
        <Route path="/resultados" element={<Results />} />
        <Route path="/filme/:id" element={<Details />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
