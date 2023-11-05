import './App.css';
import BrandPage from './components/BrandPage';
import Cart from './components/Cart';
import HomePage from './components/HomePage';
import Product from './components/Product/Product';
import { BrowserRouter, Routes, Route, Router, useParams } from "react-router-dom";
import SignIn from './components/SignIn';
import ProductCard from './components/Product/ProductCard';
import { UserContext } from "./UserContext.js"
import { useState } from 'react';
import Logout from "../src/components/Logout.js"

function App() {
  const [loginState, setLoginState] = useState(false)
  return (
    <div className='bg-slate-800'>
      <UserContext.Provider value={{loginState,setLoginState}}>
        <BrowserRouter>
          <Routes>
            <Route path='/top_phones' element={<Product />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/:brand_name' element={<BrandPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/sign_in' element={<SignIn />} />
            <Route path="/name/:phone_name" element={<ProductCard />} />
            <Route path='/logout' element={<Logout/>}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
