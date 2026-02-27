import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ProductList from './components/ProductList';
import CartItems from './components/CartItems';
import AboutUs from './components/AboutUs';
import './App.css';

function LandingPage({ setShowProductList }) {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowProductList(true);
    navigate('/products');
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Paradise Nursery</h1>
        <p className="landing-subtitle">Where Green Meets Serenity</p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Paradise Nursery</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">Shop</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage setShowProductList={setShowProductList} />} />
          <Route path="/*" element={
            <>
              <Navbar />
              <div className="main-content">
                <Routes>
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/cart" element={<CartItems />} />
                  <Route path="/about" element={<AboutUs />} />
                </Routes>
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
