import React from "react";
import StatisticCard from "../StatisticCard/StatisticCard";
import styles from "./inventoryStats.module.css";

const InventoryStats = () => {

    return (
        <div className={styles.container}>
        <h1 className={styles.header}>Inventory Stats</h1>
        <div className={styles.statsContainer}>
            <StatisticCard icon={"cart"} label={"Total product"} value={"9"}/>
            <StatisticCard icon={"dollar"} label={"Total store value"} value={"30,550"}/>
            <StatisticCard icon={"no-cart"} label={"Out of stocks"} value={"2"}/>
            <StatisticCard icon={"category"} label={"No of Category"} value={"2"}/>
        </div>
        </div>
    )
}

export default InventoryStats;