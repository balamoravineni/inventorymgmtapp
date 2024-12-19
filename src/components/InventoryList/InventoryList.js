import React from 'react';
import styles from './inventoryList.module.css';


const InventoryList = ({role, inventoryData = []}) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}><div className={styles.columnName}>Name</div></th>
            <th className={styles.th}><div className={styles.columnName}>Category</div></th>
            <th className={styles.th}><div className={styles.columnName}>Price</div></th>
            <th className={styles.th}><div className={styles.columnName}>Quantity</div></th>
            <th className={styles.th}><div className={styles.columnName}>Value</div></th>
            <th className={styles.th}><div className={styles.columnName}>Action</div></th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.name} className={styles.tr}>
              <td className={styles.td}>{item.name}</td>
              <td className={styles.td}>{item.category}</td>
              <td className={styles.td}>{item.price}</td>
              <td className={styles.td}>{item.quantity}</td>
              <td className={styles.td}>{item.value}</td>
              <td className={`${styles.td} ${styles.actionButtons}`}>
                <button id={item.id} disabled={role==="user"} onClick={()=> { alert("clicked Edit!") }}>edit</button>
                <button id={item.id} disabled={role==="user"} onClick={() => { alert("clicked View!") }}>view</button>
                <button id={item.id} disabled={role==="user"} onClick={()=> { alert("clicked Delete!") }}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;