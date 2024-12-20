import React from "react";
import { useSelector } from 'react-redux';
import StatisticCard from "../StatisticCard/StatisticCard";
import styles from "./inventoryStats.module.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CategoryIcon from '@mui/icons-material/Category';

const InventoryStats = () => {

    const inventoryData = useSelector((state) => state.inventory.items);

    const totalProducts = inventoryData?.filter(item => !item.disabled).length || "-";
    const totalStoreValue = inventoryData?.filter(item => !item.disabled).reduce((sum, item) => sum + Number(item.value.replace("$", "")), 0) || "-";
    const outOfStocks = inventoryData?.filter(item => !item.disabled).filter(item => (item.quantity==null || item.quantity===0)).length || "-";
    const NumOfCategories = inventoryData?.filter(item => !item.disabled).reduce((unique, item) => {
        if (!unique.includes(item.category)) {
            unique.push(item.category);
        }
        return unique;
    }, []).length || "-";


    return (
        <div className={styles.container}>
        <h1 className={styles.header}>Inventory Stats</h1>
        <div className={styles.statsContainer}>
            <StatisticCard icon={<ShoppingCartIcon fontSize="large"/>} label={"Total product"} value={totalProducts}/>
            <StatisticCard icon={<CurrencyExchangeIcon fontSize="large"/>} label={"Total store value"} value={totalStoreValue}/>
            <StatisticCard icon={<RemoveShoppingCartIcon fontSize="large"/>} label={"Out of stocks"} value={outOfStocks}/>
            <StatisticCard icon={<CategoryIcon fontSize="large"/>} label={"No of Category"} value={NumOfCategories}/>
        </div>
        </div>
    )
}

export default InventoryStats;