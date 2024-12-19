import React from "react";
import { useSelector } from 'react-redux';
import StatisticCard from "../StatisticCard/StatisticCard";
import styles from "./inventoryStats.module.css";

const InventoryStats = () => {

    const inventoryData = useSelector((state) => state.inventory.items);

    const totalProducts = inventoryData?.filter(item => !item.disabled).length || 0;
    const totalStoreValue = inventoryData?.filter(item => !item.disabled).reduce((sum, item) => sum + Number(item.value.replace("$", "")), 0) || 0;
    const outOfStocks = inventoryData?.filter(item => !item.disabled).filter(item => (item.quantity==null || item.quantity===0)).length || 0;
    const NumOfCategories = inventoryData?.filter(item => !item.disabled).reduce((unique, item) => {
        if (!unique.includes(item.category)) {
            unique.push(item.category);
        }
        return unique;
    }, []).length || 0;


    return (
        <div className={styles.container}>
        <h1 className={styles.header}>Inventory Stats</h1>
        <div className={styles.statsContainer}>
            <StatisticCard icon={"cart"} label={"Total product"} value={totalProducts}/>
            <StatisticCard icon={"dollar"} label={"Total store value"} value={totalStoreValue}/>
            <StatisticCard icon={"no-cart"} label={"Out of stocks"} value={outOfStocks}/>
            <StatisticCard icon={"category"} label={"No of Category"} value={NumOfCategories}/>
        </div>
        </div>
    )
}

export default InventoryStats;