import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addInventoryItems, setErrorMessage, setLoading } from '../../redux/inventorySlice';
import styles from './inventory.module.css';

import axios from 'axios';
import InventoryStats from "../InventoryStats/InventoryStats";
import InventoryList from "../InventoryList/InventoryList";
import { Alert } from "@mui/material";

const ERROR_MESSAGE = "There is a problem loading inventory data. Please refresh after sometime.";

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
                console.error("Error loading inventory data: " + response.data);
                dispatch(setErrorMessage(ERROR_MESSAGE));
                dispatch(setLoading(false));
            }
        }).catch(err => {
            console.error("Error loading inventory data: " + err);
            dispatch(setErrorMessage(ERROR_MESSAGE));
            dispatch(setLoading(false));
        })
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