import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import { addInventoryItems } from '../../redux/inventorySlice';

import axios from 'axios';
import InventoryStats from "../InventoryStats/InventoryStats";
import InventoryList from "../InventoryList/InventoryList";

const inventoryMockData = [
    { name: 'Laptop', category: 'Electronics', quantity: 5, price: "$5", value: "$25" },
    { name: 'Chair', category: 'Furniture', quantity: 0, price: "$30", value: "0" },
    { name: 'Notebook', category: 'Stationery', quantity: 100, price: "$70", value: "$7000" },
    { name: 'Mobile Phone', category: 'Electronics', quantity: 10, price: "$25", value: "$250" },
    { name: 'Pen', category: 'Stationery', quantity: 0, price: "$3", value: "0" },
  ];

const Inventory = ({role}) => {


    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get(`https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory`).then(response => {
            console.log(response.data);
            if(Array.isArray(response.data)) {
                dispatch(addInventoryItems(inventoryMockData));
            }
            else {
                // dispatch(addInventoryItems(inventoryMockData));
                console.error(response.data);
            }
        }).catch(err => {
            // dispatch(addInventoryItems(inventoryMockData));
            console.error(err);
        })

        setTimeout(()=> {
            dispatch(addInventoryItems(inventoryMockData));
        }, 2000)
    }, [])

    return (
        <div>
            <InventoryStats />
            <InventoryList role={role} />
        </div>
    )
}

export default Inventory;