import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography, Snackbar
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useNavigate} from 'react-router-dom';


function ProductCard({product}) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');


    const addToWishlist = (id) => {
        let wishlist = localStorage.getItem("wishlist") !== null ? localStorage.getItem("wishlist") : ""

        if (wishlist.includes(id.toString())) {
            setOpen(true)
            setType('warning')
            setMessage('Product already exists in your wishlist')
        } else {
            wishlist += `/${id}`
            localStorage.setItem('wishlist', wishlist)
            setOpen(true)
            setType('success')
            setMessage('Product added to your wishlist')
        }
    }

    const addToCard = (id) => {
        let cart = localStorage.getItem("cart") !== null ? localStorage.getItem("cart") : ""
        if (cart.includes(id.toString())) {
            setOpen(true)
            setType('warning')
            setMessage('Product already exists in your cart')
        } else {
            cart += `/${id}`

            localStorage.setItem('cart', cart)
            setOpen(true)
            setType('success')
            setMessage('Product added to your cart')
        }
    }

    const handleClose = () => {

        setOpen(false);
    };

    return (
        <Card sx={{maxWidth: 345}} style={{width: "350px"}}
              className="shadow-sm mb-2 bg-body rounded d-flex align-items-center justify-content-between flex-column">
            <CardActionArea onClick={() => navigate(`/product/${product.id}`, {replace: true})}>
                <CardMedia
                    component="img"
                    // height="140"
                    image={product.image}
                    alt={product.title}
                    style={{height: "140px", objectFit: "contain"}}
                    className={"mt-2"}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {product.price} $
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="add to Cart" onClick={() => addToCard(product.id)}>
                    <AddShoppingCartIcon/>
                </IconButton>
                <IconButton aria-label="add to wishlist" onClick={() => addToWishlist(product.id)}>
                    <FavoriteBorderIcon/>
                </IconButton>
            </CardActions>

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={message}
                severity={type}
            />
        </Card>
    )
}

export default ProductCard;