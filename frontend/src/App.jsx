import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Login from './pages/Login';
import Nav from './component/Nav';
import { userDataContext } from './context/UserContext';
import About from './pages/About';
import Collections from './pages/Collections';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';
import Ai from './component/Ai';

function App() {
  let { userData } = useContext(userDataContext);
  let location = useLocation();

  // ✅ FIX: Prevent redirecting before userData is fetched
  if (userData === undefined) return <div>Loading...</div>;

  return (
    <>
      <ToastContainer />
      {userData && <Nav />}
      <Routes>
        <Route
          path='/login'
          element={
            userData ? (
              <Navigate to={location.state?.from || '/'} replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path='/signup'
          element={
            userData ? (
              <Navigate to={location.state?.from || '/'} replace />
            ) : (
              <Registration />
            )
          }
        />
        <Route
          path='/'
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path='/about'
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path='/collection'
          element={
            userData ? (
              <Collections />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path='/product'
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path='/contact'
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path='/productdetail/:productId'
          element={
            userData ? (
              <ProductDetail />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path='/cart'
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path='/placeorder'
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route
          path='/order'
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} replace />
            )
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Ai />
    </>
  );
}

export default App;