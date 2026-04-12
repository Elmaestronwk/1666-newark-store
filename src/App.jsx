import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ContactView from './components/ContactView';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import NewarkPortalPage from './pages/NewarkPortalPage';
import AdminPortal from './pages/AdminPortal';
import SoundManager from './components/SoundManager';

function App() {
  return (
    <Router>
      <div className="app-container">
        <SoundManager />
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newark-portal" element={<NewarkPortalPage />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
