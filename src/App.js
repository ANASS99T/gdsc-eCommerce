import Navbar from './components/Navbar';
import Products from './pages/Products';
import Faq from './pages/Faq';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import {Routes, Route} from 'react-router-dom';
import Product from "./pages/Product";



function App() {

    return (
        <div className='App'>
            <Navbar/>

            <Routes>
                <Route path='/' element={<Products/>}/>
                <Route path='faq' element={<Faq/>}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path='wishlist' element={<Wishlist/>}/>

                <Route path='product'>
                    <Route path=':id' element={<Product/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
