import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addInventoryItems, setErrorMessage, setLoading } from '../../redux/inventorySlice';
import styles from './inventory.module.css';

import axios from 'axios';
import InventoryStats from "../InventoryStats/InventoryStats";
import InventoryList from "../InventoryList/InventoryList";
import { Alert } from "@mui/material";

const inventoryMockData = [
    { name: 'Laptop', category: 'Electronics', quantity: 5, price: "$5", value: "$25" },
    { name: 'Chair', category: 'Furniture', quantity: 0, price: "$30", value: "0" },
    { name: 'Notebook', category: 'Stationery', quantity: 100, price: "$70", value: "$7000" },
    { name: 'Mobile Phone', category: 'Electronics', quantity: 10, price: "$25", value: "$250" },
    { name: 'Pen', category: 'Stationery', quantity: 0, price: "$3", value: "0" },
  ];

const Inventory = ({role}) => {


    const dispatch = useDispatch();
    const inventoryDataError = useSelector((state) => state.inventory.errorMessage);

    useEffect(()=>{
        dispatch(setLoading(true));
        axios.get(`https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory`).then(response => {
            console.log(response.data);
            if(Array.isArray(response.data)) {
                dispatch(addInventoryItems(response.data));
                dispatch(setLoading(false));
                dispatch(setErrorMessage(null));
            }
            else {
                // dispatch(addInventoryItems(inventoryMockData));
                console.error(response.data);
                dispatch(setErrorMessage("There is a problem loading inventory data"));
                dispatch(setLoading(false));
            }
        }).catch(err => {
            // dispatch(addInventoryItems(inventoryMockData));
            console.error(err);
            dispatch(setErrorMessage("There is a problem loading inventory data"));
            dispatch(setLoading(false));
        })

        // setTimeout(()=> {
        //     dispatch(addInventoryItems(inventoryMockData));
        //     dispatch(setLoading(false));
        // }, 5000)
    }, [])

    return (
        <div>
            <InventoryStats />
            {inventoryDataError && <Alert className={styles.errorAlert} variant="filled" severity="error">{inventoryDataError}</Alert>}
            {!inventoryDataError && (
                <InventoryList role={role} />
            )}
        </div>
    )
}

export default Inventory;