import React, { useState } from 'react';
import styles from './inventoryList.module.css';
import EditInventoryItem from '../EditInventoryItem/EditInventoryItem';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
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

    const onDelete = (item) => {
        console.log("Deleting item name: " + item.name);
        dispatch(deleteInventoryItem(item.name));
    }

    const onView = (item) => {
        console.log("Viewing item name: " + item.name);
        dispatch(toggleInventoryItem(item.name));
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
                    <IconButton id={`edit-${item.name}`} disabled={role==="user" || item.disabled} onClick={()=> {onEdit(item)}}><EditIcon color={role==="user" || item.disabled?'':'success'}/></IconButton>
                    <IconButton id={`view-${item.name}`} disabled={role==="user"} onClick={()=>onView(item)}>{item.disabled?<VisibilityOffIcon color={role==="user"?'':'secondary'}/>:<VisibilityIcon color={role==="user"?'':'secondary'}/>}</IconButton>
                    <IconButton id={`delete-${item.name}`} disabled={role==="user" || item.disabled} onClick={()=>{onDelete(item)}}><DeleteIcon color={role==="user" || item.disabled?'':'error'}/> </IconButton>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;