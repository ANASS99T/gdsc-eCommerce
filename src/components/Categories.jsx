import {Divider, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import React from "react";
import axios from "axios";

function Categories({categories, setProducts}) {

    const loadProducts = (name) => {
        axios.get(`https://fakestoreapi.com/products/category/${name}`)
            .then(res => {
                setProducts(res.data)
            }).catch(err => {
            console.log(err)
        })
    }
    const getAllproducts = () => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                setProducts(res.data)
            }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="shadow-sm p-3 mb-5 bg-body rounded">
            <Typography variant="h6">Categories</Typography>
            <Divider/>

            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton className={'text-capitalize'} onClick={() => getAllproducts()}>
                    <ListItemText primary={"All"}/>
                </ListItemButton>
                {
                    categories.map((item, index) => (
                        <ListItemButton key={index} className={'text-capitalize'} onClick={() => loadProducts(item)}>
                            <ListItemText primary={item}/>
                        </ListItemButton>
                    ))
                }

            </List>
        </div>
    )
}

export default Categories;