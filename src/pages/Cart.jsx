import React, {useState, useEffect} from 'react'
import axios from "axios";
import Card from "@mui/material/Card";
import {DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from "@mui/material/IconButton";
import {Button, Divider, TextField, Typography} from "@mui/material";


function Cart() {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [updateTable, setUpdateTable] = useState(0)
    const [columns, setColumns] = useState([{field: 'id', headerName: '#', width: 100}, {
        field: 'title',
        headerName: 'Title',
        width: 500
    }, {
        field: 'action', headerName: 'Action', width: 100, sortable: false, renderCell: (params) => {
            const removeItem = (e) => {
                e.stopPropagation(); // don't select this row after clicking

                let localCart = localStorage.getItem('cart')

                localStorage.setItem('cart', localCart.replace(params.row.product, ''))
                setTotal(total => total -= params.row.price)
                setUpdateTable(updateTable => updateTable += 1)
            }

            return <IconButton key={params.id} color="error" aria-label="remove Item" onClick={removeItem}>
                <DeleteIcon/>
            </IconButton>

        }
    },

    ]);
    useEffect(() => {
        return () => {
            let localCart = localStorage.getItem('cart') !== null ? localStorage.getItem('cart').split('/') : []
            localCart = localCart.filter(e => e !== '')
            setProducts([])
            // eslint-disable-next-line array-callback-return
            localCart.map((item, index) => {
                // if (item !== '') {
                const url = "https://fakestoreapi.com/products/" + item;


                axios.get(url)
                    .then(res => {
                        setTotal(total => total += res.data.price)
                        setProducts((prevStat) => [...prevStat, {
                            id: index + 1, product: res.data.id, title: res.data.title, price: res.data.price
                        }])
                    })
                    .catch(err => {
                        console.log(err)
                    })
                // }
            })
        };
    }, [updateTable]);

    return (
        <div className="container">
            <Card className="d-flex shadow p-3 bg-body rounded my-5 ">
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid
                        rows={products}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>

            </Card>

            <Divider/>

            <Typography component="div" variant="h5" className="my-3">
                Checkout
                <Divider/>
                {/*Total: {total} $*/}
            </Typography>

            <Divider/>

            <div className="row mt-4">
                <div className="col-md-6 col-sm-12 my-2">
                    <TextField style={{width:"100%"}} label="Full Name" variant="outlined"/>
                </div>
                <div className="col-md-6 col-sm-12 my-2">
                    <TextField style={{width:"100%"}} label="Phone number" variant="outlined"/>
                </div>
                <div className="col-md-6 col-sm-12 my-2">
                    <TextField style={{width:"100%"}} label="Email" variant="outlined"/>
                </div>
                <div className="col-md-6 col-sm-12 my-2">
                    <TextField style={{width:"100%"}} label="Address" variant="outlined"/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <Button variant="contained">Checkout</Button>
                </div>
            </div>

        </div>
    )
}


export default Cart;