import React from "react";
import styles from "./statisticCard.module.css";
const StatisticCard = ({ icon, label, value}) => {

    return (
        <div className={styles.container}>
            <div>{icon}</div>
            <div className={styles.labelAndValue}>
                <div className={styles.label}>{label}</div>
                <div className={styles.value}>{value}</div>
            </div>
        
        </div>
    )
}

export default StatisticCard;