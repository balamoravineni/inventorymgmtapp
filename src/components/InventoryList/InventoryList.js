import React, { useState } from 'react';
import styles from './inventoryList.module.css';
import EditInventoryItem from '../EditInventoryItem/EditInventoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInventoryItem, editInventoryItem, toggleInventoryItem } from '../../redux/inventorySlice';


const InventoryList = ({role}) => {

    const [selectedItemToEdit, setSelectedItemToEdit] = useState(null);

    const inventoryData = useSelector((state) => state.inventory.items);
    const dispatch = useDispatch();

    const onEdit = (item) => {
        setSelectedItemToEdit(item);
    };
    
    const handleSave = (updatedItem) => {
        dispatch(editInventoryItem(updatedItem));
    };

    const onDelete = (event) => {
        const itemName = event.target.id;
        console.log("Deleting item name: " + itemName);
        dispatch(deleteInventoryItem(itemName));
    }

    const onView = (event) => {
        const itemName = event.target.id;
        console.log("Viewing item name: " + itemName);
        dispatch(toggleInventoryItem(itemName));
    }

  return (
    <div className={styles.container}>
        {selectedItemToEdit && (
        <EditInventoryItem
            item={selectedItemToEdit}
            onClose={() => setSelectedItemToEdit(null)}
            onSave={handleSave}
        />
        )}
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
            <tr key={item.name} className={`${styles.tr} ${item.disabled?styles.disabled:''}`} >
                <td className={styles.td}>{item.name}</td>
                <td className={styles.td}>{item.category}</td>
                <td className={styles.td}>{item.price}</td>
                <td className={styles.td}>{item.quantity}</td>
                <td className={styles.td}>{item.value}</td>
                <td className={`${styles.td} ${styles.actionButtons}`}>
                    <button id={item.name} disabled={role==="user" || item.disabled} onClick={()=> {onEdit(item)}}>edit</button>
                    <button id={item.name} disabled={role==="user"} onClick={onView}>view</button>
                    <button id={item.name} disabled={role==="user" || item.disabled} onClick={onDelete}>delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;