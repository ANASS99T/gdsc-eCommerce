import {Grid, InputBase} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React, {useState, useEffect} from 'react';
import axios from 'axios'

import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";

function Products() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');


    const loadProducts = () => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {

                // console.log(res)
                setProducts(res.data)
            }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        return () => {
            axios.get('https://fakestoreapi.com/products/categories')
                .then(res => {
                    // console.log(res)

                    setCategories(res.data)
                }).catch(err => {
                console.log(err)
            })
            loadProducts()

        };
    }, []);

    const search = () => {
        let list = []
        if (name === '') {
            loadProducts()
        }
        // eslint-disable-next-line array-callback-return
        products.map((item) => {
            if (item.title.toLowerCase().includes(name)) {
                list.push(item)
            }
        })

        setProducts(list)
    }

    return (
        <div className="container">
            <div className="shadow-sm p-3 bg-body rounded mt-3 mb-5 d-flex">
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Search for a product"
                    inputProps={{'aria-label': 'Search for a product'}}
                    className="w-100"
                    onChange={(e) => setName(e.target.value)}
                />
                <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={search}>
                    <SearchIcon/>
                </IconButton>
            </div>

            <div className="row">
                <div className="col-12 col-sm-4 col-md-3">
                    <Categories categories={categories} setProducts={setProducts}/>
                </div>
                <div className="col-12 col-sm-8 col-md-9">
                    <Grid container spacing={2}>
                        {
                            products.map((item, index) => (
                                <Grid item xs={12} sm={6} md={4} className="d-flex justify-content-center" key={index}>
                                    <ProductCard product={item}/>
                                </Grid>
                            ))
                        }

                    </Grid>
                </div>
            </div>
        </div>
    )
}


export default Products;