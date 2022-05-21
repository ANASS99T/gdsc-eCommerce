import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { createBrowserHistory } from "history";


function ProductCard({product}) {
    const history = createBrowserHistory({ window });

    return (
        <Card sx={{maxWidth: 345}} style={{width:"350px"}} className="shadow-sm mb-2 bg-body rounded d-flex align-items-center justify-content-between flex-column" >
            <CardActionArea onClick={()=> history.push(`/product/${product.id}`)}>
                <CardMedia
                    component="img"
                    // height="140"
                    image={product.image}
                    alt={product.title}
                    style={{height: "140px", objectFit: "contain"}}
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
            <CardActions >
                <IconButton aria-label="add to Cart">
                    <AddShoppingCartIcon/>
                </IconButton>
                <IconButton aria-label="add to wishlist">
                    <FavoriteBorderIcon/>
                </IconButton>
            </CardActions>

        </Card>
    )
}

export default ProductCard;