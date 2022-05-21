import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Navbar() {
    return (
        <nav className='navbar navbar-expand-lg bg-light'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>
                    E-Commerce
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNavAltMarkup'
                    aria-controls='navbarNavAltMarkup'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'/>
                </button>
                <div className='collapse navbar-collapse ' id='navbarNavAltMarkup'>
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <div className='navbar-nav'>
                            <Link className='nav-link' to='/'>
                                Products
                            </Link>
                            <Link className='nav-link' to='/faq'>
                                FAQ
                            </Link>
                        </div>
                        <div className='navbar-nav d-flex align-items-center'>
                            <Link className='nav-link' to='/cart'>
                                <IconButton  aria-label="Cart">
                                    <ShoppingCartIcon/>
                                </IconButton>
                            </Link>
                            <Link className='nav-link' to='/wishlist'>
                                <IconButton aria-label="wishlist">
                                    <FavoriteIcon/>
                                </IconButton>
                            </Link>
                        </div>
                    </div>


                </div>
            </div>
        </nav>
    );
}

export default Navbar;
