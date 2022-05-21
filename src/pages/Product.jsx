import React, {useState, useEffect} from 'react'
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {useParams} from 'react-router-dom';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import {Alert, Button, Collapse, Grid, Rating, Snackbar} from "@mui/material";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import ProductCard from "../components/ProductCard";

function Product() {
    const theme = useTheme();
    let {id} = useParams();
    const navigate = useNavigate()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const url = "https://fakestoreapi.com/products/" + id;
        return () => {
            setLoading(true)
            axios.get(url)
                .then(res => {
                    if (!res.data) {
                        return navigate('/', {replace: true})
                    } else {
                        setProduct(res.data)
                        setLoading(false)


                        axios.get(`https://fakestoreapi.com/products/category/${res.data.category}`)
                            .then(res => {
                                setProducts(res.data)
                            }).catch(err => {
                            console.log(err)
                        })
                    }
                })
                .catch(err => {
                    setLoading(true)
                    console.log(err)
                })


        };
    }, []);

    const addToWishlist = () => {
        let wishlist = localStorage.getItem("wishlist") !== null ? localStorage.getItem("wishlist") : ""

        if (wishlist.includes(product.id)) {
            setOpen(true)
            setType('warning')
            setMessage('Product already exists in your wishlsit')
        } else {
            wishlist += `/${product.id}`
            localStorage.setItem('wishlist', wishlist)
            setOpen(true)
            setType('success')
            setMessage('Product added to your wishlsit')
        }

    }

    const addToCart = () => {
        let cart = localStorage.getItem("cart") !== null ? localStorage.getItem("cart") : ""

        if (cart.includes(product.id.toString())) {
            setOpen(true)
            setType('warning')
            setMessage('Product already exists in your cart')
        } else {
            cart += `/${product.id}`
            localStorage.setItem('cart', cart)
            setOpen(true)
            setType('success')
            setMessage('Product added to your cart')
        }

    }

    return (
        <div className="container">
            {
                loading ?
                    <ClipLoader loading={loading} size={150}/>
                    :
                    <>
                        <Card className="d-flex shadow p-3 bg-body rounded my-5 ">
                            <div className="row w-100">
                                <div className="col-md-6 col-sm-12">
                                    <CardMedia
                                        component="img"
                                        sx={{width: 151}}
                                        image={product.image}
                                        alt={product.title}
                                        className="mx-auto"
                                    />
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                        <CardContent sx={{flex: '1 0 auto'}}>
                                            <Typography component="div" variant="h5">
                                                {product.title}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {product.description}
                                            </Typography>
                                            <Typography variant="h5">
                                                Price : {product.price} $
                                            </Typography>
                                            <div className="d-flex align-items-center">
                                                <Typography variant="subtitle1" color="text.primary" component="div">
                                                    Rating :
                                                </Typography>
                                                <Rating name="read-only" precision={0.5} value={product.rating.rate}
                                                        readOnly/>
                                            </div>
                                            <Typography variant="subtitle1" color="text.primary" component="div">
                                                Category : {product.category}
                                            </Typography>

                                        </CardContent>
                                        <Box className="d-flex align-items-center justify-content-around">
                                            <Button variant="contained" startIcon={<AddShoppingCartIcon/>}
                                                    onClick={addToCart}>
                                                Add to cart
                                            </Button>
                                            <Button variant="outlined" startIcon={<FavoriteBorderIcon/>}
                                                    onClick={addToWishlist}>
                                                Add to wishlist
                                            </Button>
                                        </Box>
                                    </Box>

                                </div>
                            </div>


                        </Card>

                        <Typography component="div" variant="h5" className="mb-3">
                            similar products
                        </Typography>
                        <Grid container spacing={2}>
                            {
                                products.map((item, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center"
                                          key={index}>
                                        <ProductCard product={item}/>
                                    </Grid>
                                ))
                            }

                        </Grid>

                    </>
            }


            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => {
                    setOpen(false);
                }}
                message={message}
                severity={type}
            />


        </div>
    )
}


export default Product;