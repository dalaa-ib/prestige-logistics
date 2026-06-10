import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login/Login';
import MainLayout from './components/layout/mainLayout/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Ads from './pages/ads/Ads';
import Restaurants from './pages/restaurants/Restaurants';
import Drivers from './pages/drivers/Drivers'
import PromoCodes from './pages/promoCodes/PromoCodes';
import Orders from './pages/orders/Orders';
import Finance from './pages/finance/Finance';

import "./styles/common.css";
import "./styles/responsive.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/promo-codes" element={<PromoCodes />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/finance" element={<Finance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
