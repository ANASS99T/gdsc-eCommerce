import React, {useState, useEffect} from 'react'
import axios from "axios";
import Card from "@mui/material/Card";
import {DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from "@mui/material/IconButton";


function Wishlist() {

    const [products, setProducts] = useState([])
    const [updateTable, setUpdateTale] = useState(0)
    const [columns, setColumns] = useState([{field: 'id', headerName: '#', width: 100}, {
        field: 'title',
        headerName: 'Title',
        width: 500
    }, {
        field: 'action', headerName: 'Action', width: 100, sortable: false, renderCell: (params) => {
            const removeItem = (e) => {
                e.stopPropagation(); // don't select this row after clicking

                let localWishlist = localStorage.getItem('wishlist')
                localStorage.setItem('wishlist', localWishlist.replace(params.row.product, ''))
                setUpdateTale(updateTable => updateTable += 1)
            }

            return <IconButton key={params.id} color="error" aria-label="remove Item" onClick={removeItem}>
                <DeleteIcon/>
            </IconButton>

        }
    },

    ]);
    useEffect(() => {
        return () => {
            let localWishlist = localStorage.getItem('wishlist') !== null ? localStorage.getItem('wishlist').split('/') : []
            localWishlist = localWishlist.filter(e => e !== '')
            setProducts([])
            // eslint-disable-next-line array-callback-return
            localWishlist.map((item, index) => {
                // if (item !== '') {
                const url = "https://fakestoreapi.com/products/" + item;


                axios.get(url)
                    .then(res => {
                        setProducts((prevStat) => [...prevStat, {
                            id: index + 1, product: res.data.id, title: res.data.title
                        }])
                    })
                    .catch(err => {
                        console.log(err)
                    })
                // }
            })
        };
    }, [updateTable]);

    return (<div className="container">
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
    </div>)
}


export default Wishlist;