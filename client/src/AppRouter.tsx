// src/AppRouter.tsx
import { Routes, Route } from 'react-router-dom';
import ShoppingPage from './pages/ShoppingPage';
import Summary from './pages/SummaryPage'; 
import Success from './pages/OrderSuccessPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingPage />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default AppRouter;